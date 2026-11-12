import Image from "next/image";
import Link from "next/link";
import { images, locations, site, socials, youtube } from "@/data/site";
import { OrderButton } from "./order";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Order Online", href: null }, // opens the order popup
  { label: "Catering", href: "/catering" },
  { label: "Events", href: "/private-events" },
  { label: "Menu", href: "/menu" },
  { label: "About", href: "/about" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
  { label: "Careers", href: "/careers" },
];

const linkCls = "text-white/85 transition-colors hover:text-gold";

export function Footer() {
  const hq = locations.find((l) => l.hq) ?? locations[0];
  return (
    <footer className="relative overflow-hidden bg-[#141414]">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 pb-10 pt-16 sm:px-6 lg:grid-cols-[1.5fr_1fr_0.8fr_1fr]">
        <div>
          <Link href="/" aria-label="Jerk at Nite home">
            <Image src={images.logo} alt="Jerk at Nite" width={240} height={41} />
          </Link>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/85">
            Authentic jerk flavors infused with bold Caribbean spices deliver the true taste of Jamaica in every bite. Rich, smoky, and
            unforgettable. This is where great food, vibrant nights, and lasting memories come alive after dark. <span aria-hidden>🔥🌙</span>
          </p>
          <p className="mt-6 font-semibold">{hq.short} Location:</p>
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hq.mapsQuery)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gradient mt-1 inline-block text-lg font-medium hover:opacity-80"
          >
            {hq.address}
          </a>
          <ul className="mt-5 space-y-3 text-white/90">
            <li>
              <a href={site.phoneHref} className="inline-flex items-center gap-3 hover:text-gold">
                <svg viewBox="0 0 24 24" className="size-4" fill="currentColor" aria-hidden>
                  <path d="M6.6 10.8a15.2 15.2 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1z" />
                </svg>
                {site.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="inline-flex items-center gap-3 hover:text-gold">
                <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="m3 7 9 6 9-6" />
                </svg>
                {site.email}
              </a>
            </li>
          </ul>
        </div>

        <FooterCol title="Quick Links">
          {quickLinks.map((l) => (
            <li key={l.label}>
              {l.href ? (
                <Link href={l.href} className={linkCls}>
                  {l.label}
                </Link>
              ) : (
                <OrderButton className="!inline !rounded-none !bg-none !p-0 !font-normal !text-white/85 !shadow-none hover:!translate-y-0 hover:!text-gold">
                  {l.label}
                </OrderButton>
              )}
            </li>
          ))}
        </FooterCol>

        <FooterCol title="Socials">
          {[...socials.map((s) => ({ label: s.label, href: s.href })), { label: "YouTube", href: youtube }].map((s) => (
            <li key={s.label}>
              <a href={s.href} target="_blank" rel="noopener noreferrer" className={linkCls}>
                {s.label}
              </a>
            </li>
          ))}
        </FooterCol>

        <FooterCol title="Locations">
          {locations.map((l) => (
            <li key={l.slug}>
              <Link href={`/locations/${l.slug}`} className={linkCls}>
                {l.city}
              </Link>
            </li>
          ))}
        </FooterCol>
      </div>

      {/* giant gradient wordmark */}
      <p
        aria-hidden
        className="display pointer-events-none select-none bg-gradient-to-r from-[#a7a10f] via-[#6c9a1f] to-[#2f8a3c] bg-clip-text px-2 text-center text-[21vw] leading-[0.8] text-transparent"
      >
        Jerkatnite
      </p>

      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-6 text-sm text-white/70 sm:flex-row sm:px-6">
        <p>© 2026 Jerk at Nite. All Rights Reserved.</p>
        <p>Halal · No MSG · Made fresh daily</p>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="display text-2xl">{title}</h2>
      <ul className="mt-5 space-y-3">{children}</ul>
    </div>
  );
}
