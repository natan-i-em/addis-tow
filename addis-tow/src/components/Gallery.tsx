"use client";

import { useEffect, useRef, useState } from "react";
import { gallery } from "@/lib/gallery-data";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import Lightbox from "@/components/Lightbox";
import { GalleryItem } from "@/lib/gallery-data";

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
          {gallery.map((item: GalleryItem, i: number) => {
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
                <img src={item.src} alt="" loading="lazy" />
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
        {gallery.map((item: GalleryItem, i: number) => (
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
        <Lightbox
          item={current}
          caption={captionFor(current.id, current.alt)}
          labels={{
            close: t.gallery.closeLabel,
            prev: t.gallery.prevLabel,
            next: t.gallery.nextLabel,
          }}
          onClose={() => setLightboxOpen(false)}
          onPrev={() => advance(-1)}
          onNext={() => advance(1)}
        />
      )}
    </>
  );
}
