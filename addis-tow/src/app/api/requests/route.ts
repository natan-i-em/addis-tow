import { NextResponse } from "next/server";
import { areas, site } from "@/lib/site";
import { supabaseServer } from "@/lib/supabase";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Payload = {
  service?: string;
  vehicle?: string;
  location?: string;
  coords?: string;
  urgency?: string;
  scheduledFor?: string;
  name?: string;
  phone?: string;
  notes?: string;
};

/** Crude per-IP throttle so the form cannot be hammered. */
const hits = new Map<string, number[]>();
function throttled(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 60_000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 5;
}

function validPhone(v: string) {
  return /^(\+?251|0)(9|7)\d{8}$/.test(v.replace(/[\s-]/g, ""));
}

function estimateEta(location: string) {
  const hay = location.toLowerCase();
  const match = areas.find(
    (a) =>
      hay.includes(a.name.toLowerCase()) ||
      a.nearby.some((n) => hay.includes(n.toLowerCase()))
  );
  const base = match?.eta ?? site.responseMinutes;
  const hour = new Date().getUTCHours() + 3; // Addis local time
  const rush = (hour >= 7 && hour < 9) || (hour >= 17 && hour < 19);
  return rush ? base + 10 : base;
}

function reference() {
  const n = Math.floor(Math.random() * 46656).toString(36).toUpperCase();
  return `AT-${n.padStart(3, "0")}`;
}

async function notifyTelegram(text: string) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chat = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chat) {
    console.warn(
      "Telegram not configured — TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID is missing."
    );
    return;
  }
  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chat, text, parse_mode: "HTML" }),
    });
    if (!res.ok) {
      const body = await res.text();
      console.error("Telegram send failed:", res.status, body);
    }
  } catch (err) {
    // A failed notification must never fail the customer's request —
    // but we do want to see why in the server logs.
    console.error("Telegram request threw:", err);
  }
}

export async function POST(req: Request) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
  if (throttled(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Call dispatch instead." },
      { status: 429 }
    );
  }

  let body: Payload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Malformed request." }, { status: 400 });
  }

  const {
    name = "",
    phone = "",
    location = "",
    service = "",
    vehicle = "",
    coords = "",
    urgency = "",
    scheduledFor = "",
    notes = "",
  } = body;

  if (name.trim().length < 2)
    return NextResponse.json({ error: "Name is missing." }, { status: 400 });
  if (!validPhone(phone))
    return NextResponse.json({ error: "Phone number is not valid." }, { status: 400 });
  if (location.trim().length < 4)
    return NextResponse.json({ error: "Location is missing." }, { status: 400 });

  const ref = reference();
  const eta = estimateEta(location);

  try {
    const supabase = supabaseServer();
    const { error } = await supabase.from("tow_requests").insert({
      reference: ref,
      service: service || null,
      vehicle: vehicle || null,
      location: location.trim().slice(0, 300),
      coords: coords || null,
      urgency: urgency || null,
      scheduled_for: scheduledFor || null,
      name: name.trim().slice(0, 80),
      phone: phone.trim(),
      notes: notes.slice(0, 600) || null,
    });

    if (error) {
      console.error("Supabase insert failed:", error.message);
      return NextResponse.json(
        { error: "Could not save the request. Please call dispatch instead." },
        { status: 502 }
      );
    }
  } catch (err) {
    console.error("Supabase not configured:", err);
    return NextResponse.json(
      { error: "Could not save the request. Please call dispatch instead." },
      { status: 502 }
    );
  }

  await notifyTelegram(
    [
      `<b>New tow request ${ref}</b>`,
      `Service: ${service || "unspecified"}`,
      `Vehicle: ${vehicle || "unspecified"}`,
      `Urgency: ${urgency || "unspecified"}`,
      `Where: ${location.trim()}`,
      coords ? `Map: https://maps.google.com/?q=${coords}` : "Map: no GPS pin",
      `Caller: ${name.trim()} — ${phone.trim()}`,
      notes ? `Notes: ${notes}` : "",
      scheduledFor ? `Scheduled: ${scheduledFor}` : "",
    ]
      .filter(Boolean)
      .join("\n")
  );

  return NextResponse.json({ reference: ref, eta }, { status: 201 });
}