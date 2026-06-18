import Container from "./Container";
import Reveal from "./Reveal";
import NatureField from "./NatureField";

export default function AboutSection() {
  return (
    <section
      className="relative overflow-hidden py-section"
      aria-labelledby="intro-heading"
    >
      <NatureField />
      <Container>
        <Reveal className="grid items-start gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="font-sans text-meta font-semibold uppercase tracking-widest text-forest-600">
              Who we are
            </p>
            <h2
              id="intro-heading"
              className="mt-4 font-serif text-h2 font-semibold"
            >
              A community for everyone who cares about trees on the land
            </h2>
            <div className="mt-6 max-w-prose space-y-4 text-lead text-ink-soft">
              <p>
                The New Zealand Farm Forestry Association supports farmers,
                landowners and small-scale forest growers — and anyone with an
                interest in trees and sustainable land use.
              </p>
              <p>
                Through our regional branches and special interest groups, we
                share practical knowledge on growing and managing trees
                profitably alongside farming, helping members make the most of
                their land for generations to come.
              </p>
            </div>
          </div>

          <aside className="lg:col-span-5">
            <figure className="rounded-lg border border-border bg-cream-200 p-8 shadow-sm">
              <blockquote className="font-serif text-h3 leading-snug text-forest-800">
                “Diverse, resilient, profitable farm forestry — led by the people
                who grow it.”
              </blockquote>
              <figcaption className="mt-4 text-meta font-medium text-ink-soft">
                New Zealand Farm Forestry Association
              </figcaption>
            </figure>
          </aside>
        </Reveal>
      </Container>
    </section>
  );
}
