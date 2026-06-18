import Link from "next/link";
import type { ReactNode } from "react";
import Container from "./Container";
import Reveal from "./Reveal";

type Feature = {
  title: string;
  description: string;
  cta: string;
  href: string;
  icon: ReactNode;
};

const iconProps = {
  width: 26,
  height: 26,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

const features: Feature[] = [
  {
    title: "25 Regional Branches",
    description:
      "Local branches the length of the country run field days, events and shared learning close to where members grow.",
    cta: "Find your branch",
    href: "/about",
    icon: (
      <svg {...iconProps}>
        <path d="M12 21s-7-5.5-7-11a7 7 0 0 1 14 0c0 5.5-7 11-7 11Z" />
        <circle cx="12" cy="10" r="2.5" />
      </svg>
    ),
  },
  {
    title: "9 Special Interest Groups",
    description:
      "Action groups focused on particular species and themes, advancing research and best practice for farm foresters.",
    cta: "Explore the groups",
    href: "/about",
    icon: (
      <svg {...iconProps}>
        <circle cx="9" cy="8" r="3" />
        <circle cx="17" cy="11" r="2.5" />
        <path d="M3 20c0-3 2.7-5 6-5s6 2 6 5M14 19c.3-2 2-3.5 4.5-3.5" />
      </svg>
    ),
  },
  {
    title: "Specialty Wood Products Partnership",
    description:
      "A long-running programme of grower-led research lifting the value and quality of New Zealand specialty timbers.",
    cta: "Learn more",
    href: "/library",
    icon: (
      <svg {...iconProps}>
        <circle cx="12" cy="12" r="8.5" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="12" cy="12" r="1.6" />
      </svg>
    ),
  },
  {
    title: "Species Selection Tool",
    description:
      "Match the right tree species to your site, soils and goals with the Association's interactive selection tool.",
    cta: "Open the tool",
    href: "/tools",
    icon: (
      <svg {...iconProps}>
        <path d="M12 3c2.5 3 4 5 4 7.5A4 4 0 0 1 12 14.5 4 4 0 0 1 8 10.5C8 8 9.5 6 12 3Z" />
        <path d="M12 14.5V21M9 21h6" />
      </svg>
    ),
  },
  {
    title: "Events & Conferences",
    description:
      "Field days, branch gatherings and the annual conference connect growers with new ideas and each other.",
    cta: "See what's on",
    href: "/events",
    icon: (
      <svg {...iconProps}>
        <rect x="4" y="5" width="16" height="15" rx="2" />
        <path d="M4 9h16M8 3v4M16 3v4" />
      </svg>
    ),
  },
  {
    title: "Join NZFFA",
    description:
      "Become a member to access knowledge, events and a community working towards diverse, resilient, profitable forestry.",
    cta: "Become a member",
    href: "/join-nzffa",
    icon: (
      <svg {...iconProps}>
        <circle cx="12" cy="8" r="3.5" />
        <path d="M5 20c0-3.6 3.1-6 7-6s7 2.4 7 6" />
      </svg>
    ),
  },
];

export default function FeatureGrid() {
  return (
    <section
      className="bg-cream-200 py-section"
      aria-labelledby="opportunities-heading"
    >
      <Container>
        <Reveal className="max-w-2xl">
          <p className="font-sans text-meta font-semibold uppercase tracking-widest text-forest-600">
            Get involved
          </p>
          <h2
            id="opportunities-heading"
            className="mt-4 font-serif text-h2 font-semibold"
          >
            Key NZFFA opportunities
          </h2>
          <p className="mt-4 text-lead text-ink-soft">
            From local branches to national programmes, here is how members
            connect, learn and grow with the Association.
          </p>
        </Reveal>

        <Reveal
          as="ul"
          stagger
          className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((feature) => (
            <li key={feature.title}>
              <Link
                href={feature.href}
                className="group relative flex h-full flex-col overflow-hidden rounded-lg border border-border bg-surface p-7 shadow-sm transition duration-300 ease-smooth hover:-translate-y-1.5 hover:border-forest-500 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-600 focus-visible:ring-offset-2 focus-visible:ring-offset-cream-200"
              >
                {/* Gold accent bar that sweeps across the top on hover */}
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-forest-600 to-accent-500 transition-transform duration-300 ease-smooth group-hover:scale-x-100"
                />
                {/* Faint sheen that warms the card surface on hover */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-sage-200 opacity-0 blur-2xl transition-opacity duration-300 ease-smooth group-hover:opacity-70"
                />

                <span className="relative flex h-12 w-12 items-center justify-center rounded-md bg-sage-200 text-forest-700 transition-all duration-300 ease-smooth group-hover:-rotate-6 group-hover:scale-110 group-hover:bg-forest-700 group-hover:text-on-dark">
                  {feature.icon}
                </span>
                <h3 className="relative mt-5 font-serif text-h3 font-semibold transition-colors duration-200 ease-smooth group-hover:text-forest-700">
                  {feature.title}
                </h3>
                <p className="relative mt-3 flex-1 text-body text-ink-soft">
                  {feature.description}
                </p>
                <span className="relative mt-5 inline-flex items-center gap-1.5 font-sans text-meta font-semibold text-forest-700">
                  {feature.cta}
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    className="transition-transform duration-200 ease-smooth group-hover:translate-x-1"
                  >
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </span>
              </Link>
            </li>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
