import Link from "next/link";
import type { ReactNode } from "react";
import { faqs, locations, type Location } from "@/data/site";
import { TodayHours } from "./today-hours";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto max-w-7xl px-4 sm:px-6 ${className}`}>{children}</div>;
}

/** Two-line display heading: plain first line, gradient second line. */
export function Heading({ top, accent, as: Tag = "h2", className = "" }: { top?: string; accent: string; as?: "h1" | "h2"; className?: string }) {
  return (
    <Tag className={`display text-5xl sm:text-6xl lg:text-7xl ${className}`}>
      {top && <span className="block">{top}</span>}
      <span className="text-gradient block">{accent}</span>
    </Tag>
  );
}

export function ButtonLink({ href, children, variant = "primary", external }: { href: string; children: ReactNode; variant?: "primary" | "ghost"; external?: boolean }) {
  const cls = variant === "primary" ? "btn-primary" : "btn-ghost";
  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>{children}</a>
  ) : (
    <Link href={href} className={cls}>{children}</Link>
  );
}

export function Marquee({ items, className = "" }: { items: string[]; className?: string }) {
  const row = [...items, ...items];
  return (
    <div className={`overflow-hidden ${className}`}>
      <div className="animate-marquee flex w-max gap-10 whitespace-nowrap">
        {row.map((t, i) => (
          <span key={i} aria-hidden={i >= items.length} className="flex items-center gap-10">
            {t}
            <span className="text-[0.5em]">●</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export function OrderTicker() {
  return (
    <div className="-rotate-2 bg-gradient-brand py-4 text-ink">
      <Marquee items={Array(8).fill("Order Now")} className="display text-4xl sm:text-5xl" />
    </div>
  );
}

export function LocationCard({ loc }: { loc: Location }) {
  return (
    <Link
      href={`/locations/${loc.slug}`}
      className="group flex flex-col justify-between rounded-2xl border border-white/10 bg-ink-2 p-6 transition hover:-translate-y-1 hover:border-leaf/60"
    >
      <div>
        <h3 className="display text-4xl">{loc.city}</h3>
        <p className="mt-2 text-white/70">{loc.address ?? "Opening soon"}</p>
      </div>
      <div className="mt-6 flex items-center justify-between gap-3">
        {loc.comingSoon ? (
          <span className="rounded-full bg-gold/15 px-3 py-1 text-sm font-semibold text-gold">Coming soon</span>
        ) : (
          <TodayHours slug={loc.slug} />
        )}
        <span aria-hidden className="text-2xl text-gold transition group-hover:translate-x-1">→</span>
      </div>
    </Link>
  );
}

export function LocationGrid() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {locations.map((l) => <LocationCard key={l.slug} loc={l} />)}
    </div>
  );
}

export function Faq() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
  return (
    <>
      <div className="grid gap-4 lg:grid-cols-2">
        {faqs.map((f, i) => (
          <details key={f.q} className="group rounded-xl border border-white/10 bg-ink-2 p-5 open:border-leaf/50">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold">
              <span>{i + 1}. {f.q}</span>
              <span aria-hidden className="grid size-9 shrink-0 place-items-center rounded-full bg-white/5 text-xl text-gold transition group-open:rotate-45">+</span>
            </summary>
            <p className="mt-3 text-white/70">{f.a}</p>
          </details>
        ))}
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}

export function PageHero({ eyebrow, top, accent, children }: { eyebrow?: string; top?: string; accent: string; children?: ReactNode }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-ink-3 via-ink to-ink pb-16 pt-36">
      <div aria-hidden className="absolute -right-32 -top-32 size-96 rounded-full bg-leaf/20 blur-3xl" />
      <div aria-hidden className="absolute -left-32 top-20 size-80 rounded-full bg-gold/10 blur-3xl" />
      <Container className="relative">
        {eyebrow && <p className="mb-4 font-semibold uppercase tracking-widest text-gold">{eyebrow}</p>}
        <Heading as="h1" top={top} accent={accent} />
        {children && <div className="mt-6 max-w-2xl text-lg text-white/75">{children}</div>}
      </Container>
    </section>
  );
}
