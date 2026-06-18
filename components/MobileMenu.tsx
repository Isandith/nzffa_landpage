"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Button from "./Button";
import { primaryNav, utilityNav, joinLink } from "@/lib/nav";

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
};

export default function MobileMenu({ open, onClose }: MobileMenuProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  // Close on Escape, lock body scroll, focus-trap inside the panel.
  useEffect(() => {
    if (!open) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    firstLinkRef.current?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab") return;

      const focusables = panelRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])',
      );
      if (!focusables || focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
      previouslyFocused?.focus();
    };
  }, [open, onClose]);

  return (
    <div
      className={`fixed inset-0 z-50 lg:hidden ${
        open ? "" : "pointer-events-none"
      }`}
      aria-hidden={!open}
    >
      {/* Scrim */}
      <button
        type="button"
        aria-label="Close menu"
        onClick={onClose}
        className={`absolute inset-0 bg-forest-900/50 transition-opacity duration-200 ease-smooth ${
          open ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Slide-in panel */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        className={`absolute right-0 top-0 flex h-full w-drawer flex-col gap-8 overflow-y-auto bg-cream px-6 py-6 shadow-lg transition-transform duration-300 ease-smooth ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between">
          <span className="font-serif text-h3 text-forest-800">Menu</span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="rounded-sm p-2 text-ink transition hover:bg-sage-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-600"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        <nav aria-label="Primary" className="flex flex-col">
          {primaryNav.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              ref={index === 0 ? firstLinkRef : undefined}
              onClick={onClose}
              className="border-b border-border py-3 font-sans font-medium text-ink transition-colors hover:text-forest-700 focus-visible:outline-none focus-visible:text-forest-700"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <nav aria-label="Utility" className="flex flex-col gap-3 text-meta">
          {utilityNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className="text-ink-soft transition-colors hover:text-forest-700 focus-visible:outline-none focus-visible:text-forest-700"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Button href={joinLink.href} variant="primary" size="lg" className="w-full">
          {joinLink.label}
        </Button>
      </div>
    </div>
  );
}
