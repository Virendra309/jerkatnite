import Image from "next/image";
import Link from "next/link";
import { OrderButton } from "@/components/order";
import { ButtonLink, Container, Faq, Heading, LocationGrid, Marquee, OrderTicker } from "@/components/ui";
import { images, locations, press, reviews, site, socials } from "@/data/site";

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

      {/* Press */}
      <section aria-labelledby="press" className="border-y border-white/10 py-10">
        <Container>
          <h2 id="press" className="display text-center text-3xl">As Featured <span className="text-gradient">or Seen In</span></h2>
        </Container>
        <Marquee items={press} className="mt-6 text-2xl font-bold text-white/50" />
      </section>

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
      <section className="py-24">
        <Container>
          <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
            <Heading top={`We are located in ${openCount}`} accent="Different Areas" />
            <ButtonLink href="/locations" variant="ghost">All Locations</ButtonLink>
          </div>
          <LocationGrid />
        </Container>
      </section>

      {/* QR / order */}
      <section className="py-12">
        <Container>
          <div className="grid items-center gap-8 rounded-3xl border border-white/10 bg-gradient-to-br from-ink-3 to-ink-2 p-8 sm:grid-cols-[auto_1fr] sm:p-12">
            <Image src={images.qr} alt="QR code linking to the Jerk at Nite menu" width={165} height={166} className="rounded-xl bg-white p-2" />
            <div>
              <h2 className="display text-4xl sm:text-5xl"><span className="text-gradient">Scan the QR code</span> and order your favorite food now!</h2>
              <p className="mt-3 text-white/70">A diverse menu of flavorful Jamaican and Caribbean dishes.</p>
              <div className="mt-6"><OrderButton /></div>
            </div>
          </div>
        </Container>
      </section>

      {/* Private events teaser */}
      <section className="py-24">
        <Container className="grid items-center gap-12 lg:grid-cols-2">
          <Image src={images.events} alt="Private event at Jerk at Nite" width={1014} height={1024} sizes="(min-width: 1024px) 50vw, 100vw" className="mx-auto w-full max-w-lg" />
          <div>
            <Heading top="Private Events" accent="at Jerk at Nite" />
            <p className="mt-6 text-white/75">
              From intimate birthday dinners to full-scale corporate mixers, the Jerk at Nite experience is the perfect setting for
              your next occasion. A private room is available for special events.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <ButtonLink href="/private-events">Plan Your Booking</ButtonLink>
              <ButtonLink href="/contact" variant="ghost">Contact Us</ButtonLink>
            </div>
          </div>
        </Container>
      </section>

      {/* Reviews */}
      <section className="bg-ink-2 py-24">
        <Container>
          <Heading top="What people are saying about" accent="Jerk at Nite" />
          <ul className="mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4">
            {reviews.map((r) => (
              <li key={r} className="flex min-h-80 w-[85%] shrink-0 snap-start flex-col justify-between rounded-2xl border border-white/10 bg-gradient-to-b from-ink-3 to-ink p-6 sm:w-[45%] lg:w-[31%]">
                <span aria-hidden className="display text-7xl text-gradient">“</span>
                <blockquote className="display text-2xl leading-tight sm:text-3xl">{r}</blockquote>
                <p aria-label="5 out of 5 stars" className="mt-6 text-gold">★★★★★</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Catering teaser */}
      <section className="py-24">
        <Container className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <Heading top="Catering Services" accent="at Jerk at Nite" />
            <p className="mt-6 text-white/75">
              Bring the authentic flavors of Jerk at Nite to your home or office. Fresh, beautifully presented food prepared daily
              for any size gathering.
            </p>
            <div className="mt-8"><ButtonLink href="/catering">Request Catering</ButtonLink></div>
          </div>
          <div className="relative aspect-[3/2] overflow-hidden rounded-3xl">
            <Image src={images.catering1} alt="Catering trays of Jamaican food" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
          </div>
        </Container>
      </section>

      <OrderTicker />

      {/* Socials */}
      <section className="py-24">
        <Container>
          <Heading top="Our noticeable" accent="Social Presence" />
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {socials.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" className="block rounded-2xl border border-white/10 bg-ink-2 p-6 transition hover:-translate-y-1 hover:border-leaf/60">
                  <p className="text-white/70">{s.label} · @jerkatnite</p>
                  <p className="display mt-3 text-5xl text-gradient">{s.followers}</p>
                  <p className="text-white/70">Followers</p>
                </a>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Reservations */}
      <section className="bg-gradient-to-b from-ink to-ink-3 py-24 text-center">
        <Container>
          <p className="font-semibold uppercase tracking-widest text-gold">Baltimore location only</p>
          <h2 className="display mx-auto mt-4 max-w-4xl text-5xl sm:text-6xl">
            Reserve your seat for an <span className="text-gradient">authentic Jamaican experience</span>
          </h2>
          <div className="mt-8"><ButtonLink href={site.openTable} external>Reserve with OpenTable</ButtonLink></div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="py-24">
        <Container>
          <Heading top="Frequently Asked" accent="Questions" className="mb-10" />
          <Faq />
          <p className="mt-8 text-white/70">
            Still have a question? <Link href="/contact" className="font-semibold text-gold underline">Get in touch</Link>.
          </p>
        </Container>
      </section>
    </>
  );
}
