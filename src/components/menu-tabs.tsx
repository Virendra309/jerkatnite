"use client";

import Image from "next/image";
import { useState } from "react";
import type { MenuItem, MenuTab } from "@/data/menu";

function MenuCard({ item }: { item: MenuItem }) {
  const [expanded, setExpanded] = useState(false);
  // Only offer "View More" when the text is long enough to be clamped.
  const long = item.description.length > 90;

  return (
    <article className="flex flex-col rounded-xl border border-white/10 bg-gradient-to-b from-[#0c2410] to-[#24562b] p-2 transition hover:-translate-y-1 hover:border-leaf/50">
      <div className="relative aspect-[16/10] overflow-hidden rounded-lg">
        <Image src={item.image} alt={item.name} fill sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" className="object-cover" />
      </div>
      <div className="flex flex-1 flex-col px-2 pb-3 pt-4">
        <h3 className="display text-2xl leading-tight">{item.name}</h3>
        <p className={`mt-2 text-sm leading-relaxed text-white/85 ${expanded ? "" : "line-clamp-3"}`}>{item.description}</p>
        {long && (
          <button
            type="button"
            aria-expanded={expanded}
            onClick={() => setExpanded((v) => !v)}
            className="mt-auto flex items-center justify-between pt-4 text-left text-sm font-medium text-white hover:text-gold"
          >
            {expanded ? "View Less" : "View More"}
            <svg viewBox="0 0 448 512" aria-hidden className={`size-3 fill-gold transition-transform ${expanded ? "rotate-180" : ""}`}>
              <path d="M207 381.5 12.7 187.1c-9.4-9.4-9.4-24.6 0-33.9l22.7-22.7c9.4-9.4 24.5-9.4 33.9 0L224 284.5l154.7-154c9.4-9.3 24.5-9.3 33.9 0l22.7 22.7c9.4 9.4 9.4 24.6 0 33.9L241 381.5c-9.4 9.4-24.6 9.4-34 0z" />
            </svg>
          </button>
        )}
      </div>
    </article>
  );
}

export function MenuTabs({ tabs }: { tabs: MenuTab[] }) {
  const [active, setActive] = useState(0);

  return (
    <div>
      <div role="tablist" aria-label="Menu categories" className="inline-flex max-w-full gap-1 overflow-x-auto rounded-full bg-[#1d5a26] p-1.5">
        {tabs.map((t, i) => (
          <button
            key={t.title}
            id={`tab-${i}`}
            role="tab"
            type="button"
            aria-selected={active === i}
            aria-controls={`panel-${i}`}
            onClick={() => setActive(i)}
            className={`shrink-0 rounded-full px-5 py-2 font-medium transition-colors sm:px-6 ${
              active === i ? "bg-[#ffe500] text-black" : "text-white hover:bg-white/10"
            }`}
          >
            {t.title}
          </button>
        ))}
      </div>

      {tabs.map((t, i) => (
        <div
          key={t.title}
          id={`panel-${i}`}
          role="tabpanel"
          aria-labelledby={`tab-${i}`}
          hidden={active !== i}
          className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {t.items.map((item) => (
            <MenuCard key={item.name} item={item} />
          ))}
        </div>
      ))}
    </div>
  );
}
