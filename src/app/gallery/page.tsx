import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { DeliveryBanner } from "@/components/home/delivery-banner";
import { SocialReels } from "@/components/home/social-reels";
import { Container, Faq, OrderTicker } from "@/components/ui";
import { images } from "@/data/site";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "See what's inside Jerk at Nite: signature jerk dishes, Caribbean plates and late-night vibes from our Baltimore, Washington DC, Detroit and Houston locations.",
};

const c = (name: string) => `/images/catering/${name}.jpg`;

// "wide" photos take the full row on phones and two columns on bigger screens.
const photos: { src: string; alt: string; wide?: boolean }[] = [
  { src: images.restaurant, alt: "Jerk at Nite restaurant at night", wide: true },
  { src: c("kingston-curry-chicken"), alt: "Kingston curry chicken" },
  { src: c("smoked-jerk-chicken"), alt: "Smoked jerk chicken" },
  { src: images.tacos, alt: "Jerk tacos", wide: true },
  { src: c("oxtail"), alt: "Oxtail" },
  { src: c("rum-cake"), alt: "Rum cake" },
  { src: "/images/locations/reel-baltimore-hq.jpg", alt: "Inside the Baltimore HQ", wide: true },
  { src: c("rasta-chicken"), alt: "Rasta pasta with chicken" },
  { src: c("curry-goat"), alt: "Curry goat" },
  { src: c("spinach-patties"), alt: "Spinach patties", wide: true },
  { src: images.wings, alt: "Jerk chicken wings" },
  { src: c("brown-stew-chicken"), alt: "Brown stew chicken" },
  { src: images.catering, alt: "Catering spread", wide: true },
  { src: c("jammin-salmon-salad"), alt: "Jammin' salmon salad" },
  { src: c("rack-of-lamb"), alt: "Rack of lamb" },
  { src: "/images/locations/reel-soft-opening.jpg", alt: "Jerk at Nite soft opening crowd", wide: true },
  { src: c("whole-snapper"), alt: "Whole snapper" },
  { src: c("coco-bread"), alt: "Coco bread" },
];

const galleryFaqs = [
  {
    q: "What can I find in the Jerk at Nite gallery?",
    a: "Our signature dishes, catering trays, private event setups and the look and feel of our restaurants, from the food on the plate to the late-night vibe.",
  },
  { q: "Are the gallery photos from actual locations?", a: "Yes. The photos show our real food, our team and our restaurants." },
  {
    q: "Can I see private event setups in the gallery before I book?",
    a: "Yes. Browse the gallery for ideas, then tell us what you have in mind on the Private Events page.",
  },
  { q: "Does the gallery show private event and catering setups?", a: "Yes, you'll find both private event moments and catering trays in the gallery." },
  { q: "Are there behind-the-scenes photos in the gallery?", a: "Yes. Follow @jerkatnite on Instagram and TikTok for even more behind-the-scenes moments." },
  { q: "Can I see the Baltimore HQ in the gallery?", a: "Yes. Our Baltimore HQ at 21 N Eutaw St is featured in the gallery." },
  { q: "How often is the gallery updated?", a: "We add new photos as new dishes, events and locations come together. Our social pages are updated even more often." },
  { q: "Can I see catering setups in the gallery?", a: "Yes. See our catering trays here, and build your own order on the Catering page." },
  {
    q: "What dishes can I see in the gallery?",
    a: "Jerk chicken, oxtail, curry goat, rasta pasta, jerk tacos and wings, jammin' salmon, rack of lamb, rum cake and more.",
  },
  {
    q: "Can gallery photos give me ideas for a private event menu?",
    a: "Definitely. Pick the dishes you like and our team will help you build a menu for your event.",
  },
];

export default function GalleryPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative isolate flex min-h-[60vh] items-center justify-center overflow-hidden pb-16 pt-32 text-center">
        <Image src={images.catering} alt="" fill priority sizes="100vw" className="animate-ken-burns -z-20 object-cover" />
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-black/65 via-black/60 to-black" />
        <Container className="animate-rise">
          <nav aria-label="Breadcrumb" className="mx-auto inline-flex items-center gap-3 rounded-full bg-black/50 px-6 py-2 backdrop-blur-sm">
            <Link href="/" className="text-white hover:text-gold">
              Home
            </Link>
            <span aria-hidden className="text-white">›</span>
            <span aria-current="page" className="text-gold">Gallery</span>
          </nav>
          <h1 className="display mt-5 text-5xl sm:text-7xl">
            See What&apos;s <span className="text-gradient">Inside the Gallery</span>
          </h1>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-white/90">
            Explore a gallery filled with bold <strong className="text-white">Jamaican and Caribbean food</strong> featuring signature jerk
            dishes, rich island spices, and unforgettable flavors. Every plate at Jerk at Nite is crafted to deliver a satisfying{" "}
            <strong className="text-white">late night Caribbean dining experience in Baltimore, Washington DC, Detroit &amp; Houston</strong>{" "}
            worth coming back for.
          </p>
        </Container>
      </section>

      {/* Photos */}
      <section className="bg-black pb-10">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-2.5 px-2.5 sm:gap-3 sm:px-6 lg:grid-cols-4">
          {photos.map((p) => (
            <div key={p.src} className={`group relative overflow-hidden ${p.wide ? "col-span-2 aspect-[16/9]" : "aspect-square"}`}>
              <Image
                src={p.src}
                alt={p.alt}
                fill
                sizes={p.wide ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 25vw, 50vw"}
                className="object-cover transition duration-700 group-hover:scale-105"
              />
            </div>
          ))}
        </div>
      </section>

      <OrderTicker />
      <SocialReels />
      <DeliveryBanner
        title={
          <>
            Get Some Jerk on
            <br />
            Your Locations!
          </>
        }
        text="Order your favorite dishes easily through DoorDash or Uber Eats from your nearest location. Enjoy bold Jamaican flavors delivered straight to your doorstep, fresh and ready to satisfy your cravings."
      />

      {/* FAQ */}
      <section className="bg-gradient-to-b from-[#1c5a24] via-[#0b2410] to-black py-20">
        <Container>
          <h2 className="display text-5xl sm:text-6xl">
            Frequently Asked <span className="text-gradient">Questions</span>
          </h2>
          <p className="mb-10 mt-3 text-lg text-white/85">Join us for authentic Jamaican flavors and an atmosphere you won&apos;t forget.</p>
          <Faq items={galleryFaqs} />
        </Container>
      </section>
    </>
  );
}
