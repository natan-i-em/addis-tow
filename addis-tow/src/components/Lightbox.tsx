"use client";

import { useEffect } from "react";
import type { GalleryItem } from "@/lib/gallery-data";

export default function Lightbox({
  item,
  caption,
  labels,
  onClose,
  onPrev,
  onNext,
}: {
  item: GalleryItem;
  caption: string;
  labels: { close: string; prev: string; next: string };
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNext?.();
      if (e.key === "ArrowLeft") onPrev?.();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose, onPrev, onNext]);

  return (
    <div
      className="lightbox-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={caption}
    >
      <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="lightbox-close"
          onClick={onClose}
          aria-label={labels.close}
        >
          ×
        </button>
        {onPrev && (
          <button
            type="button"
            className="lightbox-nav lightbox-prev"
            onClick={onPrev}
            aria-label={labels.prev}
          >
            ‹
          </button>
        )}
        {onNext && (
          <button
            type="button"
            className="lightbox-nav lightbox-next"
            onClick={onNext}
            aria-label={labels.next}
          >
            ›
          </button>
        )}

        {item.type === "video" ? (
          <video src={item.src} poster={item.poster} controls autoPlay playsInline />
        ) : (
          <img src={item.src} alt={caption} />
        )}

        <p className="lightbox-caption">{caption}</p>
      </div>
    </div>
  );
}
