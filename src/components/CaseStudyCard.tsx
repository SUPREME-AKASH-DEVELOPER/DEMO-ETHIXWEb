import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  HeartPulse,
  Hammer,
  Sailboat,
  Fish,
  Scale,
  Leaf,
  type LucideIcon,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import { AnimatedStat } from "./AnimatedStat";
import { WebSpotlight } from "./WebSpotlight";
import { trackWebSpotlight } from "@/lib/web-spotlight";
import type { CaseStudy } from "@/lib/portfolio-data";

const INDUSTRY_ICONS: Record<string, LucideIcon> = {
  Healthcare: HeartPulse,
  "Home & Cabinetry": Hammer,
  "Marine & Boating": Sailboat,
  "Outdoor & Recreation": Fish,
  "Legal & Financial": Scale,
  "Wellness & DTC": Leaf,
};

/** Featured case study card: an always-visible outcome (headline, impact,
 * services, metrics) plus a hover-revealed challenge/approach story - the
 * mockup and the story occupy the same fixed-height box (cross-faded via
 * opacity) so nothing reflows the grid on hover. No real client screenshots
 * exist yet, so the "mockup" is an honest abstract/branded placeholder
 * (monogram + industry icon over the site's own web-pattern texture),
 * not a fabricated screenshot. */
export function CaseStudyCard({ study, index }: { study: CaseStudy; index: number }) {
  const reduceMotion = useReducedMotion();
  const Icon = INDUSTRY_ICONS[study.industry] ?? HeartPulse;
  const monogram = study.client.charAt(0);

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.2 } }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay: (index % 6) * 0.06, ease: [0.22, 1, 0.36, 1] }}
      whileHover={reduceMotion ? undefined : { y: -8, scale: 1.012 }}
      onMouseMove={trackWebSpotlight}
      className="premium-card group relative flex flex-col overflow-hidden rounded-3xl transition-shadow duration-300 hover:shadow-glow"
      style={{ transformOrigin: "center" }}
    >
      {/* ── Visual zone: mockup <-> story crossfade, fixed height ── */}
      <div className="relative h-64 shrink-0 overflow-hidden">
        {/* Abstract device mockup */}
        <div className="absolute inset-0 bg-gradient-hero transition-opacity duration-300 group-hover:opacity-0">
          <div className="grid-bg absolute inset-0 opacity-40" />
          {/* Browser chrome */}
          <div className="absolute inset-x-4 top-4 flex items-center gap-1.5 rounded-t-lg bg-black/30 px-3 py-2 backdrop-blur-sm">
            <span className="h-2 w-2 rounded-full bg-white/25" />
            <span className="h-2 w-2 rounded-full bg-white/25" />
            <span className="h-2 w-2 rounded-full bg-white/25" />
            <span className="ml-2 h-2 w-24 rounded-full bg-white/15" />
          </div>
          <div className="relative flex h-full items-center justify-center">
            <span className="font-display text-8xl font-extrabold text-gradient opacity-80">
              {monogram}
            </span>
            <span className="absolute bottom-8 right-8 flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/15 ring-1 ring-primary/30">
              <Icon className="h-5 w-5 text-primary" strokeWidth={1.8} />
            </span>
          </div>
        </div>

        {/* Story overlay - the "detail preview" */}
        <div className="absolute inset-0 flex flex-col justify-center bg-gradient-to-br from-[#1c0f11] to-[#0c0d10] p-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <p className="text-[11px] font-bold uppercase tracking-widest text-primary">
            The challenge
          </p>
          <p className="mt-1.5 line-clamp-3 text-sm leading-relaxed text-white/80">
            {study.challenge}
          </p>
          <p className="mt-3 text-[11px] font-bold uppercase tracking-widest text-primary">
            Our approach
          </p>
          <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-white/80">
            {study.approach}
          </p>
          <Link
            to="/contact"
            className="mt-4 inline-flex translate-y-1 items-center gap-1.5 text-sm font-semibold text-primary opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
          >
            Start a similar project
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
          </Link>
        </div>

        <WebSpotlight size="lg" />
      </div>

      {/* ── Text zone: always visible ── */}
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          <span>{study.industry}</span>
          <span>{study.year}</span>
        </div>
        <h3 className="mt-3 font-display text-xl font-bold leading-snug text-foreground">
          {study.headline}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{study.impact}</p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {study.services.map((s) => (
            <span
              key={s}
              className="rounded-full border border-border bg-foreground/[0.03] px-2.5 py-1 text-[11px] font-medium text-muted-foreground"
            >
              {s}
            </span>
          ))}
        </div>

        <div className="mt-5 grid grid-cols-3 gap-2 border-t border-border pt-4">
          {study.metrics.slice(0, 3).map((m) => (
            <div key={m.label}>
              <AnimatedStat
                value={m.value}
                className="block font-display text-lg font-extrabold text-gradient-brand sm:text-xl"
              />
              <p className="mt-0.5 text-[10.5px] leading-tight text-muted-foreground">{m.label}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.article>
  );
}
