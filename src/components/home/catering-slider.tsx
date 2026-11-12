"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

/** Auto-advancing crossfade slideshow with dots (pauses on hover). */
export function CateringSlider({ slides }: { slides: { src: string; alt: string }[] }) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => setI((n) => (n + 1) % slides.length), 4000);
    return () => window.clearInterval(id);
  }, [paused, slides.length]);

  return (
    <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="relative aspect-[16/10] overflow-hidden rounded-xl">
        {slides.map((s, n) => (
          <Image
            key={s.src}
            src={s.src}
            alt={s.alt}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className={`object-cover transition-all duration-1000 ease-out ${n === i ? "scale-100 opacity-100" : "scale-105 opacity-0"}`}
            aria-hidden={n !== i}
          />
        ))}
      </div>
      <div className="mt-4 flex justify-center gap-2" role="tablist" aria-label="Catering photos">
        {slides.map((s, n) => (
          <button
            key={s.src}
            type="button"
            role="tab"
            aria-selected={n === i}
            aria-label={`Show photo ${n + 1}`}
            onClick={() => setI(n)}
            className={`h-2 rounded-full transition-all duration-300 ${n === i ? "w-6 bg-white" : "w-2 bg-white/35 hover:bg-white/60"}`}
          />
        ))}
      </div>
    </div>
  );
}
