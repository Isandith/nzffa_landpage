import type { CSSProperties } from "react";

type Shape = "leaf" | "tree" | "flower";

type Item = {
  shape: Shape;
  left: string;
  size: number;
  duration: string;
  delay: string;
  opacity: string;
};

// Fixed (deterministic) set so server and client markup match — no random.
const items: Item[] = [
  { shape: "leaf", left: "6%", size: 22, duration: "17s", delay: "0s", opacity: "0.5" },
  { shape: "tree", left: "18%", size: 26, duration: "22s", delay: "3s", opacity: "0.4" },
  { shape: "flower", left: "30%", size: 20, duration: "19s", delay: "7s", opacity: "0.45" },
  { shape: "leaf", left: "44%", size: 18, duration: "15s", delay: "1.5s", opacity: "0.5" },
  { shape: "tree", left: "58%", size: 24, duration: "24s", delay: "9s", opacity: "0.4" },
  { shape: "flower", left: "70%", size: 22, duration: "20s", delay: "4.5s", opacity: "0.45" },
  { shape: "leaf", left: "82%", size: 20, duration: "18s", delay: "6s", opacity: "0.5" },
  { shape: "tree", left: "92%", size: 18, duration: "21s", delay: "11s", opacity: "0.35" },
];

function Glyph({ shape, size }: { shape: Shape; size: number }) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "currentColor",
    "aria-hidden": true,
  } as const;

  if (shape === "tree") {
    return (
      <svg {...common}>
        <path d="M12 2c2.4 3 4 5 4 7.2A4 4 0 0 1 12.9 13H13v3h-2v-3h.1A4 4 0 0 1 8 9.2C8 7 9.6 5 12 2Z" />
        <rect x="11.2" y="15" width="1.6" height="5" rx="0.8" />
      </svg>
    );
  }
  if (shape === "flower") {
    return (
      <svg {...common}>
        <circle cx="12" cy="6" r="2.4" />
        <circle cx="12" cy="13.5" r="2.4" />
        <circle cx="8.2" cy="9.7" r="2.4" />
        <circle cx="15.8" cy="9.7" r="2.4" />
        <circle cx="12" cy="9.7" r="1.6" fill="var(--color-accent-500)" />
      </svg>
    );
  }
  // leaf
  return (
    <svg {...common}>
      <path d="M5 19c0-7 5-12 14-13-1 9-6 14-13 14-0.4 0-0.7 0-1-0.1.6-2.6 2-4.8 4.2-6.3C7 14.9 5.7 16.8 5 19Z" />
    </svg>
  );
}

// Decorative drifting nature elements for an otherwise flat section
// background. Marked aria-hidden; disabled under prefers-reduced-motion.
export default function NatureField() {
  return (
    <div className="nature-field" aria-hidden="true">
      {items.map((item, i) => (
        <span
          key={i}
          className="nature-item"
          style={
            {
              left: item.left,
              "--float-duration": item.duration,
              "--float-delay": item.delay,
              "--float-opacity": item.opacity,
            } as CSSProperties
          }
        >
          <Glyph shape={item.shape} size={item.size} />
        </span>
      ))}
    </div>
  );
}
