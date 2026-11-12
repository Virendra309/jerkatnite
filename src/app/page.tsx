import Image from "next/image";
import Link from "next/link";
import { OrderButton } from "@/components/order";
import { CapturedMoments } from "@/components/home/captured-moments";
import { CateringSlider } from "@/components/home/catering-slider";
import { Reserve } from "@/components/home/reserve";
import { ReviewsMarquee } from "@/components/home/reviews-marquee";
import { SocialPresence } from "@/components/home/social-presence";
import { PressStrip } from "@/components/press-strip";
import { ButtonLink, Container, Faq, Heading, LocationTiles, OrderTicker } from "@/components/ui";
import { images, locations, site } from "@/data/site";

const features = [
  { title: "Food Menu", text: "Bold Jamaican flavors, made fresh daily. All Halal, no MSG.", img: images.tacos, alt: "Jerk at Nite tacos", href: "/menu", cta: "Explore Our Menu", tilt: "-rotate-2" },
  { title: "Order Online", text: "Pickup or delivery from a location near you with DoorDash, Grubhub, Uber Eats or Toast.", img: images.wings, alt: "Jerk at Nite chicken wings", href: null, cta: "Order Now", tilt: "rotate-1" },
  { title: "Private Events", text: "Birthdays, corporate dinners, group gatherings. We handle the food and the vibes.", img: images.restaurant, alt: "Jerk at Nite restaurant", href: "/private-events", cta: "Plan Your Event", tilt: "-rotate-1" },
  { title: "Catering", text: "Fresh Jamaican trays brought straight to your event. Bold flavor, generous portions.", img: images.catering, alt: "Jerk at Nite catering trays", href: "/catering", cta: "Request Catering", tilt: "rotate-2" },
];

export default function Home() {
  const openCount = locations.filter((l) => !l.comingSoon).length;

  return (
    <>
      {/* Hero */}
      <section className="relative isolate flex min-h-[92vh] items-center overflow-hidden pt-24">
        <div aria-hidden className="absolute inset-0 -z-10">
          <iframe
            src={site.heroVideo}
            title="Jerk at Nite brand video"
            allow="autoplay; fullscreen; picture-in-picture"
            tabIndex={-1}
            className="pointer-events-none absolute left-1/2 top-1/2 h-[56.25vw] min-h-full w-[177.78vh] min-w-full -translate-x-1/2 -translate-y-1/2"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/60 to-ink" />
        </div>
        <Container className="animate-rise text-center">
          <h1 className="display text-5xl sm:text-7xl lg:text-8xl">
            {site.tagline}
            <span className="text-gradient mt-2 block">The Ultimate Jamaican Experience.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/80">
            Authentic jerk flavors infused with bold Caribbean spices that deliver the true taste of Jamaica in every bite. Rich,
            smoky and unforgettable — where great food, vibrant nights and lasting memories come alive after dark.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <OrderButton />
            <ButtonLink href="/menu" variant="ghost">View Menu</ButtonLink>
          </div>
          <p className="mt-8 text-sm font-semibold uppercase tracking-widest text-white/60">100% Halal · No MSG · Made fresh daily</p>
        </Container>
      </section>

      {/* Feature cards */}
      <section className="py-20">
        <Container className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <article key={f.title} className={`${f.tilt} rounded-2xl bg-gradient-to-b from-leaf/60 to-transparent p-px transition hover:rotate-0`}>
              <div className="flex h-full flex-col rounded-2xl bg-ink-2 p-4">
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                  <Image src={f.img} alt={f.alt} fill sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" className="object-cover" />
                </div>
                <h2 className="display mt-5 text-3xl">{f.title}</h2>
                <p className="mt-2 flex-1 text-white/70">{f.text}</p>
                <div className="mt-5">
                  {f.href ? <ButtonLink href={f.href} variant="ghost">{f.cta} ↗</ButtonLink> : <OrderButton variant="ghost">{f.cta} ↗</OrderButton>}
                </div>
              </div>
            </article>
          ))}
        </Container>
      </section>

      <PressStrip />

      {/* About */}
      <section className="py-24">
        <Container className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <Heading top="Who we are." accent="Jerk at Nite" />
            <p className="mt-6 text-white/75">
              The founder started selling his flavorful Jamaican jerk chicken from his dorm room in Drew Hall at Howard University in
              2012. After 10pm the campus cafeteria closed, and students studying late were left with greasy fast food. Raised in a
              Jamaican household on three wholesome meals a day, he set out to change that.
            </p>
            <p className="mt-4 text-white/75">
              Today the brand serves healthy, affordable Jamaican, Mexican and American soul food with an emphasis on fusion — all
              Halal, free of MSG and preservatives. Expect signature jerk chicken, oxtail, jammin&apos; salmon and much more.
            </p>
            <div className="mt-8"><ButtonLink href="/about" variant="ghost">Our Story</ButtonLink></div>
          </div>
          <Image src={images.about} alt="Jerk at Nite signature dishes" width={982} height={1024} sizes="(min-width: 1024px) 50vw, 100vw" className="mx-auto w-full max-w-lg" />
        </Container>
      </section>

      <OrderTicker />

      {/* Locations */}
      <section className="pt-24">
        <Container>
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-gold">Find us</p>
              <Heading top={`We are located in ${openCount}`} accent="Different Areas" />
            </div>
            <div className="flex items-center gap-4">
              <p className="hidden text-sm text-white/60 sm:block">
                <span className="font-semibold text-white">{openCount}</span> open ·{" "}
                <span className="font-semibold text-white">{locations.length - openCount}</span> coming soon
              </p>
              <ButtonLink href="/locations" variant="ghost">All Locations</ButtonLink>
            </div>
          </div>
        </Container>
        {/* full-width row of square photo tiles */}
        <LocationTiles />
      </section>

      <CapturedMoments />

      {/* Private events */}
      <section className="relative overflow-hidden bg-black py-24">
        {/* decorative sparkles */}
        <Image src={images.star} alt="" width={83} height={83} aria-hidden className="pointer-events-none absolute left-4 top-16 w-16 opacity-30 blur-[1px] sm:left-8" />
        <svg aria-hidden viewBox="0 0 24 24" className="pointer-events-none absolute bottom-10 left-6 size-14 text-[#8dff3a] sm:left-10">
          <path d="M12 2v20M2 12h20M4.9 4.9l14.2 14.2M19.1 4.9 4.9 19.1" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" />
        </svg>
        <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 size-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-leaf/10 blur-3xl" />

        <Container className="relative grid items-center gap-12 lg:grid-cols-2">
          <Image
            src={images.events}
            alt="Guests celebrating a birthday party at Jerk at Nite"
            width={1014}
            height={1024}
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="mx-auto w-full max-w-lg transition-transform duration-700 hover:-rotate-1 hover:scale-[1.02]"
          />
          <div>
            <h2 className="display text-5xl sm:text-7xl">
              <span className="text-gradient block">Private Events</span>
              <span className="flex items-center gap-3">
                at Jerkatnite
                <Image src={images.eventThumb} alt="" width={94} height={70} aria-hidden className="h-12 w-auto rounded border-2 border-white sm:h-14" />
              </span>
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-white/85">
              From intimate birthday dinners to full-scale corporate mixers, the Jerk at Nite experience is the perfect setting for your
              next occasion. Bold Jamaican food, an unforgettable atmosphere, and a team that makes sure every event runs smoothly. A
              private room is also available for special events.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/private-events" className="btn-primary rounded-[4px] px-5 py-2.5 font-semibold shadow-none">
                Plan Your Booking
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-[4px] bg-white px-5 py-2.5 font-semibold text-black transition hover:-translate-y-0.5 hover:bg-gold"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <ReviewsMarquee />

      {/* Catering */}
      <section className="bg-gradient-to-b from-[#1c5a24] via-[#0b2410] to-black py-24">
        <Container className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <h2 className="display text-5xl sm:text-7xl">
              <span className="text-gradient block">Catering Services</span>
              <span className="block">at Jerkatnite</span>
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/90">
              Bring the authentic flavors of Jerkatnite to your home or office. Our team specializes in fresh, beautifully presented food
              prepared daily for any size gathering.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/catering" className="btn-primary rounded-[4px] px-5 py-2.5 font-semibold shadow-none">
                Request Catering Service
              </Link>
              <Link
                href="/catering"
                className="inline-flex items-center justify-center rounded-[4px] bg-white px-5 py-2.5 font-semibold text-black transition hover:-translate-y-0.5 hover:bg-gold"
              >
                View Catering Menu
              </Link>
            </div>
          </div>
          <CateringSlider
            slides={[
              { src: images.catering1, alt: "Jerk chicken plate with rice and peas" },
              { src: images.catering2, alt: "Jerk wings" },
              { src: images.catering3, alt: "Dessert" },
            ]}
          />
        </Container>
      </section>

      <OrderTicker />

      <SocialPresence />

      <Reserve />

      {/* FAQ */}
      <section className="bg-gradient-to-b from-[#1c5a24] via-[#0b2410] to-black py-20">
        <Container>
          <h2 className="display text-5xl sm:text-6xl">Frequently Asked Questions</h2>
          <p className="mb-10 mt-3 text-lg text-white/85">Join us for authentic Jamaican flavors and an atmosphere you won&apos;t forget.</p>
          <Faq />
        </Container>
      </section>
    </>
  );
}
