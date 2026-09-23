/**
 * The gallery grid on the home page. Add or remove entries here — the
 * grid and lightbox pick up changes automatically.
 *
 * Images: put files in public/gallery/ and reference them as "/gallery/name.jpg".
 * Videos: same folder, .mp4 works everywhere; always set a `poster` image
 * (shown in the grid and while the video buffers) since without one the
 * thumbnail is blank until the video loads.
 *
 * `alt` is the English fallback (and what screen readers get if a language's
 * caption is somehow missing) — the on-screen caption itself is translated
 * in src/lib/i18n/dictionary.ts under `gallery.items`, matched by `id`.
 */

export type GalleryItem = {
  id: string;
  type: "image" | "video";
  src: string;
  poster?: string; // required in practice for type: "video"
  alt: string;
};

export const gallery: GalleryItem[] = [
  {
    id: "flatbed-bole",
    type: "image",
    src: "/gallery/Addis/Image 1.jpg",
    alt: "Flatbed truck loading a sedan in Bole",
  },
  {
    id: "breakdown-ring-road",
    type: "image",
    src: "/gallery/Addis/Image 2.jpg",
    alt: "Breakdown recovery on the Ring Road at night",
  },
  {
    id: "accident-cleanup",
    type: "image",
    src: "/gallery/Addis/Image 3.jpg",
    alt: "Accident scene cleared and vehicle recovered",
  },
  {
    id: "heavy-kality",
    type: "image",
    src: "/gallery/Addis/Image 4.jpg",
    alt: "Heavy-duty tow truck recovering a minibus in Kality",
  },
  {
    id: "accident-cleanup 2",
    type: "image",
    src: "/gallery/Addis/Image 5.jpg",
    alt: "Technician jump-starting a car at the roadside",
  },
  {
    id: "accident-Recovory",
    type: "image",
    src: "/gallery/Addis/Image 6.jpg",
    alt: "Roadside tire change in progress",
  },
  {
    id: "flatbed-load-video",
    type: "video",
    src: "/gallery/Addis/video 7.mp4",
    poster: "/gallery/Addis/poster 1.jpg",
    alt: "Full flatbed loading sequence, start to finish",
  },
  {
    id: "flatbed-heavy-video 2",
    type: "video",
    src: "/gallery/Addis/video 1.mp4",
    poster: "/gallery/Addis/poster 1.jpg",
    alt: "Full flatbed loading sequence, start to finish",
  }
  ,
  {
    id: "flatbed-heavy-video 3",
    type: "video",
    src: "/gallery/Addis/video 2.mp4",
    poster: "/gallery/Addis/poster 1.jpg",
    alt: "Full flatbed loading sequence, start to finish",
  },
  {
    id: "accident-Recovery-side-road",
    type: "image",
    src: "/gallery/Addis/Image 7.jpg",
    alt: "Roadside tire change in progress",
  },
  {
    id: "accident-Recovery-side-road 2",
    type: "image",
    src: "/gallery/Addis/Image 8.jpg",
    alt: "Roadside tire change in progress",
  },
  {
    id: "accident-Recovery-side-road 3",
    type: "image",
    src: "/gallery/Addis/Image 9.jpg",
    alt: "Roadside tire change in progress",
  },
  {
    id: "accident-Recovery-site",
    type: "image",
    src: "/gallery/Addis/Image 10.jpg",
    alt: "Roadside tire change in progress",
  },
  {
    id: "flatbed-heavy-video 4",
    type: "video",
    src: "/gallery/Addis/video 3.mp4",
    poster: "/gallery/Addis/poster 1.jpg",
    alt: "Full flatbed loading sequence, start to finish",
  },
  {
    id: "flatbed-heavy-video 5",
    type: "video",
    src: "/gallery/Addis/video 4.mp4",
    poster: "/gallery/Addis/poster 1.jpg",
    alt: "Full flatbed loading sequence, start to finish",
  },
  {
    id: "flatbed-heavy-video 6",
    type: "video",
    src: "/gallery/Addis/video 5.mp4",
    poster: "/gallery/Addis/poster 1.jpg",
    alt: "Full flatbed loading sequence, start to finish",
  },
  {
    id: "flatbed-heavy-video 7",
    type: "video",
    src: "/gallery/Addis/video 6.mp4",
    poster: "/gallery/Addis/poster 1.jpg",
    alt: "Full flatbed loading sequence, start to finish",
  },
  {
    id: "accident-Recovery-side-road 4",
    type: "image",
    src: "/gallery/Addis/Image 11.jpg",
    alt: "Roadside tire change in progress",
  },

];
