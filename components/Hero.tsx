import Container from "./Container";
import Button from "./Button";
import HeroCarousel from "./HeroCarousel";
import NatureField from "./NatureField";

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-cream">
      <NatureField />
      {/* Full-bleed carousel: pinned to the top-right, the entire right half
          of the viewport, edge-to-edge. Stacks below the copy on mobile. */}
      <div className="relative h-hero-card w-full lg:absolute lg:inset-y-0 lg:right-0 lg:h-full lg:w-1/2">
        <HeroCarousel />
      </div>

      <Container className="relative grid lg:grid-cols-2">
        {/* Copy — wording unchanged — sits in the left column */}
        <div className="max-w-2xl py-section lg:pr-12">
          <p className="font-sans text-meta font-semibold uppercase tracking-widest text-forest-600">
            Diverse • Resilient • Profitable
          </p>
          <h1 className="mt-4 font-serif text-display font-semibold">
            Welcome to the New Zealand Farm Forestry Association
          </h1>
          <p className="mt-5 max-w-xl text-lead text-ink-soft">
            Community-led forestry innovation since 1957.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button href="/about" variant="primary" size="lg">
              Explore NZFFA
            </Button>
            <Button href="/join-nzffa" variant="secondary" size="lg">
              Join NZFFA
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
