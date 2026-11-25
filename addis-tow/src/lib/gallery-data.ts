/**
 * Media for the home page's photo carousel and video grid. Add, remove
 * or reorder entries here — both components pick up changes automatically.
 *
 * Photos: put files in public/gallery/ and reference them as "/gallery/name.jpg".
 * Videos: same folder, .mp4 works everywhere; always set a `poster` image
 * (shown in the grid and while the video buffers) since without one the
 * thumbnail is blank until the video loads.
 *
 * `alt` is the English fallback (and what screen readers get if a language's
 * caption is somehow missing) — the on-screen caption itself is translated
 * in src/lib/i18n/dictionary.ts, under `gallery.items` for photos and
 * `videoGallery.items` for videos, matched by `id`.
 */

export type GalleryItem = {
  id: string;
  type: "image" | "video";
  src: string;
  poster?: string; // required in practice for type: "video"
  alt: string;
};

/** The photo carousel (3D coverflow) on the home page. */
export const gallery: GalleryItem[] = [
  {
    id: "flatbed-bole",
    type: "image",
    src: "/gallery/Addis/image 1.jpg",
    alt: "Flatbed truck loading a sedan in Bole",
  },
  {
    id: "breakdown-ring-road",
    type: "image",
    src: "/gallery/Addis/image 2.jpg",
    alt: "Breakdown recovery on the Ring Road at night",
  },
  {
    id: "accident-cleanup",
    type: "image",
    src: "/gallery/Addis/image 3.jpg",
    alt: "Accident scene cleared and vehicle recovered",
  },
  {
    id: "heavy-kality",
    type: "image",
    src: "/gallery/Addis/image 4.jpg",
    alt: "Heavy-duty tow truck recovering a minibus in Kality",
  },
  {
    id: "jump-start",
    type: "image",
    src: "/gallery/Addis/image 5.jpg",
    alt: "Technician jump-starting a car at the roadside",
  },
  {
    id: "tire-change",
    type: "image",
    src: "/gallery/Addis/image 6.jpg",
    alt: "Roadside tire change in progress",
  },
];

/** The 4x2 video grid, shown below the photo carousel. Exactly 8 entries
 *  fits the grid perfectly; more than 8 wraps to extra rows automatically,
 *  fewer just leaves empty grid cells, so keep it at 8 if you want the
 *  grid to always look full. */
export const videoGallery: GalleryItem[] = [
  {
    id: "flatbed-load-video",
    type: "video",
    src: "/gallery/Addis/video 1.mp4",
    poster: "/gallery/video-poster-1.svg",
    alt: "Full flatbed loading sequence, start to finish",
  },
  {
    id: "accident-clearance-video",
    type: "video",
    src: "/gallery/Addis/video 2.mp4",
    poster: "/gallery/video-poster-2.svg",
    alt: "Clearing an accident scene",
  },
  {
    id: "heavy-lift-video",
    type: "video",
    src: "/gallery/Addis/video 3.mp4",
    poster: "/gallery/video-poster-3.svg",
    alt: "Heavy-duty lift in Kality",
  },
  {
    id: "night-recovery-video",
    type: "video",
    src: "/gallery/Addis/video 4.mp4",
    poster: "/gallery/video-poster-4.svg",
    alt: "Night recovery on the Ring Road",
  },
  {
    id: "dispatch-call-video",
    type: "video",
    src: "/gallery/Addis/video 5.mp4",
    poster: "/gallery/video-poster-5.svg",
    alt: "Dispatch call walkthrough",
  },
  {
    id: "customer-dropoff-video",
    type: "video",
    src: "/gallery/Addis/video 6.mp4",
    poster: "/gallery/video-poster-6.svg",
    alt: "Delivering a car to the customer",
  },
  {
    id: "behind-scenes-video",
    type: "video",
    src: "/gallery/Addis/video 7.mp4",
    poster: "/gallery/video-poster-7.svg",
    alt: "Behind the scenes at the yard",
  },
  {
    id: "fleet-walkaround-video",
    type: "video",
    src: "/gallery/Addis/video 8.mp4",
    poster: "/gallery/video-poster-8.svg",
    alt: "A walk around the truck fleet",
  },
];