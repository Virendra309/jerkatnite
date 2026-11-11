"use client";

import { useEffect, useState } from "react";

/** Round gold-to-green "back to top" button, shown after scrolling down (as on the live site). */
export function ScrollTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 500);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`fixed bottom-6 right-6 z-30 grid size-12 place-items-center rounded-full bg-gradient-to-r from-gold to-leaf text-ink shadow-lg shadow-black/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-leaf/30 ${
        show ? "opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <svg viewBox="0 0 448 512" aria-hidden className="size-5 fill-current">
        <path d="M241 130.5 435.3 324.9c9.4 9.4 9.4 24.6 0 33.9l-22.7 22.7c-9.4 9.4-24.5 9.4-33.9 0L224 227.5 69.3 381.5c-9.4 9.3-24.5 9.3-33.9 0l-22.7-22.7c-9.4-9.4-9.4-24.6 0-33.9L207 130.5c9.4-9.4 24.6-9.4 34 0z" />
      </svg>
    </button>
  );
}
