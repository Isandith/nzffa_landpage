"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";

type Slide = {
  src: string;
  alt: string;
};

// Official NZFFA photography used across the live site.
const slides: Slide[] = [
  {
    src: "https://www.nzffa.org.nz/system/assets/9495/nzffa-homestead-w3000.webp",
    alt: "A New Zealand farm homestead set among established trees and rolling green pasture",
  },
  {
    src: "https://www.nzffa.org.nz/system/assets/9496/nzffa-dam-w1500.webp",
    alt: "A farm dam fringed by established trees in a diverse farm forestry landscape",
  },
  {
    src: "https://www.nzffa.org.nz/system/assets/9494/nzffa-events-w2000.webp",
    alt: "Farm foresters gathered together at an NZFFA field day event",
  },
  {
    src: "https://www.nzffa.org.nz/system/assets/9497/nzffa-join-w1500.webp",
    alt: "Trees integrated with productive New Zealand farmland",
  },
];

const INTERVAL = 6000;

export default function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = slides.length;

  const goTo = useCallback((next: number) => {
    setIndex((next + slides.length) % slides.length);
  }, []);

  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  // Auto-advance, unless paused or the user prefers reduced motion.
  useEffect(() => {
    if (paused) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const id = window.setTimeout(() => {
      setIndex((current) => (current + 1) % slides.length);
    }, INTERVAL);
    return () => window.clearTimeout(id);
  }, [index, paused]);

  return (
    <div
      className="relative h-full w-full overflow-hidden bg-cream-200 lg:rounded-bl-lg"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      role="group"
      aria-roledescription="carousel"
      aria-label="NZFFA farm forestry photography"
    >
      {/* Sliding stack of images — no dark overlay, kept crisp and high-contrast */}
      {slides.map((slide, i) => (
        <div
          key={slide.src}
          aria-hidden={i !== index}
          className={`absolute inset-0 transition-opacity duration-700 ease-smooth motion-reduce:transition-none ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={slide.src}
            alt={i === index ? slide.alt : ""}
            fill
            priority={i === 0}
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
      ))}

      {/* Subtle bottom scrim so the controls stay legible over any photo */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-forest-900/55 to-forest-900/0"
      />

      {/* Prev / next controls */}
      <CarouselButton side="left" onClick={prev} label="Previous slide" />
      <CarouselButton side="right" onClick={next} label="Next slide" />

      {/* Dots — grouped in a frosted capsule; active dot is a gold accent bar */}
      <div className="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2.5 rounded-full border border-on-dark/20 bg-forest-900/35 px-3.5 py-2 backdrop-blur-md">
        {slides.map((slide, i) => {
          const active = i === index;
          return (
            <button
              key={slide.src}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1} of ${count}`}
              aria-current={active ? "true" : undefined}
              className="group/dot flex items-center focus-visible:outline-none"
            >
              <span
                className={`relative block h-1.5 overflow-hidden rounded-full transition-all duration-300 ease-smooth group-focus-visible/dot:ring-2 group-focus-visible/dot:ring-on-dark group-focus-visible/dot:ring-offset-2 group-focus-visible/dot:ring-offset-forest-900 ${
                  active
                    ? "w-8 bg-on-dark/30"
                    : "w-1.5 bg-on-dark/45 group-hover/dot:bg-on-dark/80"
                }`}
              >
                {/* Animated progress fill on the active dot */}
                {active && (
                  <span
                    key={index}
                    className="absolute inset-y-0 left-0 block w-full origin-left rounded-full bg-accent-500 motion-safe:animate-progress"
                  />
                )}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function CarouselButton({
  side,
  onClick,
  label,
}: {
  side: "left" | "right";
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`group absolute top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-on-dark/30 bg-cream/80 text-forest-700 shadow-md backdrop-blur-md transition duration-200 ease-smooth hover:scale-105 hover:bg-cream hover:text-forest-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-600 focus-visible:ring-offset-2 focus-visible:ring-offset-forest-900 motion-reduce:hover:scale-100 ${
        side === "left" ? "left-4" : "right-4"
      }`}
    >
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className={`transition-transform duration-200 ease-smooth ${
          side === "right"
            ? "rotate-180 group-hover:translate-x-0.5"
            : "group-hover:-translate-x-0.5"
        }`}
      >
        <path d="M15 18l-6-6 6-6" />
      </svg>
    </button>
  );
}
