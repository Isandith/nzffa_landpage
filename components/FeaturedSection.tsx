import Image from "next/image";
import Container from "./Container";
import Button from "./Button";
import Reveal from "./Reveal";
import NatureField from "./NatureField";

export default function FeaturedSection() {
  return (
    <section
      className="relative overflow-hidden py-section"
      aria-labelledby="featured-heading"
    >
      <NatureField />
      <Container>
        <Reveal className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Image first on mobile, second column on desktop */}
          <div className="order-1 lg:order-2">
            <div className="relative aspect-card overflow-hidden rounded-lg shadow-md">
              <Image
                src="https://www.nzffa.org.nz/system/assets/9496/nzffa-dam-w1500.webp"
                alt="A farm dam fringed by established trees, part of a diverse New Zealand farm forestry landscape"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>

          <div className="order-2 lg:order-1">
            <p className="font-sans text-meta font-semibold uppercase tracking-widest text-forest-600">
              Our purpose
            </p>
            <h2
              id="featured-heading"
              className="mt-4 font-serif text-h2 font-semibold"
            >
              Growing diverse, resilient and profitable farm forestry
            </h2>
            <div className="mt-6 max-w-prose space-y-4 text-lead text-ink-soft">
              <p>
                The Association brings together people who integrate trees with
                farming — for shelter, timber, conservation and income. By
                sharing what works across regions and species, we help land
                stay productive and resilient.
              </p>
              <p>
                Whether you manage a few hectares or a large property, NZFFA
                connects you with the knowledge, networks and research to grow
                trees well alongside the rest of your land use.
              </p>
            </div>
            <div className="mt-8">
              <Button href="/library" variant="secondary" size="lg">
                Discover growing trees
              </Button>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
