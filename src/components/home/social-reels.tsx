import Image from "next/image";
import { socials } from "@/data/site";

const instagram = socials.find((s) => s.id === "instagram")!.href;

// Posts as shown on the live site (images cut from the reference recording).
const posts = [
  {
    img: "/images/locations/reel-baltimore.jpg",
    alt: "Jerk at Nite Baltimore, MD record wall",
    caption: "OpenTable Diner's Choice Award winner 2025. Come see why Baltimore keeps showing up.",
  },
  {
    img: "/images/locations/reel-oxtail-off.jpg",
    alt: "Chef holding a tray at The Oxtail Off",
    caption: "Our chefs bring 12+ years of experience to every plate they serve. This is what real Jamaican cooking looks like up close.",
  },
  {
    img: "/images/locations/reel-jamaican-way.jpg",
    alt: "Guest tasting oxtail, the Jamaican way",
    caption: "Reggae on the speakers, jerk on the plate, good people all around. This is the full experience.",
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

/** "What people tells about us on social media platforms" — Instagram-style post cards. */
export function SocialReels() {
  return (
    <section className="bg-gradient-to-b from-[#1c5a24] via-[#0b2410] to-black py-20">
      <div className="mx-auto max-w-6xl px-4 text-center sm:px-6">
        <h2 className="display text-4xl sm:text-6xl">
          What People Tells About Us
          <br />
          On Social Media Platforms
        </h2>
        <p className="mx-auto mt-5 max-w-3xl text-lg text-white/90">
          From mouthwatering food posts to real customer experiences, our community loves sharing their favorite moments with us. See how
          our bold flavors and vibrant vibes are making an impact online.
        </p>

        <ul className="mt-12 grid gap-4 text-left sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => (
            <li key={p.img}>
              <a
                href={instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View on Instagram: ${p.caption}`}
                className="group block overflow-hidden rounded-lg border border-white/10 bg-[#262626] transition duration-300 hover:-translate-y-1 hover:border-leaf/60"
              >
                <div className="flex items-center gap-3 px-3 py-2.5">
                  <Avatar />
                  <div className="leading-tight">
                    <p className="font-semibold text-white">@jerkatnite</p>
                    <p className="text-xs text-white/60">JERK AT NITE Inc.</p>
                  </div>
                </div>
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image src={p.img} alt={p.alt} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <p className="px-3 py-4 text-sm leading-relaxed text-white/90">
                  <span className="font-semibold text-white">@jerkatnite</span> {p.caption}
                </p>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
