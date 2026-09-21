import type { Service } from "@/lib/site";

const paths: Record<Service["glyph"], React.ReactNode> = {
  flatbed: (
    <>
      <path d="M2 24h30M6 24V14h13l5 5v5" />
      <path d="M8 14 22 6" />
      <circle cx="11" cy="27" r="3" />
      <circle cx="26" cy="27" r="3" />
    </>
  ),
  hook: (
    <>
      <path d="M2 26h20M4 26v-8h10l4 5v3" />
      <path d="M24 6v9a4 4 0 0 1-8 0" />
      <circle cx="8" cy="28" r="2.5" />
      <circle cx="18" cy="28" r="2.5" />
    </>
  ),
  crash: (
    <>
      <path d="M4 24h24M7 24v-7l3-6h12l3 6v7" />
      <path d="M17 4l-3 6h6l-4 7" />
      <circle cx="10" cy="26" r="2.5" />
      <circle cx="24" cy="26" r="2.5" />
    </>
  ),
  battery: (
    <>
      <rect x="4" y="10" width="24" height="16" rx="2" />
      <path d="M9 10V6h5v4M18 10V6h5v4" />
      <path d="M17 14l-4 5h6l-4 5" />
    </>
  ),
  tire: (
    <>
      <circle cx="16" cy="16" r="12" />
      <circle cx="16" cy="16" r="5" />
      <path d="M16 4v7M16 21v7M4 16h7M21 16h7" />
    </>
  ),
  fuel: (
    <>
      <path d="M6 28V7a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3v21" />
      <path d="M4 28h16M6 14h12" />
      <path d="M18 11h5a2 2 0 0 1 2 2v9a2 2 0 0 0 2 2" />
    </>
  ),
  key: (
    <>
      <circle cx="10" cy="12" r="6" />
      <path d="M14 16l12 12M22 24l3 3M19 21l3 3" />
    </>
  ),
  heavy: (
    <>
      <path d="M2 24h28M4 24V10h12v14M16 15h7l5 5v4" />
      <circle cx="9" cy="27" r="3" />
      <circle cx="24" cy="27" r="3" />
    </>
  ),
};

export default function Glyph({
  name,
  size = 34,
}: {
  name: Service["glyph"];
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}
