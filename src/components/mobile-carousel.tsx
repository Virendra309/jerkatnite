"use client";

import { Children, useEffect, useRef, type ReactNode } from "react";

/**
 * Phones: a swipeable row (one card in the middle, the neighbours peeking in) that also moves on its own
 * every few seconds and loops back to the start. From `md` up it becomes the normal grid given in `gridClass`.
 */
export function MobileCarousel({
  children,
  gridClass,
  label,
  interval = 5000,
  arrows = false,
}: {
  children: ReactNode;
  gridClass: string;
  label: string;
  interval?: number;
  /** Round prev/next buttons under the row (phones only). */
  arrows?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const paused = useRef(false);
  const resume = useRef<number | undefined>(undefined);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(min-width: 768px)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      if (paused.current) return;
      const r = el.getBoundingClientRect();
      if (r.bottom < 0 || r.top > window.innerHeight) return; // only while on screen
      const kids = Array.from(el.children) as HTMLElement[];
      const center = el.scrollLeft + el.clientWidth / 2;
      const current = kids.findIndex((k) => k.offsetLeft <= center && center < k.offsetLeft + k.offsetWidth);
      const next = kids[(current + 1) % kids.length];
      el.scrollTo({ left: next.offsetLeft - (el.clientWidth - next.offsetWidth) / 2, behavior: "smooth" });
    }, interval);
    return () => window.clearInterval(id);
  }, [interval]);

  // a touch pauses autoplay for a while so it doesn't fight the visitor's swipe
  const pause = () => {
    paused.current = true;
    window.clearTimeout(resume.current);
    resume.current = window.setTimeout(() => {
      paused.current = false;
    }, 8000);
  };

  const go = (dir: 1 | -1) => {
    const el = ref.current;
    if (!el) return;
    pause();
    const kids = Array.from(el.children) as HTMLElement[];
    const center = el.scrollLeft + el.clientWidth / 2;
    const current = Math.max(0, kids.findIndex((k) => k.offsetLeft <= center && center < k.offsetLeft + k.offsetWidth));
    const next = kids[(current + dir + kids.length) % kids.length];
    el.scrollTo({ left: next.offsetLeft - (el.clientWidth - next.offsetWidth) / 2, behavior: "smooth" });
  };


  return (
    <>
      <div
        ref={ref}
        role="region"
        aria-roledescription="carousel"
        aria-label={label}
        onPointerDown={pause}
        onTouchStart={pause}
        className={`-mx-4 flex snap-x snap-mandatory gap-2.5 overflow-x-auto px-11 pb-4 pt-2 [scrollbar-width:none] max-md:scroll-px-11 [&::-webkit-scrollbar]:hidden md:mx-0 md:overflow-visible md:p-0 ${gridClass}`}
      >
        {Children.map(children, (child) => (
          <div className="w-full shrink-0 snap-center md:w-auto">{child}</div>
        ))}
      </div>
      {arrows && (
        <div className="mt-4 flex justify-center gap-3 md:hidden">
          {([-1, 1] as const).map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => go(d)}
              aria-label={d < 0 ? "Previous" : "Next"}
              className="grid size-11 place-items-center rounded-full bg-white/15 text-white transition hover:bg-white/25"
            >
              <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
                <path d={d < 0 ? "m15 5-7 7 7 7" : "m9 5 7 7-7 7"} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          ))}
        </div>
      )}
    </>
  );
}
