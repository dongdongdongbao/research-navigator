import type { IconKey } from "@/lib/types";

interface IconProps {
  name: IconKey;
  size?: number;
  className?: string;
  "aria-hidden"?: boolean;
  "aria-label"?: string;
}

const PATHS: Record<IconKey, React.ReactNode> = {
  "paper-search": (
    <>
      <path d="M4 4h11l4 4v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1z" />
      <path d="M15 4v4h4" />
      <circle cx="11" cy="13" r="2.5" />
      <path d="m13 15 2 2" />
    </>
  ),
  preprint: (
    <>
      <path d="M5 3h9l5 5v13H5z" />
      <path d="M14 3v5h5" />
      <path d="M8 13h7M8 17h7M8 9h2" />
    </>
  ),
  code: (
    <>
      <path d="m8 8-4 4 4 4" />
      <path d="m16 8 4 4-4 4" />
      <path d="m13 5-2 14" />
    </>
  ),
  "open-data": (
    <>
      <ellipse cx="12" cy="5" rx="8" ry="2.5" />
      <path d="M4 5v6c0 1.4 3.6 2.5 8 2.5s8-1.1 8-2.5V5" />
      <path d="M4 11v6c0 1.4 3.6 2.5 8 2.5s8-1.1 8-2.5v-6" />
    </>
  ),
  "literature-graph": (
    <>
      <circle cx="6" cy="6" r="2.5" />
      <circle cx="18" cy="6" r="2.5" />
      <circle cx="12" cy="18" r="2.5" />
      <path d="M8 7l3 9M16 7l-3 9M8 6h8" />
    </>
  ),
  dataset: (
    <>
      <rect x="3" y="4" width="18" height="4" rx="1" />
      <rect x="3" y="10" width="18" height="4" rx="1" />
      <rect x="3" y="16" width="18" height="4" rx="1" />
      <circle cx="6" cy="6" r="0.6" fill="currentColor" stroke="none" />
      <circle cx="6" cy="12" r="0.6" fill="currentColor" stroke="none" />
      <circle cx="6" cy="18" r="0.6" fill="currentColor" stroke="none" />
    </>
  ),
  writing: (
    <>
      <path d="M16 3l5 5-11 11H5v-5z" />
      <path d="M14 5l5 5" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4 4" />
    </>
  ),
  external: (
    <>
      <path d="M14 4h6v6" />
      <path d="M20 4 10 14" />
      <path d="M19 13v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h6" />
    </>
  ),
  close: (
    <>
      <path d="m6 6 12 12M18 6 6 18" />
    </>
  ),
  x: (
    <>
      <path d="m6 6 12 12M18 6 6 18" />
    </>
  ),
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M5.6 18.4 7 17M17 7l1.4-1.4" />
    </>
  ),
  moon: (
    <>
      <path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z" />
    </>
  ),
  system: (
    <>
      <rect x="3" y="4" width="18" height="13" rx="2" />
      <path d="M8 21h8M12 17v4" />
    </>
  ),
  filter: (
    <>
      <path d="M4 5h16l-6 8v6l-4-2v-4z" />
    </>
  ),
  "chevron-down": (
    <>
      <path d="m6 9 6 6 6-6" />
    </>
  ),
};

export function Icon({
  name,
  size = 18,
  className,
  "aria-hidden": ariaHidden = true,
  "aria-label": ariaLabel,
}: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden={ariaHidden}
      aria-label={ariaLabel}
      role={ariaLabel ? "img" : undefined}
    >
      {PATHS[name]}
    </svg>
  );
}
