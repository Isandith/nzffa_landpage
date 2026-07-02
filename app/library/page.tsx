import type { Metadata } from "next";
import LibraryBrowser from "@/components/LibraryBrowser";

export const metadata: Metadata = {
  title: "Library | Farm Forestry New Zealand",
};

export default function LibraryPage() {
  return (
    <section className="py-12 md:py-16">
      <div className="mx-auto w-full max-w-[1720px] px-5 md:px-10">
        <div className="max-w-2xl">
          <p className="font-sans text-xs font-semibold uppercase tracking-widest text-forest-600">
            Knowledge base
          </p>
          <h1 className="mt-2 font-serif text-h2 font-semibold">Library</h1>
          <p className="mt-3 text-body text-ink-soft">
            Explore resources, research, guides and tools to grow diverse,
            resilient and profitable farm forestry.
          </p>
        </div>

        <div className="mt-8">
          <LibraryBrowser />
        </div>
      </div>
    </section>
  );
}
