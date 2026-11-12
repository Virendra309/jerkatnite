import Image from "next/image";
import { images, reviews } from "@/data/site";

function Quote({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 85 61" className={`h-12 w-auto ${className}`}>
      <defs>
        <linearGradient id="quote-grad" x1="0" y1="30" x2="85" y2="30" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFD700" />
          <stop offset="1" stopColor="#34A853" />
        </linearGradient>
      </defs>
      <path
        className="fill-[url(#quote-grad)] transition-colors group-hover:fill-black"
        d="M84.2 0 68 30.2c5.6 2.4 9.2 7 9.2 14.4 0 10.4-7.8 16-16.8 16-9.4 0-17.2-6-17.2-17 0-4 .8-7 2.4-10.2L62.8 0h21.4ZM41.2 0 24.8 30.2c5.6 2.4 9.2 7.2 9.2 14.4 0 10.4-7.8 16-16.8 16C7.8 60.6 0 54.6 0 43.6c0-4 1-7.2 2.6-10.2L19.6 0h21.6Z"
      />
    </svg>
  );
}

function Card({ text, hidden }: { text: string; hidden?: boolean }) {
  return (
    <li aria-hidden={hidden} className="w-[300px] shrink-0 pr-4 sm:w-[370px]">
      <figure className="group relative flex h-[360px] flex-col justify-between overflow-hidden rounded-xl border border-leaf/30 bg-gradient-to-b from-[#1d5a26] via-black to-black p-5 transition-colors duration-500 hover:border-transparent">
        {/* gold → green fill fades in on hover */}
        <span aria-hidden className="absolute inset-0 -z-0 bg-gradient-to-r from-[#FFE500] via-[#c9dc22] to-[#34A853] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <Quote className="relative self-start" />
        <div className="relative">
          <blockquote className="display text-[28px] leading-[0.95] text-white transition-colors duration-500 group-hover:text-black sm:text-[32px]">{text}</blockquote>
          <figcaption className="mt-4 flex items-center gap-2">
            <Image src={images.google} alt="Google review" width={28} height={28} className="size-7" />
            <span aria-label="5 out of 5 stars" className="text-lg tracking-wider text-gold transition-colors group-hover:text-black">
              ★★★★★
            </span>
          </figcaption>
        </div>
      </figure>
    </li>
  );
}

/** Continuously sliding review cards (pauses on hover). */
export function ReviewsMarquee() {
  // repeat so the row is always wider than the screen, then double it for a seamless loop
  const base = [...reviews, ...reviews];
  return (
    <section className="bg-black py-20">
      <div className="mx-auto max-w-4xl px-4 text-center">
        <h2 className="display text-4xl sm:text-6xl">
          What People Are Saying About
          <br />
          Jerk at Nite <span aria-hidden>👀</span>
        </h2>
        <p className="mx-auto mt-4 max-w-3xl text-lg text-white/80">
          From bold jerk flavors to unforgettable late-night vibes, our guests love the authentic taste and vibrant atmosphere we bring to every plate.
        </p>
      </div>
      <div className="group/row mt-12 flex overflow-hidden">
        <ul className="flex w-max shrink-0 animate-[marquee_60s_linear_infinite] group-hover/row:[animation-play-state:paused] motion-reduce:animate-none">
          {[...base, ...base].map((r, i) => (
            <Card key={i} text={r} hidden={i >= reviews.length} />
          ))}
        </ul>
      </div>
    </section>
  );
}
