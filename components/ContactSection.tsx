import Container from "./Container";
import Reveal from "./Reveal";

export default function ContactSection() {
  return (
    <section className="py-section" aria-labelledby="contact-heading">
      <Container>
        <Reveal className="overflow-hidden rounded-lg bg-forest-800 text-on-dark shadow-lg">
          <div className="grid gap-10 p-8 md:grid-cols-2 md:p-12 lg:p-16">
            <div>
              <p className="font-sans text-meta font-semibold uppercase tracking-widest text-sage-400">
                Get in touch
              </p>
              <h2
                id="contact-heading"
                className="mt-4 font-serif text-h2 font-semibold !text-on-dark"
              >
                Connect with NZFFA
              </h2>
              <p className="mt-5 max-w-prose text-lead text-on-dark/85">
                Whether you are a current member or just getting started with
                trees on your land, we would love to hear from you.
              </p>
            </div>

            <dl className="grid gap-6 sm:grid-cols-2 md:gap-8">
              <div>
                <dt className="text-meta font-semibold uppercase tracking-widest text-sage-400">
                  National President
                </dt>
                <dd className="mt-2 font-serif text-h3 !text-on-dark">
                  Dougal Morrison
                </dd>
              </div>

              <div>
                <dt className="text-meta font-semibold uppercase tracking-widest text-sage-400">
                  National Office
                </dt>
                <dd className="mt-2 text-body text-on-dark/85">
                  General enquiries &amp; administration
                </dd>
              </div>

              <div>
                <dt className="text-meta font-semibold uppercase tracking-widest text-sage-400">
                  Email
                </dt>
                <dd className="mt-2 text-body">
                  <a
                    href="mailto:admin@nzffa.org.nz"
                    className="text-on-dark underline-offset-4 transition-colors hover:text-sage-200 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage-400 focus-visible:ring-offset-2 focus-visible:ring-offset-forest-800 rounded-sm"
                  >
                    admin@nzffa.org.nz
                  </a>
                </dd>
              </div>

              <div>
                <dt className="text-meta font-semibold uppercase tracking-widest text-sage-400">
                  Follow
                </dt>
                <dd className="mt-2 text-body">
                  <a
                    href="https://www.facebook.com/NZFarmForestry"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-on-dark underline-offset-4 transition-colors hover:text-sage-200 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage-400 focus-visible:ring-offset-2 focus-visible:ring-offset-forest-800 rounded-sm"
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
                </dd>
              </div>
            </dl>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
