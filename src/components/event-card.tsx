"use client";

import Image from "next/image";
import { useId, useState } from "react";

type Category = { title: string; text: string; items: string[]; img: string };

/** Private event type card. On phones the list hides behind "View More" (as on the live site); from md up it is always shown. */
export function EventCard({ c }: { c: Category }) {
  const [open, setOpen] = useState(false);
  const listId = useId();
  return (
    <article className="group flex flex-col rounded-xl border border-white/15 bg-gradient-to-b from-[#1e1e1e] to-black p-2 transition duration-300 hover:-translate-y-1 hover:border-leaf/60">
      <div className="relative aspect-[16/7.5] overflow-hidden rounded-lg">
        <Image src={c.img} alt={c.title} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
      </div>
      <div className="px-1 pb-4 pt-4">
        <h2 className="display text-2xl">{c.title}</h2>
        <p className="mt-2 text-white/90">{c.text}</p>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={listId}
          onClick={() => setOpen((v) => !v)}
          className="mt-4 flex w-full items-center justify-between text-sm font-medium text-white md:hidden"
        >
          {open ? "View less" : "View More"}
          <svg viewBox="0 0 448 512" aria-hidden className={`size-3 fill-gold transition-transform duration-300 ${open ? "rotate-180" : ""}`}>
            <path d="M207 381.5 12.7 187.1c-9.4-9.4-9.4-24.6 0-33.9l22.7-22.7c9.4-9.4 24.5-9.4 33.9 0L224 284.5l154.7-154c9.4-9.3 24.5-9.3 33.9 0l22.7 22.7c9.4 9.4 9.4 24.6 0 33.9L241 381.5c-9.4 9.4-24.6 9.4-34 0z" />
          </svg>
        </button>
        <div
          id={listId}
          className={`grid transition-[grid-template-rows,opacity] duration-300 md:grid-rows-[1fr] md:opacity-100 ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
        >
          <ul className="space-y-2.5 overflow-hidden pt-3 md:pt-4">
            {c.items.map((i) => (
              <li key={i} className="flex items-center gap-3 text-[15px] text-[#b7e04a]">
                <span aria-hidden className="size-2 shrink-0 rounded-full border-2 border-gold" />
                {i}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}
