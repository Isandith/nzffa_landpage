import type { Metadata } from "next";
import Container from "@/components/Container";
import Button from "@/components/Button";

type PageProps = {
  params: Promise<{ slug: string }>;
};

// Turn a URL slug into a readable title, e.g.
// "member-portal" -> "Member Portal".
function formatTitle(slug: string): string {
  return slug
    .split("-")
    .filter(Boolean)
    .map((word) =>
      word.toUpperCase() === "NZFFA"
        ? "NZFFA"
        : word.charAt(0).toUpperCase() + word.slice(1),
    )
    .join(" ");
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: `${formatTitle(slug)} | Farm Forestry New Zealand`,
  };
}

export default async function PlaceholderPage({ params }: PageProps) {
  const { slug } = await params;
  const title = formatTitle(slug);

  return (
    <section className="py-section">
      <Container className="flex min-h-page flex-col items-center justify-center text-center">
        <p className="font-sans text-meta font-semibold uppercase tracking-widest text-forest-600">
          Future implementation
        </p>
        <h1 className="mt-4 max-w-3xl font-serif text-display font-semibold">
          {title}
        </h1>
        <p className="mt-6 max-w-prose text-lead text-ink-soft">
          This page is part of the New Zealand Farm Forestry Association site
          and is planned for a future implementation. In the meantime, head
          back to the homepage to explore the Association.
        </p>
        <div className="mt-8">
          <Button href="/" variant="secondary" size="lg">
            Back to homepage
          </Button>
        </div>
      </Container>
    </section>
  );
}
