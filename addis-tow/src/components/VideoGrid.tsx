"use client";

import { useEffect, useRef, useState } from "react";
import { videoGallery } from "@/lib/gallery-data";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import Lightbox from "@/components/Lightbox";

/** One grid tile: a muted looping preview that only plays while its tile
 *  is actually on screen (IntersectionObserver), so eight videos in a
 *  grid don't all decode at once. */
function Tile({
  item,
  caption,
  onOpen,
}: {
  item: (typeof videoGallery)[number];
  caption: string;
  onOpen: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = videoRef.current;
    if (!el || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.play().catch(() => {});
        else el.pause();
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <button type="button" className="video-tile" onClick={onOpen}>
      <video
        ref={videoRef}
        src={item.src}
        poster={item.poster}
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
      />
      <span className="gallery-play" aria-hidden="true">
        <svg width="46" height="46" viewBox="0 0 52 52">
          <circle cx="26" cy="26" r="25" fill="rgba(10,11,12,.55)" stroke="#fff" />
          <path d="M21 16l16 10-16 10z" fill="#fff" />
        </svg>
      </span>
      <span className="video-cap">{caption}</span>
    </button>
  );
}

export default function VideoGrid() {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const captionFor = (id: string, fallback: string) =>
    t.videoGallery.items[id] ?? fallback;
    

  const length = videoGallery.length;
  const step = (dir: 1 | -1) =>
    setOpenIndex((i) => (i === null ? i : (i + dir + length) % length));

  const active = openIndex !== null ? videoGallery[openIndex] : null;

  return (
    <>
      <div className="video-grid">
        {videoGallery.map((item, i) => (
          <Tile
            key={item.id}
            item={item}
            caption={captionFor(item.id, item.alt)}
            onOpen={() => setOpenIndex(i)}
          />
        ))}
      </div>

      {active && (
        <Lightbox
          item={active}
          caption={captionFor(active.id, active.alt)}
          labels={{
            close: t.gallery.closeLabel,
            prev: t.gallery.prevLabel,
            next: t.gallery.nextLabel,
          }}
          onClose={() => setOpenIndex(null)}
          onPrev={() => step(-1)}
          onNext={() => step(1)}
        />
      )}
    </>
  );
}
