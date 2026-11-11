import Image from "next/image";
import Link from "next/link";
import { images, locations, nav, site, socials } from "@/data/site";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-gradient-to-b from-ink to-ink-2">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Image src={images.logo} alt="Jerk at Nite" width={174} height={30} />
          <p className="mt-5 max-w-sm text-white/70">
            Authentic jerk flavors infused with bold Caribbean spices — the true taste of Jamaica in every bite. Where great food,
            vibrant nights and lasting memories come alive after dark.
          </p>
          <p className="mt-6 font-semibold text-gradient">Baltimore HQ</p>
          <p className="text-white/80">{locations[0].address}</p>
          <ul className="mt-4 space-y-1 text-white/80">
            <li><a href={site.phoneHref} className="hover:text-gold">{site.phone}</a></li>
            <li><a href={`mailto:${site.email}`} className="hover:text-gold">{site.email}</a></li>
          </ul>
        </div>

        <FooterList title="Quick Links" items={nav.map((n) => ({ label: n.label, href: n.href }))} />
        <FooterList title="Socials" items={socials.map((s) => ({ label: s.label, href: s.href, external: true }))} />
        <FooterList title="Locations" items={locations.map((l) => ({ label: l.city, href: `/locations/${l.slug}` }))} />
      </div>

      <p aria-hidden className="display pointer-events-none select-none text-center text-[22vw] leading-none text-white/[0.04]">
        Jerkatnite
      </p>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-6 text-sm text-white/60 sm:flex-row sm:px-6">
          <p>© 2026 Jerk at Nite. All Rights Reserved.</p>
          <p>Halal · No MSG · Made fresh daily</p>
        </div>
      </div>
    </footer>
  );
}

function FooterList({ title, items }: { title: string; items: { label: string; href: string; external?: boolean }[] }) {
  return (
    <div>
      <h2 className="display text-2xl">{title}</h2>
      <ul className="mt-4 space-y-2 text-white/75">
        {items.map((i) => (
          <li key={i.label}>
            {i.external ? (
              <a href={i.href} target="_blank" rel="noopener noreferrer" className="hover:text-gold">{i.label}</a>
            ) : (
              <Link href={i.href} className="hover:text-gold">{i.label}</Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
