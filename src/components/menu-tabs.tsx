"use client";

import Image from "next/image";
import { useId, useState } from "react";
import type { MenuItem, MenuTab } from "@/data/menu";
import { OrderButton } from "./order";

function Chevron({ open }: { open: boolean }) {
  return (
    <svg viewBox="0 0 448 512" aria-hidden className={`size-3 fill-gold transition-transform duration-300 ${open ? "rotate-180" : ""}`}>
      <path d="M207 381.5 12.7 187.1c-9.4-9.4-9.4-24.6 0-33.9l22.7-22.7c9.4-9.4 24.5-9.4 33.9 0L224 284.5l154.7-154c9.4-9.3 24.5-9.3 33.9 0l22.7 22.7c9.4 9.4 9.4 24.6 0 33.9L241 381.5c-9.4 9.4-24.6 9.4-34 0z" />
    </svg>
  );
}

function MenuCard({ item, index }: { item: MenuItem; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const [picked, setPicked] = useState<string[]>([]);
  const optsId = useId();
  const max = item.pick ?? 1;
  const hasOptions = !!item.options?.length;

  const toggle = (opt: string) =>
    setPicked((cur) => {
      if (cur.includes(opt)) return cur.filter((o) => o !== opt);
      if (max === 1) return [opt];
      return cur.length < max ? [...cur, opt] : [...cur.slice(1), opt];
    });

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
      </div>

      <div className="flex flex-1 flex-col px-2 pb-2 pt-4">
        <h3 className="display text-2xl leading-tight">{item.name}</h3>
        <p className="mt-2 text-sm leading-relaxed text-white/85">{item.description}</p>

        {hasOptions && (
          <>
            <button
              type="button"
              aria-expanded={expanded}
              aria-controls={optsId}
              onClick={() => setExpanded((v) => !v)}
              className="mt-4 flex items-center justify-between text-left font-medium text-white transition-colors hover:text-gold"
            >
              {expanded ? "View less" : "View More"}
              <Chevron open={expanded} />
            </button>

            {/* grid-rows 0fr → 1fr animates the height smoothly */}
            <div
              id={optsId}
              className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${expanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
            >
              <div className="overflow-hidden">
                <p className="pt-3 text-[11px] font-semibold uppercase tracking-wider text-white/55">
                  {item.optionsLabel ?? "Options"}
                  {max > 1 && <span className="text-gold"> · {picked.length}/{max}</span>}
                </p>
                <ul className="flex flex-wrap gap-2 pt-2" aria-label={item.optionsLabel ?? "Options"}>
                  {item.options!.map((opt) => {
                    const on = picked.includes(opt);
                    return (
                      <li key={opt}>
                        <button
                          type="button"
                          aria-pressed={on}
                          tabIndex={expanded ? 0 : -1}
                          onClick={() => toggle(opt)}
                          className={`rounded-full border px-3 py-1.5 text-sm transition-all duration-200 ${
                            on ? "border-gold bg-gold font-semibold text-ink" : "border-white/20 bg-black/20 text-white hover:border-gold/70"
                          }`}
                        >
                          {on && <span aria-hidden>✓ </span>}
                          {opt}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </>
        )}

        <div className="mt-auto flex items-center justify-between gap-3 pt-4">
          <span className="truncate text-xs text-white/60">{picked.length ? picked.join(" + ") : ""}</span>
          <OrderButton className="shrink-0 rounded-[4px] px-3.5 py-1.5 text-sm font-semibold shadow-none">Order</OrderButton>
        </div>
      </div>
    </article>
  );
}

export function MenuTabs({ tabs }: { tabs: MenuTab[] }) {
  const [active, setActive] = useState(0);


  return (
    <div>
      {/* Category tabs (static, does not stick or slide) */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* gradient border: gold → green */}
        <div className="max-w-full rounded-full bg-gradient-to-r from-gold via-[#1d4a22] to-leaf p-px">
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
              onClick={() => setActive(i)}
              className={`shrink-0 rounded-full px-6 py-3 text-base font-semibold transition-colors duration-200 sm:min-w-[180px] sm:px-8 sm:text-lg ${
                active === i ? "bg-[#FFD700] text-black" : "text-white hover:text-gold"
              }`}
            >
              {t.title}
            </button>
          ))}
          </div>
        </div>

      </div>

      <div id="menu-panel" role="tabpanel" aria-labelledby={`tab-${active}`}>
        {/* key forces a re-mount so the cards animate in again on every tab change */}
        <div key={active} className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {tabs[active].items.map((item, i) => (
            <MenuCard key={item.name} item={item} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
