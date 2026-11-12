import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CateringOrder } from "@/components/catering-order";
import { ReviewsMarquee } from "@/components/home/reviews-marquee";
import { Container, Faq } from "@/components/ui";
import { catering } from "@/data/catering";
import { images, locations } from "@/data/site";

export const metadata: Metadata = {
  title: "Catering",
  description:
    "Award-winning Jamaican food catering: jerk chicken, oxtail, rack of lamb, curry goat and Caribbean trays made fresh daily. 100% Halal, no MSG.",
};

// Catering is served from these locations (live site order).
const cateringLocations = ["baltimore-md", "houston-tx", "detroit-mi"]
  .map((slug) => locations.find((l) => l.slug === slug)!)
  .filter(Boolean);

const cateringFaqs = [
  {
    q: "Does Jerk at Nite offer catering services?",
    a: "Yes. We cater weddings, corporate events, birthday parties and private gatherings with fresh Jamaican and Caribbean food trays made daily.",
  },
  {
    q: "How far in advance do I need to book catering?",
    a: "Please submit your request at least 24 hours in advance. Some items need more notice: Rack of Lamb and Whole Snapper need 7 days, Vegetarian Spinach Patties 5 days and Pineapple Ginger 3 days.",
  },
  {
    q: "What catering items are available?",
    a: "Entrees like Curry Goat, Oxtail, Smoked Jerk Chicken and Rasta Pasta, plus salads, appetizers, rum cake, beverages, buffet packages and food truck rental. See the menu above.",
  },
  {
    q: "Can I mix and match catering items?",
    a: "Yes. Add any combination of full and half trays from different categories to build your order.",
  },
  {
    q: "What events does Jerk at Nite cater?",
    a: "Weddings, corporate events, birthday parties, graduations, school and college events, and private gatherings of any size.",
  },
  {
    q: "Is the catering food halal?",
    a: "Yes. All catering food is 100% Halal, made fresh daily with no MSG.",
  },
  {
    q: "How much does catering cost?",
    a: "Prices are listed per full or half tray in the menu above (for example, Smoked Jerk Chicken is $145 a full tray). Some items are market price, and buffet packages are quoted on request.",
  },
  {
    q: "Which locations offer catering?",
    a: "Catering is served from our Baltimore (HQ), Houston and Detroit locations.",
  },
  {
    q: "Can Jerk at Nite cater my corporate event?",
    a: "Absolutely. From office lunches to conferences and brand activations, we bring fresh trays on time.",
  },
  {
    q: "How do I get a catering quote?",
    a: "Add the items you want using the + buttons, fill out the Order Your Catering Today form and hit Send It, or call your nearest location.",
  },
];

export default function CateringPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative isolate flex min-h-[78vh] items-center justify-center overflow-hidden pb-16 pt-32 text-center">
        <Image src={images.catering} alt="" fill priority sizes="100vw" className="animate-ken-burns -z-20 object-cover" />
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-black/60 via-black/50 to-black" />
        <Container className="animate-rise">
          <nav aria-label="Breadcrumb" className="mx-auto inline-flex items-center gap-3 rounded-full bg-black/50 px-6 py-2 backdrop-blur-sm">
            <Link href="/" className="text-white hover:text-gold">
              Home
            </Link>
            <span aria-hidden className="text-white">›</span>
            <span aria-current="page" className="text-gold">Catering</span>
          </nav>
          <h1 className="display mt-5 text-5xl sm:text-7xl">
            Get Catered <span className="text-gradient">From Jerk at Nite</span>
          </h1>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-white/90">
            Smoky jerk chicken, slow-braised oxtail, rack of lamb, curry goat and Caribbean food trays made fresh daily. Award-winning
            Jamaican food catering for weddings, corporate events, birthday parties and private gatherings in{" "}
            <strong className="text-white">Maryland, Washington DC, Detroit &amp; Houston Locations</strong>. All food Halal certified, no
            MSG.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a href="#menu" className="btn-primary rounded-[4px] px-5 py-2.5 font-semibold shadow-none">
              View Catering Menu
            </a>
            <a
              href="#order"
              className="inline-flex items-center justify-center rounded-[4px] bg-white px-5 py-2.5 font-semibold text-black transition hover:-translate-y-0.5 hover:bg-gold"
            >
              Start Catering Order
            </a>
          </div>
        </Container>
      </section>

      <CateringOrder tabs={catering} locations={cateringLocations.map((l) => (l.hq ? `${l.city} (HQ)` : l.city))} />

      {/* Catering locations */}
      <section className="bg-black pb-10">
        <Container>
          <ul className="grid gap-5 md:grid-cols-3">
            {cateringLocations.map((l) => {
              const [name, state] = l.city.split(",").map((x) => x.trim());
              return (
                <li key={l.slug} className="rounded-t-xl border border-b-0 border-white/20 bg-gradient-to-b from-[#2b2b2b] to-black px-5 pb-6 pt-5 text-center">
                  <h3 className="display text-2xl">
                    {l.slug === "houston-tx" ? (
                      <>
                        {name}, {state} (H-Town)
                      </>
                    ) : l.hq ? (
                      <>
                        {name} <span className="text-[#5ee26f]">(HQ)</span>
                      </>
                    ) : (
                      l.city
                    )}
                  </h3>
                  <p className="mt-2 text-sm text-white/85">{l.address}</p>
                  <p className="mt-4 flex items-center justify-center gap-3">
                    <span className="grid size-9 place-items-center rounded-full border border-white/15 bg-black text-gold">
                      <svg viewBox="0 0 24 24" className="size-4" fill="currentColor" aria-hidden>
                        <path d="M6.6 10.8a15.2 15.2 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1z" />
                      </svg>
                    </span>
                    {l.phone ? (
                      <a href={`tel:${l.phone.replace(/[^\d+]/g, "")}`} className="text-lg text-[#9be564] hover:text-gold">
                        {l.phone}
                      </a>
                    ) : (
                      <span className="text-lg text-[#9be564]">N/A</span>
                    )}
                  </p>
                </li>
              );
            })}
          </ul>
          <p className="mt-6 text-center font-semibold text-chili">
            Catering is only served on the <span className="underline">above</span> locations.
          </p>
        </Container>
      </section>

      <ReviewsMarquee
        heading={
          <>
            Hear What Our Guests Love About the
            <br />
            <span className="text-gradient">Jerkatnite Experience</span>
          </>
        }
      />

      {/* FAQ */}
      <section className="bg-gradient-to-b from-[#1c5a24] via-[#0b2410] to-black py-20">
        <Container>
          <h2 className="display text-5xl sm:text-6xl">
            Frequently Asked <span className="text-gradient">Questions</span>
          </h2>
          <p className="mb-10 mt-3 text-lg text-white/85">Join us for authentic Jamaican flavors and an atmosphere you won&apos;t forget.</p>
          <Faq items={cateringFaqs} />
        </Container>
      </section>
    </>
  );
}
