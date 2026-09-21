"use client";

import { useState } from "react";
import { services, vehicleTypes, urgencyLevels, site } from "@/lib/site";

type Form = {
  service: string;
  vehicle: string;
  location: string;
  coords: string;
  urgency: string;
  scheduledFor: string;
  name: string;
  phone: string;
  notes: string;
};

const empty: Form = {
  service: "",
  vehicle: "",
  location: "",
  coords: "",
  urgency: "",
  scheduledFor: "",
  name: "",
  phone: "",
  notes: "",
};

/** Accepts 0911234567, +251911234567, 251911234567 and spaced variants. */
function validPhone(v: string) {
  const digits = v.replace(/[\s-]/g, "");
  return /^(\+?251|0)(9|7)\d{8}$/.test(digits);
}

export default function RequestForm({
  defaultService = "",
  variant = "full",
}: {
  defaultService?: string;
  variant?: "full" | "compact";
}) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<Form>({ ...empty, service: defaultService });
  const [errors, setErrors] = useState<Partial<Record<keyof Form, string>>>({});
  const [sending, setSending] = useState(false);
  const [locating, setLocating] = useState(false);
  const [result, setResult] = useState<{ reference: string; eta: number } | null>(
    null
  );
  const [failed, setFailed] = useState("");

  const set = (k: keyof Form, v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const totalSteps = 3;

  function checkStep(i: number) {
    const e: Partial<Record<keyof Form, string>> = {};
    if (i === 0) {
      if (!form.service) e.service = "Pick the help you need.";
      if (!form.vehicle) e.vehicle = "Tell us what you drive.";
    }
    if (i === 1) {
      if (form.location.trim().length < 4)
        e.location = "A landmark is enough — 'Bole, opposite Edna Mall'.";
      if (!form.urgency) e.urgency = "Choose how the car is sitting right now.";
      if (form.urgency === "scheduled" && !form.scheduledFor)
        e.scheduledFor = "Pick a date and time.";
    }
    if (i === 2) {
      if (form.name.trim().length < 2) e.name = "We need a name for the driver.";
      if (!validPhone(form.phone))
        e.phone = "Enter a working Ethiopian mobile number.";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function next() {
    if (checkStep(step)) setStep((s) => Math.min(s + 1, totalSteps - 1));
  }

  function useMyLocation() {
    if (!navigator.geolocation) {
      setErrors((e) => ({
        ...e,
        location: "This browser cannot share location. Type a landmark instead.",
      }));
      return;
    }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        set("coords", `${latitude.toFixed(5)},${longitude.toFixed(5)}`);
        if (!form.location.trim())
          set("location", `GPS pin ${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
        setLocating(false);
      },
      () => {
        setLocating(false);
        setErrors((e) => ({
          ...e,
          location: "Location was blocked. Type the nearest landmark instead.",
        }));
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }

  async function submit(ev: React.FormEvent) {
    ev.preventDefault();
    if (!checkStep(2)) return;
    setSending(true);
    setFailed("");
    try {
      const res = await fetch("api/requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Request failed");
      setResult({ reference: data.reference, eta: data.eta });
    } catch {
      setFailed(
        `We could not send that. Call ${site.phoneDisplay} and dispatch will take the details.`
      );
    } finally {
      setSending(false);
    }
  }

  if (result) {
    return (
      <div className="success" role="status">
        <svg className="eta-ring" viewBox="0 0 74 74" aria-hidden="true">
          <circle className="track" cx="37" cy="37" r="32" />
          <circle className="bar" cx="37" cy="37" r="32" />
        </svg>
        <h2>A truck is being assigned</h2>
        <span className="ref">{result.reference}</span>
        <p style={{ margin: "0 auto 1rem", maxWidth: "36ch" }}>
          Dispatch is calling you in the next few minutes to confirm the price.
          Estimated arrival is about {result.eta} minutes once the driver sets off.
        </p>
        <a className="btn btn-call btn-block" href={`tel:${site.phone}`}>
          Call dispatch now
        </a>
        <button
          className="btn btn-ghost btn-block"
          style={{ marginTop: ".6rem", color: "var(--muted)", borderColor: "var(--line)" }}
          onClick={() => {
            setResult(null);
            setStep(0);
            setForm({ ...empty });
          }}
        >
          Send another request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate>
      <div className="progress" aria-hidden="true">
        {Array.from({ length: totalSteps }).map((_, i) => (
          <i key={i} className={i <= step ? "on" : ""} />
        ))}
      </div>

      <p className="hint" style={{ marginBottom: "1.1rem" }}>
        Step {step + 1} of {totalSteps} ·{" "}
        {["What happened", "Where you are", "How to reach you"][step]}
      </p>

      {step === 0 && (
        <div className="step-pane" key="s0">
          <div className={`field ${errors.service ? "field-error" : ""}`}>
            <label htmlFor="service">What do you need?</label>
            <select
              id="service"
              value={form.service}
              onChange={(e) => set("service", e.target.value)}
            >
              <option value="">Choose a service</option>
              {services.map((s) => (
                <option key={s.slug} value={s.slug}>
                  {s.name} — from {s.priceFrom.toLocaleString()} birr
                </option>
              ))}
              <option value="not-sure">Not sure — help me work it out</option>
            </select>
            {errors.service && <p className="err">{errors.service}</p>}
          </div>

          <div className={`field ${errors.vehicle ? "field-error" : ""}`}>
            <label htmlFor="vehicle">What are you driving?</label>
            <select
              id="vehicle"
              value={form.vehicle}
              onChange={(e) => set("vehicle", e.target.value)}
            >
              <option value="">Choose a vehicle type</option>
              {vehicleTypes.map((v) => (
                <option key={v} value={v}>
                  {v}
                </option>
              ))}
            </select>
            {errors.vehicle && <p className="err">{errors.vehicle}</p>}
          </div>
        </div>
      )}

      {step === 1 && (
        <div className="step-pane" key="s1">
          <div className={`field ${errors.location ? "field-error" : ""}`}>
            <label htmlFor="location">Where is the car?</label>
            <input
              id="location"
              value={form.location}
              onChange={(e) => set("location", e.target.value)}
              placeholder="Megenagna, in front of Zefmesh Grand Mall"
              autoComplete="street-address"
            />
            <p className="help">
              A landmark beats an address here.{" "}
              <button
                type="button"
                onClick={useMyLocation}
                style={{
                  background: "none",
                  border: "none",
                  padding: 0,
                  font: "inherit",
                  color: "var(--ink)",
                  textDecoration: "underline",
                  cursor: "pointer",
                }}
              >
                {locating ? "Finding you…" : "Use my GPS location"}
              </button>
              {form.coords && " ✓ pin attached"}
            </p>
            {errors.location && <p className="err">{errors.location}</p>}
          </div>

          <div className={`field ${errors.urgency ? "field-error" : ""}`}>
            <label>How is the car sitting?</label>
            <div className="chips">
              {urgencyLevels.map((u) => (
                <button
                  key={u.value}
                  type="button"
                  className="chip"
                  aria-pressed={form.urgency === u.value}
                  onClick={() => set("urgency", u.value)}
                >
                  <strong>{u.label}</strong>
                  <span>{u.hint}</span>
                </button>
              ))}
            </div>
            {errors.urgency && <p className="err">{errors.urgency}</p>}
          </div>

          {form.urgency === "scheduled" && (
            <div
              className={`field step-pane ${errors.scheduledFor ? "field-error" : ""}`}
            >
              <label htmlFor="when">When should the truck come?</label>
              <input
                id="when"
                type="datetime-local"
                value={form.scheduledFor}
                onChange={(e) => set("scheduledFor", e.target.value)}
              />
              {errors.scheduledFor && <p className="err">{errors.scheduledFor}</p>}
            </div>
          )}
        </div>
      )}

      {step === 2 && (
        <div className="step-pane" key="s2">
          <div className="two-up">
            <div className={`field ${errors.name ? "field-error" : ""}`}>
              <label htmlFor="name">Your name</label>
              <input
                id="name"
                value={form.name}
                onChange={(e) => set("name", e.target.value)}
                autoComplete="name"
              />
              {errors.name && <p className="err">{errors.name}</p>}
            </div>
            <div className={`field ${errors.phone ? "field-error" : ""}`}>
              <label htmlFor="phone">Phone</label>
              <input
                id="phone"
                type="tel"
                inputMode="tel"
                value={form.phone}
                onChange={(e) => set("phone", e.target.value)}
                placeholder="0911 23 45 67"
                autoComplete="tel"
              />
              {errors.phone && <p className="err">{errors.phone}</p>}
            </div>
          </div>

          <div className="field">
            <label htmlFor="notes">Anything the driver should know?</label>
            <textarea
              id="notes"
              value={form.notes}
              onChange={(e) => set("notes", e.target.value)}
              placeholder="Front wheel is bent, car is in an underground parking on level 2"
            />
          </div>

          {failed && (
            <p className="err" role="alert">
              {failed}
            </p>
          )}
        </div>
      )}

      <div className="form-nav">
        {step > 0 && (
          <button
            type="button"
            className="btn btn-ghost"
            style={{ color: "var(--ink)", borderColor: "var(--line)" }}
            onClick={() => setStep((s) => s - 1)}
          >
            Back
          </button>
        )}
        {step < totalSteps - 1 ? (
          <button type="button" className="btn btn-ink" onClick={next}>
            Continue
          </button>
        ) : (
          <button type="submit" className="btn btn-call" disabled={sending}>
            {sending ? "Sending…" : "Send request"}
          </button>
        )}
      </div>

      {variant === "compact" && (
        <p className="help" style={{ marginTop: "1rem" }}>
          In a hurry? Calling {site.phoneDisplay} is always faster than typing.
        </p>
      )}
    </form>
  );
}
