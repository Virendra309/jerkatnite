import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FeatureCards } from "@/components/feature-cards";
import { DeliveryBanner } from "@/components/home/delivery-banner";
import { ReviewsMarquee } from "@/components/home/reviews-marquee";
import { SocialPresence } from "@/components/home/social-presence";
import { SocialReels } from "@/components/home/social-reels";
import { Container, Faq, LocationTiles, OrderTicker } from "@/components/ui";
import { images, locations, site } from "@/data/site";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "From a Howard University dorm room in 2012 to restaurants in Baltimore, Houston and Detroit: the Jerk at Nite story. Bold Jamaican flavors, 100% Halal, no MSG.",
};

const highlights = [
  {
    title: ["100% Halal &", "Authentic Jerk Flavor"],
    text: "Our happy customers reflect the love for our bold flavors and unforgettable dining experience.",
  },
  {
    title: ["As Seen on", "FOX 5, WUSA9, AfroTech & More"],
    text: "100K+ people love our taste. Bold Jamaican flavors that guests keep coming back for.",
  },
  {
    title: ["4 Locations.", "One Mission. Feed the Culture."],
    text: "Bringing our bold Jamaican flavors to multiple cities and growing every day.",
  },
];

const aboutFaqs = [
  {
    q: "Who founded Jerk at Nite and how did it start?",
    a: "Our founder started selling his Jamaican jerk chicken from his dorm room in Drew Hall at Howard University in 2012. After 10 PM the campus cafeteria closed, and students studying late only had greasy fast food, so Jerk at Nite was born.",
  },
  {
    q: "What awards has Jerk at Nite won?",
    a: "Our Baltimore HQ is an OpenTable Diner's Choice Award winner (2025), and Jerk at Nite has been featured on FOX 5, WUSA9, NBC4, FOX 45, AfroTech and more.",
  },
  {
    q: "How much has Jerk at Nite grown?",
    a: "From one dorm room to restaurants in Baltimore (HQ), Houston and Detroit, with Washington DC coming soon.",
  },
  {
    q: "Is Jerk at Nite big on social media?",
    a: "Yes. More than 500K people follow us across Instagram, TikTok, Facebook and X. Find us at @jerkatnite.",
  },
  {
    q: "What cuisine does Jerk at Nite specialize in?",
    a: "Authentic Jamaican and Caribbean food with a fusion of Mexican and American soul food: jerk chicken, oxtail, jammin' salmon, rasta pasta and more. 100% Halal, no MSG.",
  },
  { q: "Are Jerk at Nite chefs professionally trained?", a: "Yes. Our chefs bring 12+ years of professional experience to every plate they serve." },
  {
    q: "How many Jerk at Nite locations are open right now?",
    a: "Three: Baltimore, MD (HQ), Houston, TX and Detroit, MI. Washington DC is coming soon.",
  },
  {
    q: "Is Jerk at Nite still connected to Howard University?",
    a: "Howard is where it all began, and that late-night spirit is in everything we cook. Our upcoming Washington DC location brings Jerk at Nite back home.",
  },
  {
    q: "How can I contact the Jerk at Nite team?",
    a: `Call us at ${site.phone}, email ${site.email}, or send a message through our Contact page.`,
  },
  { q: "Is Jerk at Nite hiring new team members?", a: "We're always looking for great people. See open roles and apply on our Careers page." },
];

function Sparkle({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className={`pointer-events-none text-[#8dff3a] ${className}`}>
      <path fill="currentColor" d="M11 1h2v8.6l6.1-6.1 1.4 1.4L14.4 11H23v2h-8.6l6.1 6.1-1.4 1.4-6.1-6.1V23h-2v-8.6l-6.1 6.1-1.4-1.4L9.6 13H1v-2h8.6L3.5 4.9l1.4-1.4L11 9.6z" />
    </svg>
  );
}

export default function AboutPage() {
  const openCount = locations.filter((l) => !l.comingSoon).length;
  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden pb-16 pt-32 text-center">
        <Image src={images.restaurant} alt="" fill priority sizes="100vw" className="animate-ken-burns -z-20 object-cover" />
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-black/70 via-black/65 to-black" />
        <Container className="animate-rise">
          <nav aria-label="Breadcrumb" className="mx-auto inline-flex items-center gap-3 rounded-full bg-black/50 px-6 py-2 backdrop-blur-sm">
            <Link href="/" className="text-white hover:text-gold">
              Home
            </Link>
            <span aria-hidden className="text-white">›</span>
            <span aria-current="page" className="text-gold">About Us</span>
          </nav>
          <h1 className="display mt-5 text-5xl sm:text-7xl">About Jerk at Nite</h1>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-white/90">
            Jerk at Nite delivers bold, authentic Jamaican flavors with signature jerk dishes, rich spices, and a vibrant late-night vibe,
            perfect for a memorable Caribbean dining experience.
          </p>
        </Container>
        <Container className="mt-14 grid gap-5 text-left md:grid-cols-3">
          {highlights.map((h) => (
            <div key={h.title[1]} className="rounded-xl border border-[#c6f135]/40 bg-gradient-to-b from-[#1c5a24] to-black p-5 shadow-lg shadow-black/40">
              <h2 className="display text-2xl leading-tight">
                <span className="text-gold">{h.title[0]}</span> <span className="text-[#5ee26f]">{h.title[1]}</span>
              </h2>
              <p className="mt-2 text-[15px] text-white/85">{h.text}</p>
            </div>
          ))}
        </Container>
      </section>

      {/* Statement */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#1c5a24] to-black py-24 text-center">
        <Sparkle className="absolute left-[8%] top-16 size-16 opacity-40 sm:size-24" />
        <div className="absolute right-[4%] top-4 hidden w-32 rotate-6 overflow-hidden rounded-lg border-4 border-white shadow-xl xl:block">
          <Image src="/images/locations/reel-soft-opening.jpg" alt="" width={500} height={664} aria-hidden className="aspect-[4/3] object-cover" />
        </div>
        <Container className="relative max-w-5xl">
          <h2 className="display text-4xl leading-[1.1] sm:text-6xl">
            Jerk at Nite brings bold Jamaican flavors to life with signature jerk dishes, vibrant vibes, and unforgettable late-night
            experiences.
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-lg text-white/85">
            Jerk at Nite is a vibrant Caribbean restaurant bringing authentic Jamaican flavors to life through bold spices, signature jerk
            dishes, and a lively late-night atmosphere. With multiple locations and a growing community, it&apos;s the perfect spot to
            enjoy rich flavors, great vibes, and unforgettable dining experiences.
          </p>
        </Container>
      </section>

      {/* Who we are */}
      <section className="overflow-hidden bg-gradient-to-b from-black to-[#123d19] py-20">
        <Container className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <h2 className="display relative text-5xl leading-[1.02] sm:text-7xl">
              Who We Are: About
              <br />
              <span className="text-gradient">Jerkatnite</span>
              <Sparkle className="absolute -bottom-4 -left-3 size-10" />
            </h2>
            <div className="mt-8 space-y-5 text-white/85">
              <p>
                The founder started selling his flavorful Jamaican jerk chicken from his dorm room in Drew Hall at Howard University in
                2012. Jerk at Nite was originally founded as a result of the lack of authentic late-night food options at Howard
                University. After 10pm, the campus cafeteria was closed and students who were tasked with writing late-night papers and
                studying for exams were only left with greasy fast food options such as burgers, fries, and pizza. The founder was
                raised in a Jamaican household where he received three wholesome meals per day and fast food was a rarity.
              </p>
              <p>
                The concept places an emphasis on healthy yet affordable Mexican, Jamaican, and American soul food which emphasizes
                fusion cooking. Additionally, the brand is committed to keeping produce free of MSG and preservatives. Guests can expect
                a variety of hearty Jamaican staples like our signature jerk chicken, oxtail, jammin&apos; salmon and a variety of other
                savory dishes.
              </p>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
              <Image src="/images/locations/reel-baltimore-hq.jpg" alt="Inside the Jerk at Nite Baltimore HQ" fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
            </div>
            <div className="absolute -right-3 -top-8 w-32 rotate-6 overflow-hidden rounded-lg border-4 border-white shadow-xl sm:w-44">
              <Image src="/images/locations/reel-baltimore.jpg" alt="" width={506} height={672} aria-hidden className="aspect-[4/3] object-cover" />
            </div>
            <Sparkle className="absolute -bottom-5 -left-5 size-12" />
          </div>
        </Container>
      </section>

      <OrderTicker />

      {/* Locations */}
      <section className="bg-gradient-to-b from-[#123d19] to-black pt-16">
        <Container className="flex items-center gap-4 pb-12">
          <span className="display text-gradient text-[5.5rem] italic leading-none sm:text-[10rem]">{openCount}</span>
          <h2 className="display text-3xl italic leading-[1.05] sm:text-6xl">
            We Are Located In
            <br />
            <span className="text-gradient">Different Areas</span>
          </h2>
          <svg aria-hidden viewBox="0 0 24 24" className="ml-auto mt-16 size-8 shrink-0 text-chili sm:ml-2 sm:size-10" fill="currentColor">
            <path d="M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z" />
          </svg>
        </Container>
        <LocationTiles />
      </section>

      <SocialReels
        heading={
          <>
            The DMV Fell in Love. Then the
            <br />
            World Did Too.
          </>
        }
        text="From mouthwatering food posts to real customer experiences, our community grows every day with fans sharing their favorite moments with us. See how our bold flavors and Caribbean spices are making an impact online."
      />
      <DeliveryBanner />

      {/* Howard U made */}
      <section className="overflow-hidden bg-gradient-to-b from-[#123d19] to-black py-20">
        <Container className="grid items-center gap-12 md:grid-cols-2">
          <div className="mx-auto w-full max-w-lg -rotate-6 overflow-hidden rounded-3xl shadow-2xl shadow-black/60">
            <Image
              src="/images/about/howard-founders-library.jpg"
              alt="Founders Library at Howard University, where Jerk at Nite began"
              width={1280}
              height={890}
              sizes="(min-width: 768px) 45vw, 100vw"
              className="h-auto w-full"
            />
          </div>
          <div>
            <p className="font-serif text-2xl italic text-[#5ee26f]">Howard U made...</p>
            <h2 className="display mt-2 text-5xl sm:text-6xl">
              It Was All <span className="text-gradient">A Dream...</span>
            </h2>
            <p className="mt-5 text-white/85">
              Started in a dorm room at Howard University, Jerk @ Nite was built for students craving a better late-night option than
              fast food. It quickly became a go-to for <strong className="text-white">late night Caribbean food in DC</strong>, known for
              authentic <strong className="text-white">Jamaican jerk chicken and island flavors</strong> across the DMV. Today, Jerk at
              Nite has grown into multiple locations, serving thousands and becoming a top spot for anyone searching for the best{" "}
              <strong className="text-white">jerk chicken</strong> in the DMV and beyond.
            </p>
          </div>
        </Container>
      </section>

      <FeatureCards />

      <ReviewsMarquee
        heading={
          <>
            Hear What Our Guests Love About the Jerk at Nite Experience
          </>
        }
      />

      <OrderTicker />

      <SocialPresence
        heading={
          <>
            <span className="block">500K+ Followers Started With</span>
            <span className="text-gradient block">One Bite.</span>
          </>
        }
      />

      {/* FAQ */}
      <section className="bg-gradient-to-b from-[#1c5a24] via-[#0b2410] to-black py-20">
        <Container>
          <h2 className="display text-5xl sm:text-6xl">Frequently Asked Questions</h2>
          <p className="mb-10 mt-3 text-lg text-white/85">Join us for authentic Jamaican flavors and an atmosphere you won&apos;t forget.</p>
          <Faq items={aboutFaqs} />
        </Container>
      </section>
    </>
  );
}
