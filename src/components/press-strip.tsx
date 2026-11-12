import { press } from "@/data/site";

type Logo = (typeof press)[number];

/** One endlessly scrolling row. The list is rendered twice and shifted by exactly half, so the loop is seamless. */
function Row({ logos, reverse = false, duration = 40 }: { logos: Logo[]; reverse?: boolean; duration?: number }) {
  return (
    <div className="group/row flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
      <ul
        className="flex w-max shrink-0 animate-[marquee_linear_infinite] group-hover/row:[animation-play-state:paused] motion-reduce:animate-none"
        style={{ animationDuration: `${duration}s`, animationDirection: reverse ? "reverse" : "normal" }}
      >
        {[...logos, ...logos].map((p, i) => (
          <li key={`${p.name}-${i}`} aria-hidden={i >= logos.length} className="pr-3 sm:pr-5">
            <div
              title={p.name}
              className="group relative grid h-20 w-40 place-items-center sm:h-24 sm:w-52 overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.07] to-white/[0.02] px-7 backdrop-blur-sm transition duration-500 hover:-translate-y-1 hover:border-leaf/60 hover:shadow-[0_10px_40px_-10px_rgba(52,168,83,0.45)]"
            >
              {/* soft gold/green glow that fades in on hover */}
              <span aria-hidden className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,215,0,0.18),transparent_60%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              {/* eslint-disable-next-line @next/next/no-img-element -- mixed SVG/PNG/WebP logos, small and already optimized */}
              <img
                src={p.logo}
                alt={i < logos.length ? p.name : ""}
                className="relative max-h-10 w-auto sm:max-h-12 max-w-full object-contain opacity-70 brightness-0 invert transition duration-500 group-hover:scale-105 group-hover:opacity-100 group-hover:brightness-100 group-hover:invert-0"
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function PressStrip() {
  const half = Math.ceil(press.length / 2);
  // Second row starts at a different logo so the two rows never line up.
  const second = [...press.slice(half), ...press.slice(0, half)];

  return (
    <section aria-labelledby="press" className="relative overflow-hidden border-y border-white/10 bg-gradient-to-b from-ink via-ink-2 to-ink py-16">
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-0 h-40 w-[60%] -translate-x-1/2 rounded-full bg-leaf/10 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">In the news</p>
        <h2 id="press" className="display mt-3 text-4xl sm:text-5xl">
          As Featured <span className="text-gradient">or Seen In</span>
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-white/60">TV stations, newspapers and media that have covered Jerk at Nite.</p>
      </div>
      <div className="relative mt-10 space-y-5">
        <Row logos={press} duration={45} />
        <Row logos={second} reverse duration={55} />
      </div>
    </section>
  );
}
