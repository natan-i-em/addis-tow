"use client";

import { useEffect, useRef, useState } from "react";
import { gallery } from "@/lib/gallery-data";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

const VISIBLE_RANGE = 3; // items further than this from center are hidden
const AUTOPLAY_MS = 4200;
const SWIPE_THRESHOLD = 40;

/** Shortest signed distance from `index` to `active` around the loop —
 *  e.g. with 7 items, going from 0 to 6 is -1 (one step back), not +6. */
function shortestOffset(index: number, active: number, length: number) {
  let diff = index - active;
  if (diff > length / 2) diff -= length;
  if (diff < -length / 2) diff += length;
  return diff;
}

export default function Gallery() {
  const { t } = useLanguage();
  const [active, setActive] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [paused, setPaused] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<Record<number, HTMLVideoElement | null>>({});
  const pointer = useRef<{ x: number; dragging: boolean }>({ x: 0, dragging: false });

  const length = gallery.length;
  const captionFor = (id: string, fallback: string) => t.gallery.items[id] ?? fallback;

  const advance = (dir: 1 | -1) => setActive((i) => (i + dir + length) % length);
  const goTo = (i: number) => setActive(((i % length) + length) % length);

  // Autoplay — paused on hover/focus/drag, off entirely under reduced motion.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (paused || lightboxOpen) return;
    const id = setInterval(() => advance(1), AUTOPLAY_MS);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paused, lightboxOpen, active]);

  // Only the centered card's video actually plays.
  useEffect(() => {
    Object.entries(videoRefs.current).forEach(([i, el]) => {
      if (!el) return;
      if (Number(i) === active) el.play().catch(() => {});
      else el.pause();
    });
  }, [active]);

  useEffect(() => {
    if (!lightboxOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxOpen(false);
      if (e.key === "ArrowRight") advance(1);
      if (e.key === "ArrowLeft") advance(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lightboxOpen]);

  function onPointerDown(e: React.PointerEvent) {
    pointer.current = { x: e.clientX, dragging: true };
    setPaused(true);
  }
  function onPointerUp(e: React.PointerEvent) {
    if (!pointer.current.dragging) return;
    const delta = e.clientX - pointer.current.x;
    pointer.current.dragging = false;
    if (Math.abs(delta) > SWIPE_THRESHOLD) advance(delta < 0 ? 1 : -1);
  }

  const current = gallery[active];

  return (
    <>
      <div
        className="gallery-stage"
        ref={stageRef}
        role="region"
        aria-roledescription="carousel"
        aria-label={t.gallery.sectionTitle}
        onPointerEnter={() => setPaused(true)}
        onPointerLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
      >
        <button
          type="button"
          className="gallery-arrow gallery-arrow-prev"
          onClick={() => advance(-1)}
          aria-label={t.gallery.prevLabel}
        >
          ‹
        </button>

        <div className="gallery-track">
          {gallery.map((item, i) => {
            const offset = shortestOffset(i, active, length);
            const abs = Math.abs(offset);
            const isActive = offset === 0;
            const hidden = abs > VISIBLE_RANGE;
            const scale = Math.max(1 - abs * 0.16, 0.58);
            const opacity = hidden ? 0 : Math.max(1 - abs * 0.26, 0.18);

            const transform = [
              "translate(-50%, -50%)",
              `translateX(calc(${offset} * clamp(85px, 15vw, 200px)))`,
              `translateZ(calc(${-abs} * clamp(60px, 9vw, 150px)))`,
              `rotateY(${-offset * 32}deg)`,
              `scale(${scale})`,
            ].join(" ");

            const caption = captionFor(item.id, item.alt);

            return (
              <button
                key={item.id}
                type="button"
                className={`gallery-card ${isActive ? "is-active" : ""}`}
                style={{
                  transform,
                  opacity,
                  zIndex: 100 - abs,
                  pointerEvents: hidden ? "none" : "auto",
                }}
                onClick={() => (isActive ? setLightboxOpen(true) : goTo(i))}
                aria-label={`${i + 1}/${length}: ${caption}`}
                aria-current={isActive}
                tabIndex={hidden ? -1 : 0}
              >
                {item.type === "video" ? (
                  <video
                    ref={(el) => {
                      videoRefs.current[i] = el;
                    }}
                    src={item.src}
                    poster={item.poster}
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    aria-hidden="true"
                  />
                ) : (
                  <img src={item.src} alt="" loading="lazy" />
                )}
                {item.type === "video" && (
                  <span className="gallery-play" aria-hidden="true">
                    <svg width="44" height="44" viewBox="0 0 52 52">
                      <circle cx="26" cy="26" r="25" fill="rgba(10,11,12,.55)" stroke="#fff" />
                      <path d="M21 16l16 10-16 10z" fill="#fff" />
                    </svg>
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <button
          type="button"
          className="gallery-arrow gallery-arrow-next"
          onClick={() => advance(1)}
          aria-label={t.gallery.nextLabel}
        >
          ›
        </button>
      </div>

      <p className="gallery-caption-active">{captionFor(current.id, current.alt)}</p>

      <div className="gallery-dots">
        {gallery.map((item, i) => (
          <button
            key={item.id}
            type="button"
            className={`gallery-dot ${i === active ? "is-active" : ""}`}
            onClick={() => goTo(i)}
            aria-label={`${t.gallery.openLabel} ${i + 1}`}
            aria-current={i === active}
          />
        ))}
      </div>

      {lightboxOpen && (
        <div
          className="lightbox-backdrop"
          onClick={() => setLightboxOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label={captionFor(current.id, current.alt)}
        >
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="lightbox-close"
              onClick={() => setLightboxOpen(false)}
              aria-label={t.gallery.closeLabel}
            >
              ×
            </button>
            <button
              type="button"
              className="lightbox-nav lightbox-prev"
              onClick={() => advance(-1)}
              aria-label={t.gallery.prevLabel}
            >
              ‹
            </button>
            <button
              type="button"
              className="lightbox-nav lightbox-next"
              onClick={() => advance(1)}
              aria-label={t.gallery.nextLabel}
            >
              ›
            </button>

            {current.type === "video" ? (
              <video src={current.src} poster={current.poster} controls autoPlay playsInline />
            ) : (
              <img src={current.src} alt={captionFor(current.id, current.alt)} />
            )}

            <p className="lightbox-caption">{captionFor(current.id, current.alt)}</p>
          </div>
        </div>
      )}
    </>
  );
}
