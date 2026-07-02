"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

type ResourceType =
  | "Guides & fact sheets"
  | "Research & reports"
  | "Case studies"
  | "Tools & templates"
  | "Videos & webinars";

type Resource = {
  title: string;
  type: ResourceType;
  description: string;
  source: string;
  year: number;
  format: string;
  length: string;
  topics: string[];
  image: string;
};

const resourceTypes: ResourceType[] = [
  "Guides & fact sheets",
  "Research & reports",
  "Case studies",
  "Tools & templates",
  "Videos & webinars",
];

const topicOptions = [
  "Tree species",
  "Establishment",
  "Silviculture & pruning",
  "Harvest & markets",
  "Carbon & ETS",
  "Environment & erosion",
];

const mediaTypeOptions = ["PDF", "Video", "XLSX"];

// Quick-search suggestions shown under the search bar.
const popularSearches = ["Radiata pine", "Cypress", "Eucalypts", "ETS", "Natives", "Erosion"];

const PAGE_SIZE = 8;

// Dummy content standing in for the future library API/CMS. Titles, sources
// and themes mirror the real NZFFA resource areas (nzffa.org.nz): species
// action groups, the Specialty Wood Products partnership, ETS guidance,
// erosion control and small-scale milling.
const resources: Resource[] = [
  {
    title: "Radiata pine thinning: A practical guide",
    type: "Guides & fact sheets",
    description:
      "A practical guide to thinning Radiata pine plantations for improved growth, stand quality and returns.",
    source: "NZFFA",
    year: 2023,
    format: "PDF",
    length: "12 pages",
    topics: ["Tree species", "Silviculture & pruning"],
    image: "photo-1425913397330-cf8af2ff40a1",
  },
  {
    title: "Stocktake of commercially viable alternatives to Pinus radiata",
    type: "Research & reports",
    description:
      "A national stocktake of alternative timber species — cypresses, eucalypts, redwoods and Douglas-fir — assessing site suitability, markets and returns.",
    source: "SWP Partnership",
    year: 2023,
    format: "PDF",
    length: "64 pages",
    topics: ["Tree species", "Harvest & markets"],
    image: "photo-1470019693664-1d202d2c0907",
  },
  {
    title: "Cypress canker: recognising and managing the disease",
    type: "Guides & fact sheets",
    description:
      "How to identify cypress canker in macrocarpa and lusitanica stands, plus siting, breeding and management options to reduce risk.",
    source: "NZFFA",
    year: 2022,
    format: "PDF",
    length: "8 pages",
    topics: ["Tree species", "Establishment"],
    image: "photo-1523712999610-f77fbcfc3843",
  },
  {
    title: "Growing eucalypts for ground-durable posts and sawn timber",
    type: "Research & reports",
    description:
      "Research on naturally durable eucalypt species as a chemical-free alternative for vineyard posts, farm fencing and specialty sawn timber.",
    source: "NZDFI",
    year: 2023,
    format: "PDF",
    length: "42 pages",
    topics: ["Tree species", "Harvest & markets"],
    image: "photo-1509316975850-ff9c5deb0cd9",
  },
  {
    title: "Pruning for clearwood: silviculture that pays",
    type: "Guides & fact sheets",
    description:
      "Timing, tools and target regimes for pruning radiata, cypress and blackwood to grow high-value clearwood on farm woodlots.",
    source: "NZFFA",
    year: 2021,
    format: "PDF",
    length: "16 pages",
    topics: ["Silviculture & pruning"],
    image: "photo-1440342359743-84fcb8c21f21",
  },
  {
    title: "Poplar and willow: erosion control on hill country farms",
    type: "Videos & webinars",
    description:
      "Field demonstration of space-planted poplar and willow for gully and slope stabilisation, from pole planting through to pollarding.",
    source: "NZFFA",
    year: 2023,
    format: "Video",
    length: "18 min",
    topics: ["Environment & erosion", "Establishment"],
    image: "photo-1516214104703-d870798883c5",
  },
  {
    title: "Small forest owner's guide to the Emissions Trading Scheme",
    type: "Guides & fact sheets",
    description:
      "Plain-English guidance on ETS registration, carbon accounting options, and obligations at harvest for post-1989 forest land.",
    source: "Te Uru Rākau",
    year: 2024,
    format: "PDF",
    length: "24 pages",
    topics: ["Carbon & ETS"],
    image: "photo-1470071459604-3b5ec3a7fe05",
  },
  {
    title: "Milling and marketing macrocarpa in South Otago",
    type: "Case studies",
    description:
      "How one family woodlot turned a 60-year-old macrocarpa shelterbelt into premium sawn timber through local milling and direct sales.",
    source: "NZFFA",
    year: 2022,
    format: "PDF",
    length: "6 pages",
    topics: ["Harvest & markets", "Tree species"],
    image: "photo-1483086431886-3590a88317fe",
  },
  {
    title: "Continuous cover forestry: alternatives to clearfell",
    type: "Research & reports",
    description:
      "An assessment of continuous cover and small-coupe regimes for New Zealand conditions, covering yields, economics and erosion outcomes.",
    source: "Scion",
    year: 2021,
    format: "PDF",
    length: "38 pages",
    topics: ["Silviculture & pruning", "Environment & erosion"],
    image: "photo-1511497584788-876760111969",
  },
  {
    title: "Establishing natives on retired hill country at Rewanui",
    type: "Case studies",
    description:
      "A decade of lessons from converting erosion-prone Wairarapa hill country to mānuka, tōtara and mixed indigenous forest.",
    source: "NZFFA",
    year: 2023,
    format: "PDF",
    length: "10 pages",
    topics: ["Establishment", "Environment & erosion"],
    image: "photo-1518623001395-125242310d0c",
  },
  {
    title: "Coast redwood growth performance across New Zealand sites",
    type: "Research & reports",
    description:
      "Growth, form and timber quality data from redwood trials nationwide, with siting guidance for farm-scale plantings.",
    source: "SWP Partnership",
    year: 2022,
    format: "PDF",
    length: "30 pages",
    topics: ["Tree species", "Establishment"],
    image: "photo-1476231682828-37e571bc172f",
  },
  {
    title: "Blackwood silviculture: form pruning for quality",
    type: "Guides & fact sheets",
    description:
      "A regime guide for Australian blackwood — early form pruning, clearwood lifts and final-crop stocking for furniture-grade timber.",
    source: "NZFFA",
    year: 2020,
    format: "PDF",
    length: "14 pages",
    topics: ["Tree species", "Silviculture & pruning"],
    image: "photo-1441974231531-c6227db76b6e",
  },
  {
    title: "Farm forestry establishment budget calculator",
    type: "Tools & templates",
    description:
      "A downloadable spreadsheet for estimating establishment costs and modelling returns across a woodlot's full rotation.",
    source: "NZFFA",
    year: 2023,
    format: "XLSX",
    length: "1 workbook",
    topics: ["Establishment", "Harvest & markets"],
    image: "photo-1548407260-da850faa41e3",
  },
  {
    title: "Shelterbelt design planner and species list",
    type: "Tools & templates",
    description:
      "A planning template for multi-row shelterbelts: spacing, species mixes for wind zones, and stock-shelter layouts for dairy and sheep farms.",
    source: "NZFFA",
    year: 2021,
    format: "PDF",
    length: "2 templates",
    topics: ["Establishment", "Environment & erosion"],
    image: "photo-1509316785289-025f5b846b35",
  },
  {
    title: "Webinar: Getting the most from your woodlot at harvest",
    type: "Videos & webinars",
    description:
      "Recorded webinar covering harvest planning, contractor selection and getting the best value from log markets.",
    source: "NZFFA",
    year: 2024,
    format: "Video",
    length: "52 min",
    topics: ["Harvest & markets"],
    image: "photo-1502082553048-f009c37129b9",
  },
  {
    title: "Field day: wide-spaced poplar silvopasture in Manawatū",
    type: "Videos & webinars",
    description:
      "Branch field day recording — grazing under wide-spaced poplars, balancing pasture production with timber and soil stability.",
    source: "NZFFA",
    year: 2022,
    format: "Video",
    length: "26 min",
    topics: ["Environment & erosion", "Tree species"],
    image: "photo-1425913397330-cf8af2ff40a1",
  },
  {
    title: "Planting poplars and willows: assessing the site",
    type: "Videos & webinars",
    description:
      "Learn how to assess hill country sites and place poles for best effect to reduce erosion.",
    source: "Poplar & Willow Research Trust",
    year: 2016,
    format: "Video",
    length: "6 min",
    topics: ["Environment & erosion", "Establishment"],
    image: "photo-1516214104703-d870798883c5",
  },
  {
    title: "Planting poplars and willows: choosing the best poles",
    type: "Videos & webinars",
    description:
      "Guidance on choosing the right poplar and willow poles in terms of size and variety for your site.",
    source: "Poplar & Willow Research Trust",
    year: 2016,
    format: "Video",
    length: "5 min",
    topics: ["Tree species", "Establishment"],
    image: "photo-1470019693664-1d202d2c0907",
  },
  {
    title: "Managing poplars and willows: form-pruning poplars",
    type: "Videos & webinars",
    description:
      "Single-stemmed poplars are healthier, allow better pasture growth beneath them and are more likely to produce millable logs.",
    source: "Poplar & Willow Research Trust",
    year: 2017,
    format: "Video",
    length: "7 min",
    topics: ["Silviculture & pruning"],
    image: "photo-1523712999610-f77fbcfc3843",
  },
  {
    title: "New Zealand poplar farm milling",
    type: "Videos & webinars",
    description:
      "A combined video covering milling poplar trees on the farm and what the resulting timber can be used for.",
    source: "Poplar & Willow Research Trust",
    year: 2019,
    format: "Video",
    length: "34 min",
    topics: ["Harvest & markets", "Tree species"],
    image: "photo-1548407260-da850faa41e3",
  },
];

type View = "list" | "grid";

// Small removable chip used in the active-filters row.
function FilterChip({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <button
      type="button"
      onClick={onRemove}
      className="group inline-flex items-center gap-1.5 rounded-full border border-forest-600/30 bg-sage-200/60 py-1 pl-3 pr-2 font-sans text-xs font-semibold text-forest-700 transition-colors hover:border-forest-600 hover:bg-sage-200"
    >
      {label}
      <span
        aria-hidden="true"
        className="flex h-4 w-4 items-center justify-center rounded-full text-forest-600 transition-colors group-hover:bg-forest-700 group-hover:text-on-dark"
      >
        <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
          <path d="M6 6l12 12M18 6 6 18" />
        </svg>
      </span>
    </button>
  );
}

export default function LibraryBrowser() {
  const [query, setQuery] = useState("");
  const [selectedTypes, setSelectedTypes] = useState<ResourceType[]>([]);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [selectedMediaTypes, setSelectedMediaTypes] = useState<string[]>([]);
  const [sort, setSort] = useState("Most relevant");
  const [view, setView] = useState<View>("list");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  function toggleType(type: ResourceType) {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type],
    );
    setVisibleCount(PAGE_SIZE);
  }

  function toggleTopic(topic: string) {
    setSelectedTopics((prev) =>
      prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic],
    );
    setVisibleCount(PAGE_SIZE);
  }

  function toggleMediaType(mediaType: string) {
    setSelectedMediaTypes((prev) =>
      prev.includes(mediaType)
        ? prev.filter((t) => t !== mediaType)
        : [...prev, mediaType],
    );
    setVisibleCount(PAGE_SIZE);
  }

  function updateQuery(value: string) {
    setQuery(value);
    setVisibleCount(PAGE_SIZE);
  }

  function resetAll() {
    setSelectedTypes([]);
    setSelectedTopics([]);
    setSelectedMediaTypes([]);
    setVisibleCount(PAGE_SIZE);
  }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let results = resources.filter((r) => {
      const matchesQuery =
        q.length === 0 ||
        r.title.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q) ||
        r.topics.some((t) => t.toLowerCase().includes(q));
      const matchesType =
        selectedTypes.length === 0 || selectedTypes.includes(r.type);
      const matchesTopic =
        selectedTopics.length === 0 ||
        r.topics.some((t) => selectedTopics.includes(t));
      const matchesMediaType =
        selectedMediaTypes.length === 0 ||
        selectedMediaTypes.includes(r.format);
      return matchesQuery && matchesType && matchesTopic && matchesMediaType;
    });

    if (sort === "Most recent") {
      results = [...results].sort((a, b) => b.year - a.year);
    } else if (sort === "A–Z") {
      results = [...results].sort((a, b) => a.title.localeCompare(b.title));
    }

    return results;
  }, [query, selectedTypes, selectedTopics, selectedMediaTypes, sort]);

  const visible = filtered.slice(0, visibleCount);

  const typeCounts = useMemo(() => {
    const counts = new Map<ResourceType, number>();
    for (const type of resourceTypes) {
      counts.set(type, resources.filter((r) => r.type === type).length);
    }
    return counts;
  }, []);

  const topicCounts = useMemo(() => {
    const counts = new Map<string, number>();
    for (const topic of topicOptions) {
      counts.set(topic, resources.filter((r) => r.topics.includes(topic)).length);
    }
    return counts;
  }, []);

  const mediaTypeCounts = useMemo(() => {
    const counts = new Map<string, number>();
    for (const mediaType of mediaTypeOptions) {
      counts.set(mediaType, resources.filter((r) => r.format === mediaType).length);
    }
    return counts;
  }, []);

  const hasFilters =
    selectedTypes.length > 0 ||
    selectedTopics.length > 0 ||
    selectedMediaTypes.length > 0;

  return (
    <div className="grid gap-6 lg:grid-cols-[240px_1fr] lg:gap-8">
      {/* Filters sidebar */}
      <aside
        className="lg:sticky lg:self-start"
        style={{ top: "calc(var(--header-height) + 1.5rem)" }}
      >
        <div className="rounded-lg border border-border bg-surface p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-lg font-semibold">Filters</h2>
            <button
              type="button"
              onClick={resetAll}
              disabled={!hasFilters}
              className="font-sans text-xs font-semibold text-forest-600 transition-colors hover:text-forest-700 disabled:cursor-not-allowed disabled:text-ink-soft/50"
            >
              Reset all
            </button>
          </div>

          <fieldset className="mt-5 border-t border-border pt-5">
            <legend className="font-sans text-xs font-semibold uppercase tracking-widest text-ink-soft">
              Resource type
            </legend>
            <ul className="mt-3 space-y-0.5">
              {resourceTypes.map((type) => (
                <li key={type}>
                  <label className="group flex cursor-pointer items-center justify-between gap-2 rounded-md px-2 py-1.5 text-meta text-ink transition-colors hover:bg-sage-200/50">
                    <span className="flex items-center gap-2.5">
                      <input
                        type="checkbox"
                        checked={selectedTypes.includes(type)}
                        onChange={() => toggleType(type)}
                        className="h-4 w-4 rounded border-border text-forest-700 accent-forest-700 focus-visible:ring-2 focus-visible:ring-forest-600"
                      />
                      {type}
                    </span>
                    <span className="text-xs text-ink-soft">
                      {typeCounts.get(type)}
                    </span>
                  </label>
                </li>
              ))}
            </ul>
          </fieldset>

          <fieldset className="mt-5 border-t border-border pt-5">
            <legend className="font-sans text-xs font-semibold uppercase tracking-widest text-ink-soft">
              Topic
            </legend>
            <ul className="mt-3 space-y-0.5">
              {topicOptions.map((topic) => (
                <li key={topic}>
                  <label className="group flex cursor-pointer items-center justify-between gap-2 rounded-md px-2 py-1.5 text-meta text-ink transition-colors hover:bg-sage-200/50">
                    <span className="flex items-center gap-2.5">
                      <input
                        type="checkbox"
                        checked={selectedTopics.includes(topic)}
                        onChange={() => toggleTopic(topic)}
                        className="h-4 w-4 rounded border-border text-forest-700 accent-forest-700 focus-visible:ring-2 focus-visible:ring-forest-600"
                      />
                      {topic}
                    </span>
                    <span className="text-xs text-ink-soft">
                      {topicCounts.get(topic)}
                    </span>
                  </label>
                </li>
              ))}
            </ul>
          </fieldset>

          <fieldset className="mt-5 border-t border-border pt-5">
            <legend className="font-sans text-xs font-semibold uppercase tracking-widest text-ink-soft">
              Media type
            </legend>
            <ul className="mt-3 space-y-0.5">
              {mediaTypeOptions.map((mediaType) => (
                <li key={mediaType}>
                  <label className="group flex cursor-pointer items-center justify-between gap-2 rounded-md px-2 py-1.5 text-meta text-ink transition-colors hover:bg-sage-200/50">
                    <span className="flex items-center gap-2.5">
                      <input
                        type="checkbox"
                        checked={selectedMediaTypes.includes(mediaType)}
                        onChange={() => toggleMediaType(mediaType)}
                        className="h-4 w-4 rounded border-border text-forest-700 accent-forest-700 focus-visible:ring-2 focus-visible:ring-forest-600"
                      />
                      {mediaType}
                    </span>
                    <span className="text-xs text-ink-soft">
                      {mediaTypeCounts.get(mediaType)}
                    </span>
                  </label>
                </li>
              ))}
            </ul>
          </fieldset>
        </div>

        {/* Help card */}
        <div className="mt-4 rounded-lg bg-forest-900 p-5 text-on-dark shadow-sm">
          <h3 className="font-serif text-base font-semibold text-on-dark">
            Can&rsquo;t find what you need?
          </h3>
          <p className="mt-1.5 text-xs leading-relaxed text-on-dark/75">
            Members can ask the network — branch experts and action groups are
            happy to point you to the right resource.
          </p>
          <a
            href="#"
            className="mt-3 inline-flex items-center gap-1.5 font-sans text-xs font-semibold text-accent-500 transition-colors hover:text-on-dark"
          >
            Ask a question
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </a>
        </div>
      </aside>

      {/* Results column */}
      <div className="min-w-0">
        {/* Search bar */}
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <svg
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-soft"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <input
              type="search"
              value={query}
              onChange={(e) => updateQuery(e.target.value)}
              placeholder="Search guides, research, species, topics…"
              className="w-full rounded-md border border-border bg-surface py-2.5 pl-11 pr-4 text-meta text-ink shadow-sm placeholder:text-ink-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-600"
            />
          </div>
          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 rounded-md bg-forest-700 px-6 py-2.5 font-sans text-meta font-semibold text-on-dark shadow-sm transition duration-200 ease-smooth hover:bg-forest-600 hover:shadow-md"
          >
            Search
          </button>
        </div>

        {/* Popular searches */}
        <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1.5">
          <span className="text-xs text-ink-soft">Popular:</span>
          {popularSearches.map((term) => (
            <button
              key={term}
              type="button"
              onClick={() => updateQuery(term)}
              className="rounded-full border border-border bg-surface px-3 py-0.5 font-sans text-xs text-ink-soft transition-colors hover:border-forest-600 hover:text-forest-700"
            >
              {term}
            </button>
          ))}
        </div>

        {/* Active filter chips */}
        {hasFilters && (
          <div className="mt-4 flex flex-wrap items-center gap-2">
            {selectedTypes.map((type) => (
              <FilterChip key={type} label={type} onRemove={() => toggleType(type)} />
            ))}
            {selectedTopics.map((topic) => (
              <FilterChip key={topic} label={topic} onRemove={() => toggleTopic(topic)} />
            ))}
            {selectedMediaTypes.map((mediaType) => (
              <FilterChip
                key={mediaType}
                label={mediaType}
                onRemove={() => toggleMediaType(mediaType)}
              />
            ))}
            <button
              type="button"
              onClick={resetAll}
              className="font-sans text-xs font-semibold text-ink-soft underline-offset-2 hover:text-forest-700 hover:underline"
            >
              Clear all
            </button>
          </div>
        )}

        {/* Result meta + controls */}
        <div className="mt-5 flex flex-col gap-4 border-b border-border pb-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-meta text-ink-soft">
            <span className="font-semibold text-ink">{filtered.length}</span>{" "}
            {filtered.length === 1 ? "resource" : "resources"}
            {query.trim() ? (
              <>
                {" "}
                for{" "}
                <span className="font-semibold text-ink">
                  &ldquo;{query}&rdquo;
                </span>
              </>
            ) : (
              !hasFilters && <> in the library</>
            )}
          </p>

          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 text-meta text-ink-soft">
              Sort by
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="rounded-md border border-border bg-surface px-3 py-1.5 text-meta text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-600"
              >
                <option>Most relevant</option>
                <option>Most recent</option>
                <option>A–Z</option>
              </select>
            </label>

            {/* List / Grid toggle */}
            <div className="flex rounded-full border border-border bg-surface p-0.5">
              {(["list", "grid"] as const).map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => setView(v)}
                  aria-pressed={view === v}
                  aria-label={`${v} view`}
                  className={`flex h-8 w-8 items-center justify-center transition-colors ${
                    v === "list" ? "rounded-l-full" : "rounded-r-full"
                  } ${
                    view === v
                      ? "bg-forest-700 text-on-dark"
                      : "text-ink-soft hover:bg-sage-200/60"
                  }`}
                >
                  {v === "list" ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" />
                    </svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <rect x="3" y="3" width="7" height="7" rx="1" />
                      <rect x="14" y="3" width="7" height="7" rx="1" />
                      <rect x="3" y="14" width="7" height="7" rx="1" />
                      <rect x="14" y="14" width="7" height="7" rx="1" />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results */}
        {filtered.length === 0 ? (
          <div className="mt-14 flex flex-col items-center text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-sage-200 text-forest-700">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="11" cy="11" r="7" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </div>
            <h3 className="mt-4 font-serif text-lg font-semibold">
              No resources found
            </h3>
            <p className="mt-1.5 max-w-sm text-meta text-ink-soft">
              Try a different keyword or clear your filters to see the full
              library.
            </p>
            {hasFilters && (
              <button
                type="button"
                onClick={resetAll}
                className="mt-4 font-sans text-meta font-semibold text-forest-600 hover:text-forest-700"
              >
                Clear all filters
              </button>
            )}
          </div>
        ) : view === "list" ? (
          <ul className="mt-5 divide-y divide-border">
            {visible.map((resource) => (
              <li key={resource.title}>
                <a
                  href="#"
                  className="group flex flex-col items-start gap-5 py-6 transition-colors first:pt-0 sm:flex-row sm:items-center"
                >
                  <div className="min-w-0 flex-1 order-2 sm:order-1">
                    <span className="inline-flex rounded-full bg-sage-200 px-2.5 py-0.5 font-sans text-[0.7rem] font-semibold uppercase tracking-wide text-forest-700">
                      {resource.type}
                    </span>
                    <h3 className="mt-2.5 font-serif text-lg font-semibold leading-snug transition-colors group-hover:text-forest-700">
                      {resource.title}
                    </h3>
                    <p className="mt-1.5 line-clamp-2 text-meta text-ink-soft">
                      {resource.description}
                    </p>
                    <p className="mt-3 text-xs text-ink-soft">
                      {resource.source} &middot; {resource.year} &middot;{" "}
                      {resource.format} &middot; {resource.length}
                    </p>
                  </div>
                  <div className="relative h-40 w-full shrink-0 overflow-hidden rounded-md order-1 sm:order-2 sm:h-24 sm:w-40">
                    <Image
                      src={`https://images.unsplash.com/${resource.image}?w=400&h=240&fit=crop&q=80`}
                      alt=""
                      fill
                      sizes="(min-width: 640px) 160px, 100vw"
                      className="object-cover transition-transform duration-300 ease-smooth group-hover:scale-105"
                    />
                  </div>
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <ul className="mt-5 grid gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {visible.map((resource) => (
              <li key={resource.title}>
                <a href="#" className="group flex h-full flex-col">
                  <div className="relative h-36 w-full overflow-hidden rounded-md">
                    <Image
                      src={`https://images.unsplash.com/${resource.image}?w=500&h=300&fit=crop&q=80`}
                      alt=""
                      fill
                      sizes="(min-width: 1536px) 25vw, (min-width: 1280px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-300 ease-smooth group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 flex-col pt-3">
                    <span className="inline-flex w-fit rounded-full bg-sage-200 px-2.5 py-0.5 font-sans text-[0.7rem] font-semibold uppercase tracking-wide text-forest-700">
                      {resource.type}
                    </span>
                    <h3 className="mt-2 font-serif text-lg font-semibold leading-snug transition-colors group-hover:text-forest-700">
                      {resource.title}
                    </h3>
                    <p className="mt-1.5 line-clamp-3 flex-1 text-meta text-ink-soft">
                      {resource.description}
                    </p>
                    <p className="mt-3 text-xs text-ink-soft">
                      {resource.source} &middot; {resource.year} &middot;{" "}
                      {resource.format} &middot; {resource.length}
                    </p>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        )}

        {/* Load more */}
        {filtered.length > visibleCount && (
          <div className="mt-8 flex flex-col items-center gap-2">
            <p className="text-xs text-ink-soft">
              Showing {visible.length} of {filtered.length} resources
            </p>
            <button
              type="button"
              onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
              className="inline-flex items-center gap-2 rounded-md border border-forest-700 px-6 py-2.5 font-sans text-meta font-semibold text-forest-700 transition duration-200 ease-smooth hover:bg-forest-700 hover:text-on-dark"
            >
              Load more
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 5v14M6 13l6 6 6-6" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
