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
}: {
  children: ReactNode;
  gridClass: string;
  label: string;
  interval?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const pausedUntil = useRef(0);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(min-width: 768px)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      if (Date.now() < pausedUntil.current) return;
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
    pausedUntil.current = Date.now() + 8000;
  };

  return (
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
  );
}
