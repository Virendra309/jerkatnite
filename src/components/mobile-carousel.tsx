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

  // Index of the card we are on / heading to. Arrow taps and autoplay step from this number rather than
  // from the live scroll position, so fast repeated taps never land between two cards.
  const index = useRef(0);
  const programmatic = useRef(false);

  const cards = () => Array.from(ref.current?.children ?? []) as HTMLElement[];
  const leftFor = (el: HTMLDivElement, k: HTMLElement) => k.offsetLeft - (el.clientWidth - k.offsetWidth) / 2;

  const scrollToIndex = (i: number) => {
    const el = ref.current;
    const kids = cards();
    if (!el || !kids.length) return;
    index.current = ((i % kids.length) + kids.length) % kids.length;
    programmatic.current = true;
    el.scrollTo({ left: leftFor(el, kids[index.current]), behavior: "smooth" });
  };

  // After the visitor swipes (not after our own scrolls), read which card is now centred.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let t: number | undefined;
    const settle = () => {
      if (programmatic.current) {
        programmatic.current = false;
        return;
      }
      const center = el.scrollLeft + el.clientWidth / 2;
      const i = cards().findIndex((k) => k.offsetLeft <= center && center < k.offsetLeft + k.offsetWidth);
      if (i >= 0) index.current = i;
    };
    const onScroll = () => {
      window.clearTimeout(t);
      t = window.setTimeout(settle, 140);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      el.removeEventListener("scroll", onScroll);
      window.clearTimeout(t);
    };
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(min-width: 768px)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      if (paused.current) return;
      const r = el.getBoundingClientRect();
      if (r.bottom < 0 || r.top > window.innerHeight) return; // only while on screen
      scrollToIndex(index.current + 1);
    }, interval);
    return () => window.clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    pause();
    scrollToIndex(index.current + dir);
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
