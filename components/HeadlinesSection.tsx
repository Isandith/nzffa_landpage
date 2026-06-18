import Link from "next/link";
import Container from "./Container";
import Reveal from "./Reveal";

type Headline = {
  title: string;
  date: string;
  excerpt: string;
  href: string;
};

// Three real, recent items from the NZFFA homepage "Farm Forestry – Headlines".
const headlines: Headline[] = [
  {
    title:
      "Update to the Forest Owners Association Road Engineering Manual",
    date: "19 September 2024",
    excerpt:
      "The NZFOA/NZFFA Transport and Logistics committee announces a new appendix to the New Zealand Forest Owners Road Engineering Manual, covering forest road design for HPMVs.",
    href: "/news",
  },
  {
    title: "Emissions Trading Scheme fee review a relief for cost-struck foresters",
    date: "29 February 2024",
    excerpt:
      "The Forest Owners Association says the review of the Emissions Trading Scheme fees is a relief for foresters facing excessive costs and loss of climate change action.",
    href: "/news",
  },
  {
    title: "Planting trees on pasture can have a positive impact on soil health",
    date: "20 December 2023",
    excerpt:
      "Rather than damaging soil, planting trees on pasture in New Zealand restores it towards its original condition — a finding that counters recent reporting.",
    href: "/news",
  },
];

export default function HeadlinesSection() {
  return (
    <section
      className="bg-cream-200 py-section"
      aria-labelledby="headlines-heading"
    >
      <Container>
        <Reveal className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <p className="font-sans text-meta font-semibold uppercase tracking-widest text-forest-600">
              Latest news
            </p>
            <h2
              id="headlines-heading"
              className="mt-4 font-serif text-h2 font-semibold"
            >
              Farm Forestry — Headlines
            </h2>
          </div>
          <Link
            href="/news"
            className="font-sans text-meta font-semibold text-forest-700 transition-colors hover:text-forest-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-600 focus-visible:ring-offset-2 focus-visible:ring-offset-cream-200 rounded-sm"
          >
            Article archive →
          </Link>
        </Reveal>

        <Reveal as="ul" stagger className="mt-10 grid gap-6 md:grid-cols-3">
          {headlines.map((item) => (
            <li key={item.title}>
              <article className="group relative flex h-full flex-col overflow-hidden rounded-lg border border-border bg-surface p-7 shadow-sm transition duration-300 ease-smooth hover:-translate-y-1.5 hover:border-accent-500 hover:shadow-lg">
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-accent-600 to-accent-500 transition-transform duration-300 ease-smooth group-hover:scale-x-100"
                />
                <time className="font-sans text-meta font-medium text-accent-600">
                  {item.date}
                </time>
                <h3 className="mt-3 font-serif text-h3 font-semibold leading-snug transition-colors duration-200 ease-smooth group-hover:text-forest-700">
                  {item.title}
                </h3>
                <p className="mt-3 flex-1 text-body text-ink-soft">
                  {item.excerpt}
                </p>
                <Link
                  href={item.href}
                  className="mt-5 inline-flex items-center gap-1.5 font-sans text-meta font-semibold text-forest-700 transition-colors hover:text-forest-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-600 focus-visible:ring-offset-2 focus-visible:ring-offset-surface rounded-sm"
                >
                  Read more
                  <span aria-hidden="true">→</span>
                  <span className="sr-only">about {item.title}</span>
                </Link>
              </article>
            </li>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
