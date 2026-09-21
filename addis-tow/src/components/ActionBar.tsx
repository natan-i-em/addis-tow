"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { site } from "@/lib/site";

/** Slides up once the hero is out of view, so the phone number is never
 *  more than one thumb-reach away on a phone. */
export default function ActionBar() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 420);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className={`actionbar ${show ? "show" : ""}`}>
      <a className="call" href={`tel:${site.phone}`}>
        Call {site.phoneDisplay}
      </a>
      <Link className="req" href="/request">
        Request a truck
      </Link>
    </div>
  );
}
