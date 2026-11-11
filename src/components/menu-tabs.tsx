"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import type { MenuItem, MenuTab } from "@/data/menu";
import { OrderButton } from "./order";

function Chevron({ open }: { open: boolean }) {
  return (
    <svg viewBox="0 0 448 512" aria-hidden className={`size-3 fill-gold transition-transform duration-300 ${open ? "rotate-180" : ""}`}>
      <path d="M207 381.5 12.7 187.1c-9.4-9.4-9.4-24.6 0-33.9l22.7-22.7c9.4-9.4 24.5-9.4 33.9 0L224 284.5l154.7-154c9.4-9.3 24.5-9.3 33.9 0l22.7 22.7c9.4 9.4 9.4 24.6 0 33.9L241 381.5c-9.4 9.4-24.6 9.4-34 0z" />
    </svg>
  );
}

function MenuCard({ item, index, category }: { item: MenuItem; index: number; category?: string }) {
  const [expanded, setExpanded] = useState(false);
  const long = item.description.length > 90;

  return (
    <article
      style={{ animationDelay: `${Math.min(index, 8) * 60}ms` }}
      className="animate-fade-up group flex flex-col rounded-2xl border border-white/10 bg-gradient-to-b from-[#0c2410] to-[#24562b] p-2 shadow-lg shadow-black/30 transition duration-300 hover:-translate-y-1.5 hover:border-leaf/60 hover:shadow-leaf/10"
    >
      <div className="relative aspect-[16/10] overflow-hidden rounded-xl">
        <Image
          src={item.image}
          alt={item.name}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition duration-700 ease-out group-hover:scale-110"
        />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        <span className="absolute left-2 top-2 rounded-full bg-black/60 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-leaf backdrop-blur-sm">
          100% Halal
        </span>
        {category && (
          <span className="absolute right-2 top-2 rounded-full bg-gold px-2.5 py-1 text-[11px] font-semibold text-ink">{category}</span>
        )}
      </div>

      <div className="flex flex-1 flex-col px-2 pb-2 pt-4">
        <h3 className="display text-2xl leading-tight">{item.name}</h3>
        <p className={`mt-2 text-sm leading-relaxed text-white/85 ${expanded ? "" : "line-clamp-3"}`}>{item.description}</p>

        <div className="mt-auto flex items-center justify-between gap-3 pt-4">
          {long ? (
            <button
              type="button"
              aria-expanded={expanded}
              onClick={() => setExpanded((v) => !v)}
              className="flex items-center gap-2 text-sm font-medium text-white transition-colors hover:text-gold"
            >
              {expanded ? "View Less" : "View More"}
              <Chevron open={expanded} />
            </button>
          ) : (
            <span />
          )}
          <OrderButton className="rounded-[4px] px-3.5 py-1.5 text-sm font-semibold shadow-none">Order</OrderButton>
        </div>
      </div>
    </article>
  );
}

export function MenuTabs({ tabs }: { tabs: MenuTab[] }) {
  const [active, setActive] = useState(0);
  const [query, setQuery] = useState("");

  const q = query.trim().toLowerCase();
  const results = useMemo(
    () =>
      q
        ? tabs.flatMap((t) =>
            t.items.filter((i) => `${i.name} ${i.description}`.toLowerCase().includes(q)).map((item) => ({ item, category: t.title })),
          )
        : [],
    [q, tabs],
  );

  return (
    <div>
      {/* Control bar: tabs + search (static, does not stick or slide) */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* gradient border: gold → green */}
        <div className={`max-w-full rounded-full bg-gradient-to-r from-gold via-[#1d4a22] to-leaf p-px transition-opacity ${q ? "opacity-40" : ""}`}>
          <div
            role="tablist"
            aria-label="Menu categories"
            className="flex max-w-full overflow-x-auto rounded-full bg-gradient-to-r from-black via-[#0b2310] to-[#1d4f26] p-1.5"
          >
          {tabs.map((t, i) => (
            <button
              key={t.title}
              id={`tab-${i}`}
              role="tab"
              type="button"
              aria-selected={active === i}
              aria-controls="menu-panel"
              onClick={() => {
                setActive(i);
                setQuery("");
              }}
              className={`shrink-0 rounded-full px-6 py-3 text-base font-semibold transition-colors duration-200 sm:min-w-[180px] sm:px-8 sm:text-lg ${
                active === i ? "bg-[#FFD700] text-black" : "text-white hover:text-gold"
              }`}
            >
              {t.title}
            </button>
          ))}
          </div>
        </div>

        <label className="relative w-full sm:w-72">
          <span className="sr-only">Search the menu</span>
          <svg aria-hidden viewBox="0 0 24 24" className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-white/50" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" strokeLinecap="round" />
          </svg>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search dishes…"
            className="w-full rounded-full border border-white/15 bg-white/5 py-2.5 pl-11 pr-4 text-white placeholder:text-white/45 focus:border-leaf focus:outline-none"
          />
        </label>
      </div>

      <div id="menu-panel" role="tabpanel" aria-labelledby={q ? undefined : `tab-${active}`} aria-live="polite">
        {q ? (
          <>
            <p className="mt-6 text-white/70">
              {results.length} {results.length === 1 ? "dish" : "dishes"} matching <span className="text-gold">“{query.trim()}”</span>
            </p>
            {results.length > 0 ? (
              <div key={q} className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {results.map((r, i) => (
                  <MenuCard key={`${r.category}-${r.item.name}`} item={r.item} index={i} category={r.category} />
                ))}
              </div>
            ) : (
              <div className="mt-6 rounded-2xl border border-dashed border-white/15 p-10 text-center text-white/70">
                Nothing found. Try “jerk”, “curry” or “pasta”.
              </div>
            )}
          </>
        ) : (
          // key forces a re-mount so the cards animate in again on every tab change
          <div key={active} className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {tabs[active].items.map((item, i) => (
              <MenuCard key={item.name} item={item} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
