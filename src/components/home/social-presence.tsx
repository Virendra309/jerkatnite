import Image from "next/image";
import { socials } from "@/data/site";

type Id = (typeof socials)[number]["id"];

function SocialIcon({ id }: { id: Id }) {
  switch (id) {
    case "facebook":
      return (
        <svg viewBox="0 0 24 24" className="size-5" aria-hidden>
          <circle cx="12" cy="12" r="12" fill="#1877F2" />
          <path fill="#fff" d="M13.4 19.5v-6h2l.3-2.4h-2.3V9.6c0-.7.2-1.2 1.2-1.2h1.2V6.3c-.2 0-1-.1-1.8-.1-1.8 0-3 1.1-3 3.1v1.8H9v2.4h2v6h2.4z" />
        </svg>
      );
    case "instagram":
      return (
        <svg viewBox="0 0 24 24" className="size-5" aria-hidden>
          <defs>
            <linearGradient id="ig" x1="0" y1="24" x2="24" y2="0">
              <stop stopColor="#FEDA75" />
              <stop offset=".35" stopColor="#FA7E1E" />
              <stop offset=".6" stopColor="#D62976" />
              <stop offset="1" stopColor="#4F5BD5" />
            </linearGradient>
          </defs>
          <rect width="24" height="24" rx="6" fill="url(#ig)" />
          <rect x="5.5" y="5.5" width="13" height="13" rx="4" fill="none" stroke="#fff" strokeWidth="1.8" />
          <circle cx="12" cy="12" r="3.1" fill="none" stroke="#fff" strokeWidth="1.8" />
          <circle cx="16.3" cy="7.7" r="1" fill="#fff" />
        </svg>
      );
    case "tiktok":
      return (
        <svg viewBox="0 0 24 24" className="size-5" aria-hidden>
          <path fill="#25F4EE" d="M15.2 3.5c.3 2 1.6 3.4 3.6 3.6v2.5a6.3 6.3 0 0 1-3.6-1.2v5.4a4.9 4.9 0 1 1-4.9-4.9v2.6a2.3 2.3 0 1 0 2.3 2.3V3.5z" transform="translate(-.6 -.4)" />
          <path fill="#FE2C55" d="M15.2 3.5c.3 2 1.6 3.4 3.6 3.6v2.5a6.3 6.3 0 0 1-3.6-1.2v5.4a4.9 4.9 0 1 1-4.9-4.9v2.6a2.3 2.3 0 1 0 2.3 2.3V3.5z" transform="translate(.6 .4)" />
          <path fill="#fff" d="M15.2 3.5c.3 2 1.6 3.4 3.6 3.6v2.5a6.3 6.3 0 0 1-3.6-1.2v5.4a4.9 4.9 0 1 1-4.9-4.9v2.6a2.3 2.3 0 1 0 2.3 2.3V3.5z" />
        </svg>
      );
    case "x":
      return (
        <svg viewBox="0 0 24 24" className="size-4" aria-hidden>
          <path fill="#fff" d="M17.8 3h3.1l-6.8 7.7L22 21h-6.2l-4.9-6.4L5.3 21H2.2l7.2-8.3L1.8 3h6.4l4.4 5.8zm-1.1 16.2h1.7L7.4 4.7H5.6z" />
        </svg>
      );
  }
}

/** "Our Noticeable Social Presence" — clickable phone cards linking to each profile. */
export function SocialPresence() {
  return (
    <section className="bg-gradient-to-b from-[#1c5a24] via-[#0b2410] to-black py-20">
      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6">
        <h2 className="display text-5xl sm:text-7xl">
          <span className="block">Our Noticeable</span>
          <span className="text-gradient block">Social Presence</span>
        </h2>
        <p className="mx-auto mt-5 max-w-3xl text-lg text-white/85">
          Our growing social community shares their favorite dishes, moments, and experiences with us every day. Follow along to stay
          connected with the latest flavors, updates, and island vibes. <span aria-hidden>📸🔥</span>
        </p>

        <ul className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {socials.map((s) => (
            <li key={s.id}>
              <a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Jerk at Nite on ${s.label} — ${s.followers} followers`}
                className="group relative flex h-full flex-col items-center overflow-hidden rounded-xl border border-white/15 bg-gradient-to-b from-black via-[#0c2711] to-[#1f5d27] px-3 pt-6 transition duration-500 hover:-translate-y-1.5 hover:border-leaf/70 hover:shadow-[0_20px_50px_-20px_rgba(52,168,83,0.7)]"
              >
                <span className="flex items-center gap-2 text-sm font-semibold text-white sm:text-base">
                  <SocialIcon id={s.id} />
                  @jerkatnite
                </span>
                <span className="display mt-3 text-3xl text-gradient sm:text-4xl">{s.followers} Followers</span>
                <span className="mt-1 text-xs font-semibold text-gold opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  Follow on {s.label} ↗
                </span>
                <div className="relative mt-3 w-full max-w-[220px] translate-y-3 transition-transform duration-500 ease-out group-hover:translate-y-0">
                  <Image src={s.phone} alt="" width={250} height={362} sizes="(min-width: 1024px) 220px, 45vw" className="h-auto w-full" />
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
