"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties, ElementType, ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** Cascade direct children in one-by-one instead of fading the block. */
  stagger?: boolean;
  /** Extra delay before this block reveals (ms). */
  delay?: number;
};

// Fade + small translate as content enters the viewport. With `stagger`,
// direct children cascade in sequence. The recipes in globals.css disable
// all motion under prefers-reduced-motion, so this stays accessible.
export default function Reveal({
  children,
  as: Tag = "div",
  className = "",
  stagger = false,
  delay = 0,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -10% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const recipe = stagger ? "reveal-stagger" : "reveal";
  const style =
    !stagger && delay
      ? ({ "--reveal-delay": `${delay}ms` } as CSSProperties)
      : undefined;

  return (
    <Tag
      ref={ref}
      style={style}
      className={`${recipe} ${visible ? "is-visible" : ""} ${className}`}
    >
      {children}
    </Tag>
  );
}
