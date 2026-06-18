import Link from "next/link";
import Container from "./Container";
import Logo from "./Logo";
import { primaryNav, utilityNav, joinLink } from "@/lib/nav";

export default function Footer() {
  const year = new Date().getFullYear();
  const allLinks = [...primaryNav, joinLink, ...utilityNav];

  return (
    <footer className="border-t border-accent-600/40 bg-forest-950 text-accent-500">
      <Container className="grid gap-12 py-section md:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-4 lg:col-span-2">
          <Logo onDark />
          <p className="max-w-prose text-meta text-accent-500/90">
            Community-led forestry innovation since 1957. Supporting farmers,
            landowners and small-scale forest growers across Aotearoa New
            Zealand.
          </p>
        </div>

        <nav aria-label="Footer navigation">
          <h2 className="font-serif text-h3 text-accent-500">Explore</h2>
          <ul className="mt-4 space-y-2.5 text-meta">
            {allLinks.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-accent-500/85 transition-colors hover:text-accent-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 rounded-sm"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="font-serif text-h3 text-accent-500">Contact</h2>
          <ul className="mt-4 space-y-2.5 text-meta text-accent-500/85">
            <li>National Office — general enquiries</li>
            <li>
              <a
                href="mailto:admin@nzffa.org.nz"
                className="transition-colors hover:text-accent-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 rounded-sm"
              >
                admin@nzffa.org.nz
              </a>
            </li>
            <li>
              <a
                href="https://www.facebook.com/NZFarmForestry"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 transition-colors hover:text-accent-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 rounded-sm"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M13.5 21v-7h2.4l.36-2.8H13.5V9.4c0-.81.23-1.36 1.39-1.36h1.48V5.53A19.6 19.6 0 0 0 14.2 5.4c-2.14 0-3.6 1.31-3.6 3.71v2.09H8.2V14h2.4v7h2.9Z" />
                </svg>
                Facebook
              </a>
            </li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-accent-600/25">
        <Container className="flex flex-col items-center justify-between gap-2 py-6 text-meta text-accent-500/75 sm:flex-row">
          <p>© {year} New Zealand Farm Forestry Association. All rights reserved.</p>
          <p>Oranga Rākau Aotearoa</p>
        </Container>
      </div>
    </footer>
  );
}
