import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { FeatureCards } from "@/components/feature-cards";
import { CapturedMoments } from "@/components/home/captured-moments";
import { DeliveryBanner } from "@/components/home/delivery-banner";
import { PrivateEventsTeaser } from "@/components/home/private-events-teaser";
import { Reserve } from "@/components/home/reserve";
import { SocialReels } from "@/components/home/social-reels";
import { OrderButton } from "@/components/order";
import { Container, Faq, OrderTicker } from "@/components/ui";
import { locationPages } from "@/data/location-pages";
import { days, images, locations, site, type Location } from "@/data/site";

export async function generateStaticParams() {
  return locations.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: PageProps<"/locations/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const loc = locations.find((l) => l.slug === slug);
  if (!loc) return {};
  return {
    title: loc.comingSoon ? `${loc.city} (Coming Soon)` : `Jamaican Restaurant in ${loc.city}`,
    description: locationPages[slug]?.intro.replace("{address}", loc.address ?? loc.city),
  };
}

const mapsUrl = (loc: Location) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`Jerk at Nite ${loc.mapsQuery}`)}`;

/** Hero paragraph with the "{address}" placeholder turned into a map link. */
function Intro({ loc, text }: { loc: Location; text: string }) {
  const [before, after] = text.split("{address}");
  return (
    <>
      {before}
      {after !== undefined && (
        <>
          <a href={mapsUrl(loc)} target="_blank" rel="noopener noreferrer" className="text-[#9be564] underline underline-offset-2 hover:text-gold">
            {loc.address}
          </a>
          {after}
        </>
      )}
    </>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4 shrink-0" fill="currentColor" aria-hidden>
      <path d="M6.6 10.8a15.2 15.2 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1z" />
    </svg>
  );
}

/** Map + address + phone + weekly hours in a glowing green card. */
function AddressTiming({ loc, title = "Address & Timing" }: { loc: Location; title?: string }) {
  // Monday-first, split in two columns like the live site.
  const order = [[1, 2, 3, 4], [5, 6, 0]];
  return (
    <section className="bg-gradient-to-b from-[#1c5a24] via-[#0b2410] to-black py-16">
      <Container>
        <div className="rounded-2xl border border-[#c6f135]/70 bg-gradient-to-b from-[#123d19] to-black px-5 py-10 shadow-[0_0_40px_rgba(198,241,53,0.25)] sm:px-10">
          <h2 className="display text-gradient text-center text-5xl sm:text-6xl">{title}</h2>
          <p className="mx-auto mt-4 max-w-3xl text-center text-white/85">
            Find us at a convenient location with easy access, and drop by at a time that suits you. We&apos;re open with flexible hours, ready to serve
            bold flavors whenever you&apos;re craving them.
          </p>

          <div className="mt-10 grid items-center gap-8 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
            <div className="relative overflow-hidden rounded-xl border border-white/15 bg-white">
              <iframe
                src={`https://www.google.com/maps?q=${encodeURIComponent(loc.mapsQuery)}&z=11&output=embed`}
                title={`Map of Jerk at Nite ${loc.city}`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="block aspect-[4/3] w-full"
              />
              <a
                href={mapsUrl(loc)}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute left-2 top-2 rounded bg-white px-2.5 py-1 text-xs font-semibold text-[#1a73e8] shadow hover:bg-gray-100"
              >
                Open in Maps ↗
              </a>
            </div>

            <div>
              <p className="text-sm font-semibold text-white">{loc.short} location:</p>
              {loc.address ? (
                <a href={mapsUrl(loc)} target="_blank" rel="noopener noreferrer" className="mt-1 inline-block text-lg text-gold hover:underline">
                  {loc.address}
                </a>
              ) : (
                <p className="mt-1 text-lg text-gold">Coming soon</p>
              )}
              {loc.phone && (
                <a href={`tel:${loc.phone.replace(/[^\d+]/g, "")}`} className="mt-3 flex items-center gap-2 text-white/90 hover:text-gold">
                  <PhoneIcon />
                  {loc.phone}
                </a>
              )}

              <h3 className="display mt-6 text-3xl text-gold">Open Timing:</h3>
              {loc.hours ? (
                <div className="mt-3 grid gap-x-10 gap-y-2 sm:grid-cols-2">
                  {order.map((col, c) => (
                    <dl key={c} className="grid grid-cols-[6.5rem_1rem_1fr] gap-y-2 text-[15px]">
                      {col.map((d) => (
                        <div key={d} className="contents">
                          <dt className="text-white">{days[d]}</dt>
                          <span aria-hidden className="text-white/70">:</span>
                          <dd className="text-gold">{loc.hours![d]?.replace("–", "-") ?? "Closed"}</dd>
                        </div>
                      ))}
                    </dl>
                  ))}
                </div>
              ) : (
                <p className="mt-3 text-white/85">Hours will be announced when we open.</p>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

type Params = PageProps<"/locations/[slug]">["params"];

async function resolve(params: Params) {
  const { slug } = await params;
  const loc = locations.find((l) => l.slug === slug);
  if (!loc) notFound();
  return { loc, page: locationPages[slug], name: loc.city.split(",")[0] };
}

async function Hero({ params }: { params: Params }) {
  const { loc, page, name } = await resolve(params);
  return (
    <section className="relative isolate flex min-h-[78vh] items-center justify-center overflow-hidden pb-16 pt-32 text-center">
      <Image src={loc.hq ? images.restaurant : loc.image} alt="" fill priority sizes="100vw" className="animate-ken-burns -z-20 object-cover" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-black/65 via-black/55 to-black" />
      <Container className="animate-rise">
        <nav aria-label="Breadcrumb" className="mx-auto inline-flex items-center gap-3 rounded-full bg-black/50 px-6 py-2 backdrop-blur-sm">
          <Link href="/" className="text-white hover:text-gold">
            Home
          </Link>
          <span aria-hidden className="text-white">›</span>
          <Link href="/locations" className="text-white hover:text-gold">
            Locations
          </Link>
          <span aria-hidden className="text-white">›</span>
          <span aria-current="page" className="text-gold">{page?.crumb ?? name}</span>
        </nav>
        <h1 className="display mx-auto mt-5 max-w-5xl text-5xl sm:text-7xl">
          {loc.comingSoon ? (
            <>Coming Soon to {loc.city}</>
          ) : page?.title ? (
            <>
              {page.title[0]} <span className="text-gradient">{page.title[1]}</span>
            </>
          ) : (
            <>Award-Winning Jamaican Restaurant in {loc.city}</>
          )}
        </h1>
        {page && (
          <p className="mx-auto mt-4 max-w-3xl text-lg text-white/90">
            <Intro loc={loc} text={page.intro} />
          </p>
        )}
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
  );
}

async function Arrival({ params }: { params: Params }) {
  const { loc, page, name } = await resolve(params);
  if (!page?.arrival) return null;
  return (
    <section className="bg-gradient-to-b from-black to-[#123d19] py-16">
      <Container className="grid items-center gap-10 md:grid-cols-2">
        <div
          className={`relative overflow-hidden ${
            page.arrival.portrait ? "mx-auto aspect-[510/676] w-full max-w-md rounded-md md:mx-0 md:justify-self-center" : "aspect-[4/3] rounded-xl rounded-tr-[4rem]"
          }`}
        >
          <Image
            src={page.arrival.image ?? (loc.hq ? images.restaurant : loc.image === images.wings ? images.tacos : images.wings)}
            alt={`Jerk at Nite ${loc.city}`}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover object-[30%_center]"
          />
        </div>
        <div>
          <h2 className="display text-5xl leading-[1.05] sm:text-6xl">
            Parking &amp; Arrival
            <br />
            at {page.accent ? <span className="text-gradient">{loc.city}</span> : name}
          </h2>
          <h3 className="mt-5 font-semibold text-gold">
            {page.arrival.parkingTitle ?? (
              <>
                Parking &amp; Arrival at {name}
                {loc.hq && " (HQ)"}
              </>
            )}
          </h3>
          <p className="mt-2 text-white/85">{page.arrival.parking}</p>
          <h3 className="mt-6 font-semibold text-gold">Getting Here</h3>
          <p className="mt-2 text-white/85">{page.arrival.gettingHere}</p>
        </div>
      </Container>
    </section>
  );
}

async function Timing({ params }: { params: Params }) {
  const { loc, page } = await resolve(params);
  return <AddressTiming loc={loc} title={page?.timingTitle} />;
}

async function Delivery({ params }: { params: Params }) {
  const { loc } = await resolve(params);
  return loc.comingSoon ? null : <DeliveryBanner />;
}

async function Reservations({ params }: { params: Params }) {
  const { loc } = await resolve(params);
  // shown on every open location, as on the live site (the banner itself says "Only for Baltimore Location")
  return !loc.comingSoon ? <Reserve image="/images/locations/reserved-bg.jpg" cta="Book Your Spot Now" href={site.googleReserve} overlay="bg-black/20" /> : null;
}

async function LocationFaq({ params }: { params: Params }) {
  const { page } = await resolve(params);
  if (!page) return null;
  return (
    <section className="bg-gradient-to-b from-[#1c5a24] via-[#0b2410] to-black py-20">
      <Container>
        <h2 className="display text-5xl sm:text-6xl">
          Frequently Asked {page.accent ? <span className="text-gradient">Questions</span> : "Questions"}
        </h2>
        <p className="mb-10 mt-3 text-lg text-white/85">Join us for authentic Jamaican flavors and an atmosphere you won&apos;t forget.</p>
        <Faq items={page.faqs} />
      </Container>
    </section>
  );
}

// Shared sections render straight away; the parts that depend on which city is in the URL stream in their own <Suspense>.
export default function LocationPage({ params }: PageProps<"/locations/[slug]">) {
  return (
    <>
      <Suspense fallback={<section aria-hidden className="min-h-[78vh] bg-black" />}>
        <Hero params={params} />
      </Suspense>
      <FeatureCards />
      <Suspense fallback={null}>
        <Arrival params={params} />
      </Suspense>
      <OrderTicker />
      <Suspense fallback={<section aria-hidden className="min-h-[560px] bg-gradient-to-b from-[#1c5a24] via-[#0b2410] to-black" />}>
        <Timing params={params} />
      </Suspense>
      <CapturedMoments />
      <SocialReels />
      <Suspense fallback={null}>
        <Delivery params={params} />
      </Suspense>
      <PrivateEventsTeaser />
      <Suspense fallback={null}>
        <Reservations params={params} />
        <LocationFaq params={params} />
      </Suspense>
    </>
  );
}
