import { useMemo, useState } from "react";
import { jsonLdStringify } from "@/lib/json-ld";
import { createFileRoute, Link } from "@tanstack/react-router";
import { AnimatePresence } from "framer-motion";
import { ArrowUpRight, Check } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { Reveal } from "@/components/Reveal";
import { Container } from "@/components/Container";
import { GlowBlob } from "@/components/GlowBlob";
import { HeroWebVisual } from "@/components/HeroWebVisual";
import { CaseStudyCard } from "@/components/CaseStudyCard";
import { AnimatedStat } from "@/components/AnimatedStat";
import { CASE_STUDIES, SERVICE_FILTERS } from "@/lib/portfolio-data";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: "Our Work - Ethixweb" },
      {
        name: "description",
        content:
          "Real case studies from Ethixweb: websites, SEO and paid media that generated thousands of qualified leads.",
      },
      { property: "og:title", content: "Our Work - Ethixweb Case Studies" },
      { property: "og:description", content: "Selected client work and measurable results." },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "https://ethixweb.com/ethixweb.png" },
      { property: "og:url", content: "https://ethixweb.com/portfolio" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Our Work - Ethixweb Case Studies" },
      {
        name: "twitter:description",
        content:
          "Real case studies from Ethixweb: websites, SEO and paid media that generated thousands of qualified leads.",
      },
      { name: "twitter:image", content: "https://ethixweb.com/ethixweb.png" },
      { name: "robots", content: "index, follow" },
    ],
    links: [{ rel: "canonical", href: "https://ethixweb.com/portfolio" }],
    scripts: [
      {
        type: "application/ld+json",
        children: jsonLdStringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Ethixweb Portfolio",
          url: "https://ethixweb.com/portfolio",
          description:
            "Real case studies from Ethixweb: websites, SEO and paid media that generated thousands of qualified leads.",
          itemListElement: CASE_STUDIES.map((s, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: s.client,
            description: s.impact,
          })),
        }),
      },
    ],
  }),
  component: Portfolio,
});

const TRUST_STATS = [
  { value: "6", label: "Featured case studies" },
  { value: "2-4 wks", label: "Typical time to launch" },
  { value: "100%", label: "Senior-led delivery" },
  { value: "5.0", label: "Avg. client rating" },
];

function Portfolio() {
  const [filter, setFilter] = useState<string>("All");

  const visible = useMemo(
    () =>
      filter === "All" ? CASE_STUDIES : CASE_STUDIES.filter((s) => s.services.includes(filter)),
    [filter],
  );

  return (
    <SiteLayout>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative -mt-24 overflow-hidden bg-gradient-hero pb-16 pt-36 sm:pb-24 sm:pt-44">
        <div className="absolute inset-0 grid-bg opacity-50" />
        <GlowBlob
          size="lg"
          color="primary"
          blur={100}
          className="left-1/2 top-0 -translate-x-1/2"
        />
        <div className="pointer-events-none absolute inset-x-0 top-24 mx-auto w-full max-w-5xl scale-110 opacity-15">
          <HeroWebVisual showBadges={false} />
        </div>

        <Container className="relative text-center">
          <Reveal>
            <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_18px_rgba(138,24,28,0.9)]" />
              Our work
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mx-auto mt-7 max-w-4xl pb-1 text-[clamp(2.4rem,5.4vw,4.6rem)] font-extrabold leading-[1.05] text-gradient">
              We don&apos;t just build websites.
              <br />
              We{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: "linear-gradient(135deg, #D13A40 0%, #B32228 50%, #8A181C 100%)",
                }}
              >
                solve business problems.
              </span>
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Every project on this page started the same way: understanding real users, finding the
              friction that was costing the business money, and shipping a measurable fix - not just
              a redesign.
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/contact"
                className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 font-bold text-primary-foreground shadow-glow transition hover:bg-primary/90"
              >
                Start a project
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
              </Link>
              <a
                href="#case-studies"
                className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/4.5 px-7 py-3.5 font-bold text-foreground backdrop-blur-xl transition-colors hover:border-white/20 hover:bg-white/8"
              >
                See the case studies
                <ArrowUpRight className="h-4 w-4 rotate-90 transition-transform group-hover:rotate-[135deg]" />
              </a>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ── Trust strip ──────────────────────────────────────────────────── */}
      <section className="border-b border-border py-10">
        <Container className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          {TRUST_STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.06} className="text-center">
              <AnimatedStat
                value={s.value}
                className="block font-display text-3xl font-extrabold text-gradient-brand sm:text-4xl"
              />
              <p className="mt-1.5 text-xs uppercase tracking-widest text-muted-foreground">
                {s.label}
              </p>
            </Reveal>
          ))}
        </Container>
      </section>

      {/* ── Case studies ─────────────────────────────────────────────────── */}
      <section id="case-studies" className="scroll-mt-24 py-20">
        <Container>
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <p className="mb-4 text-sm uppercase tracking-widest text-primary">Case studies</p>
              <h2 className="pb-1 font-display text-4xl font-bold text-gradient sm:text-5xl">
                A clear before and after, every time.
              </h2>
            </div>
          </Reveal>

          {/* Filter bar */}
          <Reveal delay={0.08}>
            <div
              className="mt-10 flex flex-wrap items-center justify-center gap-2"
              role="group"
              aria-label="Filter case studies by service"
            >
              {["All", ...SERVICE_FILTERS].map((f) => {
                const active = filter === f;
                return (
                  <button
                    key={f}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setFilter(f)}
                    className={`relative inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 ${
                      active
                        ? "border-primary bg-primary text-primary-foreground shadow-glow"
                        : "border-border bg-foreground/[0.03] text-muted-foreground hover:border-primary/30 hover:text-foreground"
                    }`}
                  >
                    {active && <Check className="h-3.5 w-3.5" />}
                    {f}
                  </button>
                );
              })}
            </div>
          </Reveal>

          {/* Grid */}
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <AnimatePresence mode="popLayout">
              {visible.map((study, i) => (
                <CaseStudyCard key={study.slug} study={study} index={i} />
              ))}
            </AnimatePresence>
          </div>

          {visible.length === 0 && (
            <p className="mt-12 text-center text-muted-foreground">
              No case studies match that filter yet.
            </p>
          )}
        </Container>
      </section>

      {/* ── Final CTA ─────────────────────────────────────────────────────── */}
      <section className="py-20">
        <Reveal>
          <Container className="relative overflow-hidden rounded-[2rem] glass-strong p-12 text-center">
            <div className="pointer-events-none absolute inset-0 grid-bg opacity-20" />
            <GlowBlob
              size="md"
              color="primary"
              blur={110}
              className="left-1/2 top-0 -translate-x-1/2 -translate-y-1/2"
            />
            <div className="relative">
              <h2 className="pb-1 font-display text-4xl font-bold text-gradient sm:text-5xl">
                Let&apos;s create your next success story.
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-muted-foreground">
                Tell us where the friction is. We&apos;ll tell you how we&apos;d fix it - no pitch
                deck required.
              </p>
              <Link
                to="/contact"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-brand px-7 py-3.5 font-medium shadow-glow transition hover:scale-[1.03]"
              >
                Start a project <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </Container>
        </Reveal>
      </section>
    </SiteLayout>
  );
}
