"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import Button from "./Button";
import MobileMenu from "./MobileMenu";
import Container from "./Container";
import { primaryNav, utilityNav, joinLink } from "@/lib/nav";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);

  // Header is always a solid frosted bar; deepen the shadow once scrolled.
  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 16);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Publish the header's real rendered height as a CSS variable so other
  // sticky elements (e.g. the library filters sidebar) can dock just below
  // it instead of guessing a fixed offset that drifts across breakpoints.
  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const setHeight = () =>
      document.documentElement.style.setProperty(
        "--header-height",
        `${el.offsetHeight}px`,
      );
    setHeight();
    const observer = new ResizeObserver(setHeight);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <header
      ref={headerRef}
      className={`sticky top-0 z-40 border-b border-border bg-cream/85 backdrop-blur-md transition-shadow duration-300 ease-smooth ${
        scrolled ? "shadow-md" : "shadow-sm"
      }`}
    >
      {/* Top utility bar — desktop only, right-aligned */}
      <Container className="hidden lg:block">
        <nav
          aria-label="Utility"
          className="flex items-center justify-end gap-6 border-b border-border/60 py-2 text-meta"
        >
          {utilityNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="whitespace-nowrap font-medium text-ink-soft transition-colors hover:text-forest-700 hover:underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-600 focus-visible:ring-offset-2 focus-visible:ring-offset-cream rounded-sm"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </Container>

      {/* Main row — logo left, primary nav centre, CTA right (full width) */}
      <Container className="flex items-center gap-6 py-3">
        <Logo />

        <nav
          aria-label="Primary"
          className="hidden flex-1 items-center justify-center gap-8 xl:flex"
        >
          {primaryNav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`relative whitespace-nowrap font-sans font-semibold text-ink transition-colors after:absolute after:-bottom-1.5 after:left-0 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:rounded-full after:bg-forest-700 after:transition-transform after:duration-200 after:ease-smooth hover:text-forest-700 hover:after:scale-x-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-600 focus-visible:ring-offset-2 focus-visible:ring-offset-cream rounded-sm ${
                  active ? "after:scale-x-100" : ""
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto hidden shrink-0 lg:block xl:ml-0">
          <Button
            href={joinLink.href}
            variant="primary"
            className="whitespace-nowrap px-8"
          >
            {joinLink.label}
          </Button>
        </div>

        {/* Mobile / tablet menu toggle */}
        <button
          type="button"
          onClick={() => setMenuOpen((o) => !o)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          className="ml-auto rounded-sm p-2 text-ink transition hover:bg-sage-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-600 lg:hidden"
        >
          <svg
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden="true"
          >
            {menuOpen ? (
              <path d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </Container>

      <div id="mobile-menu">
        <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
      </div>
    </header>
  );
}
