import Image from "next/image";
import Link from "next/link";
import { OrderButton } from "@/components/order";
import { Container } from "@/components/ui";
import { images } from "@/data/site";

const cards = [
  { title: "Food Menu", text: "Bold Jamaican flavors, made fresh daily. No MSG, no shortcuts.", cta: "Explore Our Wider Menu", href: "/menu", img: images.tacos, tilt: "-rotate-2" },
  { title: "Order Online", text: "Order pickup or delivery from any location through DoorDash, Grubhub, Uber Eats, or Toast.", cta: "Order Now", href: null, img: images.wings, tilt: "-rotate-1" },
  { title: "Private Events", text: "Birthdays, corporate dinners, group gatherings. We handle the food and the vibes.", cta: "Plan Your Event", href: "/private-events", img: images.catering, tilt: "" },
  { title: "Catering", text: "Fresh Jamaican trays brought straight to your event. Bold flavor, generous portions.", cta: "Request Catering", href: "/catering", img: images.catering, tilt: "rotate-1" },
];

/** Four slightly tilted cards: Menu, Order Online, Private Events, Catering. */
export function FeatureCards() {
  return (
    <section className="bg-black pb-20 pt-4">
      <Container className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
        {cards.map((c) => {
          const cta = (
            <>
              {c.cta} <span aria-hidden>↗</span>
            </>
          );
          const ctaCls = "mt-4 inline-flex items-center gap-1 font-semibold text-[#c6f135] transition-colors hover:text-gold";
          return (
            <article
              key={c.title}
              className={`${c.tilt} rounded-xl border-t border-white/20 bg-gradient-to-b from-[#2b2b2b] via-[#141414] to-black p-2 pb-6 shadow-xl shadow-black/60 transition duration-300 hover:z-10 hover:rotate-0 hover:scale-[1.02]`}
            >
              <div className="relative aspect-[16/10] overflow-hidden rounded-lg">
                <Image src={c.img} alt={c.title} fill sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" className="object-cover" />
              </div>
              <div className="px-2 pt-4">
                <h2 className="display text-3xl">{c.title}</h2>
                <p className="mt-2 text-[15px] text-white/85">{c.text}</p>
                {c.href ? (
                  <Link href={c.href} className={ctaCls}>
                    {cta}
                  </Link>
                ) : (
                  <OrderButton className={`!bg-none !p-0 !shadow-none hover:!translate-y-0 ${ctaCls}`}>{cta}</OrderButton>
                )}
              </div>
            </article>
          );
        })}
      </Container>
    </section>
  );
}
