import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { faqs, locations, type Location } from "@/data/site";
import { OrderButton } from "./order";
import { OpenBadge, TodayHours, TodayHoursText } from "./today-hours";

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
    // Outer wrapper clips the tilted band so it can't cause sideways scrolling.
    <div className="overflow-hidden py-3">
      <div className="-mx-4 -rotate-2 bg-gradient-brand py-4 text-ink">
        <Marquee items={Array(8).fill("Order Now")} className="display text-4xl sm:text-5xl" />
      </div>
    </div>
  );
}

function PinIcon() {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className="mt-0.5 size-4 shrink-0 text-gold" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className="size-4 shrink-0 text-gold" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" strokeLinecap="round" />
    </svg>
  );
}

export function LocationCard({ loc }: { loc: Location }) {
  const [name, state] = loc.city.split(",").map((x) => x.trim());
  const directions = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(loc.mapsQuery)}`;

  if (loc.comingSoon) {
    return (
      <article className="group relative isolate flex flex-col overflow-hidden rounded-2xl border border-dashed border-gold/40 p-6">
      {/* food photo + dark overlay so text stays readable; photo zooms gently on hover */}
      <Image
        src={loc.image}
        alt=""
        fill
        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
        className="-z-20 object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
      />
      <span aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-black/55 via-black/75 to-black/95" />
        <h3 className="display text-3xl leading-none">
          {name}
          {state && <span className="ml-2 align-middle text-sm font-sans font-semibold tracking-wide text-white/50">{state}</span>}
        </h3>
        <div className="mt-4 min-h-7">
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-black/65 px-3 py-1 text-xs font-semibold text-gold backdrop-blur-sm">
            <span className="size-2 rounded-full bg-gold" />
            Coming soon
          </span>
        </div>
        <p className="mt-5 flex-1 text-sm leading-relaxed text-white/75">
          We&apos;re bringing the island vibes to {name}. Follow us on social for opening news.
        </p>
        <Link
          href={`/locations/${loc.slug}`}
          className="mt-6 inline-flex items-center gap-2 self-start text-sm font-semibold text-gold transition-colors hover:text-white"
        >
          Learn more <span aria-hidden>→</span>
        </Link>
      </article>
    );
  }

  return (
    <article className="group relative isolate flex flex-col overflow-hidden rounded-2xl border border-white/10 p-6 transition duration-300 hover:-translate-y-1 hover:border-leaf/50 hover:shadow-[0_18px_40px_-20px_rgba(52,168,83,0.55)]">
      {/* food photo + dark overlay so text stays readable; photo zooms gently on hover */}
      <Image
        src={loc.image}
        alt=""
        fill
        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
        className="-z-20 object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
      />
      <span aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-black/55 via-black/75 to-black/95" />
      {/* thin gold → green accent line that brightens on hover */}
      <span aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-gold via-lime to-leaf opacity-40 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="flex items-start justify-between gap-3">
        <h3 className="display text-3xl leading-none">
          <Link href={`/locations/${loc.slug}`} className="hover:text-gold">
            {name}
          </Link>
          {state && <span className="ml-2 align-middle text-sm font-sans font-semibold tracking-wide text-white/50">{state}</span>}
        </h3>
        {loc.hq && <span className="shrink-0 rounded-full border border-leaf/50 bg-black/65 px-2.5 py-1 text-[11px] font-bold tracking-wider text-leaf backdrop-blur-sm">HQ</span>}
      </div>

      <div className="mt-4 min-h-7">
        <OpenBadge slug={loc.slug} />
      </div>

      <ul className="mt-5 flex-1 space-y-3 text-sm text-white/85">
        <li className="flex gap-2.5">
          <PinIcon />
          <span>{loc.address}</span>
        </li>
        <li className="flex items-center gap-2.5">
          <ClockIcon />
          <span>
            <TodayHoursText slug={loc.slug} />
          </span>
        </li>
      </ul>

      <div className="mt-6 grid grid-cols-2 gap-2 border-t border-white/10 pt-5">
        <a
          href={directions}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center rounded-lg border border-white/20 bg-black/50 px-3 py-2 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:border-gold hover:text-gold"
        >
          Directions
        </a>
        <OrderButton className="rounded-lg px-3 py-2 text-sm font-semibold shadow-none">Order</OrderButton>
        <Link
          href={`/locations/${loc.slug}`}
          className="col-span-2 inline-flex items-center justify-center gap-2 pt-1 text-sm font-medium text-white/60 transition-colors hover:text-gold"
        >
          Hours &amp; details <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
        </Link>
      </div>
    </article>
  );
}

/** Home-page location tiles: square, edge-to-edge photos with the city, today's hours and Order Now centred. */
export function LocationTiles() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4">
      {locations.map((loc) => {
        const [name, state] = loc.city.split(",").map((x) => x.trim());
        return (
          <article key={loc.slug} className="group relative isolate aspect-square overflow-hidden">
            <Image
              src={loc.image}
              alt=""
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
              className="-z-20 object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
            />
            <span aria-hidden className="absolute inset-0 -z-10 bg-black/60 transition-colors duration-500 group-hover:bg-black/45" />

            <div className="flex h-full flex-col items-center justify-center gap-5 p-6 text-center">
              {loc.comingSoon ? (
                <>
                  <h3 className="display whitespace-nowrap text-4xl drop-shadow-lg lg:text-[2.6rem] 2xl:text-5xl">Coming Soon</h3>
                  <Link href={`/locations/${loc.slug}`} className="text-xl font-medium text-gold transition-colors hover:text-white 2xl:text-2xl">
                    {name} {state}
                  </Link>
                </>
              ) : (
                <>
                  <h3 className="display whitespace-nowrap text-4xl drop-shadow-lg lg:text-[2.6rem] 2xl:text-5xl">
                    <Link href={`/locations/${loc.slug}`} className="transition-colors hover:text-gold">
                      {loc.city}
                    </Link>
                  </h3>
                  <TodayHours slug={loc.slug} className="whitespace-nowrap text-lg font-medium text-gold drop-shadow lg:text-[17px] xl:text-xl 2xl:text-2xl" />
                  <OrderButton className="rounded-[4px] px-6 py-3 font-semibold shadow-none">Order Now</OrderButton>
                </>
              )}
            </div>
          </article>
        );
      })}
    </div>
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
      {/* two columns like the live site: 1–5 left, 6–10 right */}
      <div className="grid gap-x-10 lg:grid-cols-2">
        {[faqs.slice(0, Math.ceil(faqs.length / 2)), faqs.slice(Math.ceil(faqs.length / 2))].map((col, c) => (
          <div key={c}>
            {col.map((f, i) => (
              <details key={f.q} className="group border-b border-white/15">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 [&::-webkit-details-marker]:hidden">
                  <span className="display text-xl leading-tight transition-colors group-hover:text-gold group-open:text-gold sm:text-2xl">
                    {c * Math.ceil(faqs.length / 2) + i + 1}. {f.q}
                  </span>
                  <span
                    aria-hidden
                    className="grid size-8 shrink-0 place-items-center rounded-full bg-gradient-to-br from-gold/20 to-leaf/25 text-lg font-bold text-[#c6f135] transition-transform duration-300 group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="pb-5 pr-12 leading-relaxed text-white/80">{f.a}</p>
              </details>
            ))}
          </div>
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
