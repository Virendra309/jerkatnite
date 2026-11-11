import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { MenuTabs } from "@/components/menu-tabs";
import { OrderButton } from "@/components/order";
import { Container, Faq } from "@/components/ui";
import { menu } from "@/data/menu";
import { images } from "@/data/site";

export const metadata: Metadata = {
  title: "Menu",
  description: "Jerk tacos, Kingston kurry, rasta pasta, oxtails, jammin salmon and more. 100% Halal, no MSG, made fresh daily.",
};

export default function MenuPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative isolate flex min-h-[78vh] items-center justify-center overflow-hidden pb-16 pt-32 text-center">
        <Image src={images.catering1} alt="" fill priority sizes="100vw" className="animate-ken-burns -z-20 object-cover" />
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-black/50 via-black/45 to-black" />
        <Container className="animate-rise">
          <nav aria-label="Breadcrumb" className="mx-auto inline-flex items-center gap-3 rounded-full bg-black/50 px-6 py-2 backdrop-blur-sm">
            <Link href="/" className="text-white hover:text-gold">Home</Link>
            <span aria-hidden className="text-white">›</span>
            <span aria-current="page" className="text-gold">Our Menu</span>
          </nav>
          <h1 className="display mt-5 text-5xl sm:text-7xl">Jerk at Nite&apos;s Menu</h1>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-white/90">
            A menu crafted to leave a lasting impression. Packed with bold flavors, signature Jamaican jerk specialties, and rich
            Caribbean spices. Every dish is made to be memorable, satisfying, and worth coming back for.
          </p>
          <OrderButton className="mt-8 rounded-[4px] px-5 py-2.5 font-semibold shadow-none">Order Online Now</OrderButton>
        </Container>
      </section>

      {/* Highlights */}
      <section aria-label="Why our food" className="border-y border-white/10 bg-black">
        <Container className="grid divide-y divide-white/10 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {[
            { title: "100% Halal", text: "Every dish, since day one" },
            { title: "No MSG", text: "Natural ingredients, real spices" },
            { title: "Made Fresh Daily", text: "Prepared fresh every day" },
          ].map((h, i) => (
            <div key={h.title} style={{ animationDelay: `${300 + i * 120}ms` }} className="animate-fade-up px-6 py-6 text-center">
              <p className="display text-3xl text-gradient">{h.title}</p>
              <p className="mt-1 text-sm text-white/65">{h.text}</p>
            </div>
          ))}
        </Container>
      </section>

      {/* Menu */}
      <section className="bg-black py-16">
        <Container>
          <h2 className="display mb-6 text-4xl sm:text-5xl">Explore Our Jamaican Caribbean Menu</h2>
          <MenuTabs tabs={menu} />
          <div className="mt-12 text-center">
            <OrderButton className="rounded-[4px] px-5 py-2.5 font-semibold shadow-none">Order Online Now</OrderButton>
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="bg-gradient-to-b from-[#1d5a26] to-ink py-20">
        <Container>
          <h2 className="display text-5xl">Frequently Asked Questions</h2>
          <p className="mb-8 mt-2 text-white/80">Join us for authentic Jamaican flavors and an atmosphere you won&apos;t forget.</p>
          <Faq />
        </Container>
      </section>
    </>
  );
}
