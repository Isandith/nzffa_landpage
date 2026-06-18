import Link from "next/link";
import Image from "next/image";

type LogoProps = {
  // When true, render light text for use over the dark hero / footer.
  onDark?: boolean;
};

// Official NZFFA brand lockup: circular logo mark + the English wordmark,
// a vertical divider, then the te reo Māori name in the gold accent.
// Layout follows the live nzffa.org.nz header exactly.
export default function Logo({ onDark = false }: LogoProps) {
  const titleColor = onDark ? "text-on-dark text-shadow-hero" : "text-forest-800";
  const titleHover = onDark ? "group-hover:text-sage-200" : "group-hover:text-forest-600";
  const dividerColor = onDark ? "bg-on-dark/30" : "bg-border";

  return (
    <Link
      href="/"
      aria-label="Farm Forestry New Zealand — Oranga Rākau Aotearoa — home"
      className="group flex items-center gap-3 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-600 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
    >
      <Image
        src="/NZFFA_Logo-CMYK_small.png"
        alt=""
        width={48}
        height={48}
        priority
        className="h-12 w-12 shrink-0 transition-transform duration-200 ease-smooth group-hover:scale-105"
      />

      <span className="flex items-center gap-3 whitespace-nowrap">
        <span
          className={`font-serif text-lg font-bold leading-tight transition-colors duration-200 ease-smooth ${titleHover} ${titleColor}`}
        >
          Farm Forestry
          <br />
          New Zealand
        </span>

        <span
          aria-hidden="true"
          className={`h-9 w-px self-center ${dividerColor}`}
        />

        <span className="font-sans text-meta leading-tight text-accent-600">
          Oranga Rākau
          <br />
          Aotearoa
        </span>
      </span>
    </Link>
  );
}
