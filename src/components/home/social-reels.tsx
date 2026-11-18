"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { socials } from "@/data/site";

const instagram = socials.find((s) => s.id === "instagram")!.href;

// Posts as shown on the live site (images cut from the reference recording).
const posts = [
  {
    img: "/images/locations/reel-jamaican-way.jpg",
    alt: "Guest tasting oxtail, the Jamaican way",
    caption: "Reggae on the speakers, jerk on the plate, good people all around. This is the full experience.",
  },
  {
    img: "/images/locations/reel-soft-opening.jpg",
    alt: "Jerk at Nite soft opening crowd",
    caption: "Across from the Hippodrome, just steps from the Inner Harbor. The perfect stop before or after a show.",
  },
  {
    img: "/images/locations/reel-baltimore.jpg",
    alt: "Jerk at Nite Baltimore, MD record wall",
    caption: "OpenTable Diner's Choice Award winner 2025. Come see why Baltimore keeps showing up.",
  },
  {
    img: "/images/locations/reel-baltimore-hq.jpg",
    alt: "Inside the Jerk at Nite Baltimore HQ",
    caption: "The Baltimore HQ is where it all comes together. Full dine-in, full menu, full vibe.",
  },
  {
    img: "/images/locations/reel-oxtail-off.jpg",
    alt: "Chef holding a tray at The Oxtail Off",
    caption: "Our chefs bring 12+ years of experience to every plate they serve. This is what real Jamaican cooking looks like up close.",
  },
];

function Avatar() {
  return (
    <span className="grid size-9 shrink-0 place-items-center rounded-full border-2 border-[#3a7d44] bg-white">
      <svg viewBox="0 0 120 120" className="size-7" aria-hidden>
        <circle cx="60" cy="60" r="54" fill="none" stroke="#2f9e44" strokeWidth="10" />
        <circle cx="60" cy="60" r="34" fill="none" stroke="#2f9e44" strokeWidth="8" />
        <path d="M66 26v42a14 14 0 0 1-28 0" fill="none" stroke="#e8392b" strokeWidth="11" strokeLinecap="round" />
      </svg>
    </span>
  );
}

const VISIBLE_MAX = 3; // cards on screen at the widest breakpoint (clones needed for a seamless loop)

/**
 * Auto-sliding row of post cards: moves one card every 3s and loops forever.
 * Grab it with the mouse (or swipe on touch) and the row follows the cursor; let go to snap to the nearest card.
 */
function ReelsSlider() {
  const count = posts.length;
  const [pos, setPos] = useState(0);
  const [animate, setAnimate] = useState(true);
  const [hover, setHover] = useState(false);
  const [drag, setDrag] = useState<number | null>(null); // px offset while dragging
  const start = useRef<{ x: number; y: number; id: number; horizontal: boolean | null } | null>(null);
  const moved = useRef(false);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (hover || drag !== null) return;
    const id = window.setInterval(() => {
      setAnimate(true);
      setPos((p) => Math.min(p + 1, count));
    }, 3000);
    return () => window.clearInterval(id);
  }, [hover, drag, count]);

  const cardWidth = () => (listRef.current?.firstElementChild as HTMLElement | null)?.offsetWidth ?? 1;

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    start.current = { x: e.clientX, y: e.clientY, id: e.pointerId, horizontal: e.pointerType === "mouse" ? true : null };
    moved.current = false;
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const st = start.current;
    if (!st || st.id !== e.pointerId) return;
    const dx = e.clientX - st.x;
    const dy = e.clientY - st.y;
    if (st.horizontal === null) {
      // on touch, decide once whether this is a sideways swipe or a page scroll
      if (Math.abs(dx) < 6 && Math.abs(dy) < 6) return;
      st.horizontal = Math.abs(dx) > Math.abs(dy);
      if (!st.horizontal) {
        start.current = null;
        return;
      }
    }
    if (!moved.current) {
      if (Math.abs(dx) < 4) return;
      moved.current = true;
      e.currentTarget.setPointerCapture(e.pointerId);
      setAnimate(false);
      // dragging back from the first card: swap to its identical twin at the end so there is a card to pull in
      if (dx > 0 && pos === 0) setPos(count);
      if (dx < 0 && pos === count) setPos(0);
    }
    setDrag(dx);
  };

  const onPointerUp = () => {
    const dx = drag ?? 0;
    start.current = null;
    setDrag(null);
    setAnimate(true);
    if (!moved.current) return;
    const n = Math.abs(dx) > 40 ? Math.max(1, Math.round(Math.abs(dx) / cardWidth())) : 0;
    setPos((p) => (dx < 0 ? Math.min(p + n, count) : Math.max(p - n, 0)));
  };

  const slides = [...posts, ...posts.slice(0, VISIBLE_MAX)];

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Jerk at Nite on Instagram"
      className={`mt-12 touch-pan-y select-none overflow-hidden text-left [--card:85%] sm:[--card:50%] lg:[--card:33.3333%] ${
        drag !== null ? "cursor-grabbing" : "cursor-grab"
      }`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      onClickCapture={(e) => {
        // a drag shouldn't open the Instagram link
        if (moved.current) {
          e.preventDefault();
          e.stopPropagation();
          moved.current = false;
        }
      }}
    >
      <ul
        ref={listRef}
        className={`flex ${animate ? "transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]" : ""}`}
        style={{ transform: `translateX(calc(var(--card) * -${pos} + ${drag ?? 0}px))` }}
        onTransitionEnd={(e) => {
          if (e.target !== e.currentTarget) return;
          if (pos === count) {
            setAnimate(false);
            setPos(0);
          }
        }}
      >
        {slides.map((p, n) => {
          const clone = n >= count;
          return (
            <li key={n} className="w-[var(--card)] shrink-0 px-2" aria-hidden={clone || undefined}>
              <a
                href={instagram}
                target="_blank"
                rel="noopener noreferrer"
                tabIndex={clone ? -1 : undefined}
                draggable={false}
                aria-label={`View on Instagram: ${p.caption}`}
                className="group block h-full overflow-hidden rounded-lg border border-white/10 bg-[#262626] transition-colors duration-300 hover:border-leaf/60"
              >
                <div className="flex items-center gap-3 px-3 py-2.5">
                  <Avatar />
                  <div className="leading-tight">
                    <p className="font-semibold text-white">@jerkatnite</p>
                    <p className="text-xs text-white/60">JERK AT NITE Inc.</p>
                  </div>
                </div>
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    src={p.img}
                    alt={clone ? "" : p.alt}
                    draggable={false}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 85vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <p className="px-3 py-4 text-sm leading-relaxed text-white/90">
                  <span className="font-semibold text-white">@jerkatnite</span> {p.caption}
                </p>
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/** "What people tells about us on social media platforms" — Instagram-style post cards. */
export function SocialReels({ heading, text }: { heading?: React.ReactNode; text?: string } = {}) {
  return (
    <section className="bg-gradient-to-b from-[#1c5a24] via-[#0b2410] to-black py-20">
      <div className="mx-auto max-w-6xl px-4 text-center sm:px-6">
        <h2 className="display text-4xl sm:text-6xl">
          {heading ?? (
            <>
              What People Tells About Us
              <br />
              On Social Media Platforms
            </>
          )}
        </h2>
        <p className="mx-auto mt-5 max-w-3xl text-lg text-white/90">
          {text ?? (
            <>
          From mouthwatering food posts to real customer experiences, our community loves sharing their favorite moments with us. See how
          our bold flavors and vibrant vibes are making an impact online.
        </>
          )}
        </p>

        <ReelsSlider />
      </div>
    </section>
  );
}
