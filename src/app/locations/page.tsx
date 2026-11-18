import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CapturedMoments } from "@/components/home/captured-moments";
import { FeatureCards } from "@/components/feature-cards";
import { DeliveryBanner } from "@/components/home/delivery-banner";
import { PrivateEventsTeaser } from "@/components/home/private-events-teaser";
import { Reserve } from "@/components/home/reserve";
import { SocialReels } from "@/components/home/social-reels";
import { OrderButton } from "@/components/order";
import { Container, Faq, LocationTiles, OrderTicker } from "@/components/ui";
import { images } from "@/data/site";

export const metadata: Metadata = {
  title: "Locations",
  description: "Find Jerk at Nite in Baltimore (HQ), Houston and Detroit, with Washington DC coming soon. 100% Halal, made fresh daily, no MSG.",
};

const locationFaqs = [
  { q: "How many Jerk at Nite locations are there?", a: "We currently serve Baltimore, MD (HQ), Houston, TX and Detroit, MI, with Washington DC coming soon." },
  { q: "Where is the Jerk at Nite headquarters?", a: "Our HQ is in Baltimore at 21 N Eutaw St, Baltimore, MD 21201." },
  {
    q: "Is Jerk at Nite affiliated with the location at Washington, DC?",
    a: "Our Washington DC location is coming soon. Follow us on social media for opening news.",
  },
  { q: "Which location is best for dine-in?", a: "Baltimore (HQ) is our flagship for dine-in and the only location that takes reservations through OpenTable." },
  { q: "Are all locations open the same hours?", a: "No, hours vary by location and day. Each location shows today's hours on this page." },
  { q: "Does Jerk at Nite have a location in Detroit?", a: "Yes, at 19163 Livernois Ave, Detroit, MI 48221." },
  { q: "Can I get delivery from any location?", a: "Delivery is available through DoorDash and Uber Eats, depending on the location. Tap Order Now to see the options near you." },
  {
    q: "Which location is closest to Howard University?",
    a: "Jerk at Nite started at Howard University in Washington DC. Our DC location is coming soon; until then, Baltimore (HQ) is the closest.",
  },
  { q: "Which locations offer both pickup and delivery?", a: "Baltimore and Detroit offer pickup and delivery through our ordering partners. Tap Order Now to choose." },
  { q: "Is Jerk at Nite expanding to new cities?", a: "Yes, Washington DC is next. Follow us on Instagram @jerkatnite for announcements." },
];

export default function LocationsPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative isolate flex min-h-[70vh] items-center justify-center overflow-hidden pb-16 pt-32 text-center">
        <Image src={images.restaurant} alt="" fill priority sizes="100vw" className="animate-ken-burns -z-20 object-cover" />
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-black/60 via-black/55 to-black" />
        <Container className="animate-rise">
          <nav aria-label="Breadcrumb" className="mx-auto inline-flex items-center gap-3 rounded-full bg-black/50 px-6 py-2 backdrop-blur-sm">
            <Link href="/" className="text-white hover:text-gold">
              Home
            </Link>
            <span aria-hidden className="text-white">›</span>
            <span aria-current="page" className="text-gold">Locations</span>
          </nav>
          <h1 className="display mt-5 text-5xl sm:text-7xl">
            Find a <span className="text-gradient">Jerk at Nite</span> Near You
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/90">
            Bold Jamaican flavors in Baltimore, Houston and Detroit. All food is Halal, made fresh the day of with no MSG.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <OrderButton className="rounded-[4px] px-5 py-2.5 font-semibold shadow-none" />
            <Link
              href="/menu"
              className="inline-flex items-center justify-center rounded-[4px] bg-white px-5 py-2.5 font-semibold text-black transition hover:-translate-y-0.5 hover:bg-gold"
            >
              View Menu
            </Link>
          </div>
        </Container>
      </section>

      <FeatureCards />

      <LocationTiles />
      <OrderTicker />
      <CapturedMoments />
      <SocialReels />
      <DeliveryBanner />
      <PrivateEventsTeaser />
      <Reserve image="/images/locations/reserved-bg.jpg" cta="Book Your Spot Now" overlay="bg-black/20" />

      {/* FAQ */}
      <section className="bg-gradient-to-b from-[#1c5a24] via-[#0b2410] to-black py-20">
        <Container>
          <h2 className="display text-5xl sm:text-6xl">Frequently Asked Questions</h2>
          <p className="mb-10 mt-3 text-lg text-white/85">Join us for authentic Jamaican flavors and an atmosphere you won&apos;t forget.</p>
          <Faq items={locationFaqs} />
        </Container>
      </section>
    </>
  );
}
