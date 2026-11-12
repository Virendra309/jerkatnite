"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Slide = { src: string; alt: string };

function Arrow({ dir, onClick }: { dir: "prev" | "next"; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={dir === "prev" ? "Previous photo" : "Next photo"}
      className={`absolute top-1/2 z-10 grid size-11 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-black/55 text-white backdrop-blur-sm transition duration-300 hover:border-gold hover:bg-gold hover:text-black sm:opacity-0 sm:group-hover:opacity-100 ${
        dir === "prev" ? "left-3" : "right-3"
      }`}
    >
      <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d={dir === "prev" ? "M15 18l-6-6 6-6" : "M9 6l6 6-6 6"} />
      </svg>
    </button>
  );
}

/**
 * Horizontal image slider: slides sideways, loops seamlessly (a copy of the first slide sits at the end),
 * autoplays every 4s, pauses on hover, has arrows, dots and touch swipe.
 */
export function CateringSlider({ slides }: { slides: Slide[] }) {
  const count = slides.length;
  const [pos, setPos] = useState(0); // 0..count (count = the cloned first slide)
  const [animate, setAnimate] = useState(true);
  const [paused, setPaused] = useState(false);
  const touchX = useRef<number | null>(null);

  const go = (n: number) => {
    setAnimate(true);
    setPos(((n % (count + 1)) + (count + 1)) % (count + 1));
  };
  const next = () => go(pos + 1);
  const prev = () => {
    if (pos === 0) {
      // jump (without animation) to the clone at the end, then slide back one
      setAnimate(false);
      setPos(count);
      requestAnimationFrame(() => requestAnimationFrame(() => go(count - 1)));
    } else go(pos - 1);
  };

  // autoplay
  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => {
      setAnimate(true);
      setPos((p) => Math.min(p + 1, count));
    }, 4000);
    return () => window.clearInterval(id);
  }, [paused, count]);

  // after sliding onto the clone, snap back to the real first slide without animation
  const onTransitionEnd = () => {
    if (pos === count) {
      setAnimate(false);
      setPos(0);
    }
  };

  const active = pos % count;

  return (
    <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} role="region" aria-roledescription="carousel" aria-label="Catering photos">
      <div
        className="group relative aspect-[16/10] overflow-hidden rounded-xl"
        onTouchStart={(e) => {
          touchX.current = e.touches[0].clientX;
          setPaused(true);
        }}
        onTouchEnd={(e) => {
          if (touchX.current !== null) {
            const dx = e.changedTouches[0].clientX - touchX.current;
            if (Math.abs(dx) > 40) (dx < 0 ? next : prev)();
          }
          touchX.current = null;
          setPaused(false);
        }}
      >
        <div
          className={`flex h-full ${animate ? "transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]" : ""}`}
          style={{ transform: `translateX(-${pos * 100}%)` }}
          onTransitionEnd={onTransitionEnd}
        >
          {[...slides, slides[0]].map((s, n) => (
            <div key={n} className="relative h-full w-full shrink-0" aria-hidden={n % count !== active || n === count}>
              <Image src={s.src} alt={n === count ? "" : s.alt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
            </div>
          ))}
        </div>

        <Arrow dir="prev" onClick={prev} />
        <Arrow dir="next" onClick={next} />
      </div>

      <div className="mt-4 flex justify-center gap-2" role="tablist" aria-label="Choose photo">
        {slides.map((s, n) => (
          <button
            key={s.src}
            type="button"
            role="tab"
            aria-selected={n === active}
            aria-label={`Show photo ${n + 1}`}
            onClick={() => go(n)}
            className={`h-2 rounded-full transition-all duration-300 ${n === active ? "w-7 bg-white" : "w-2 bg-white/35 hover:bg-white/60"}`}
          />
        ))}
      </div>
    </div>
  );
}
