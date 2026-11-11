import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { OrderButton } from "@/components/order";
import { ButtonLink, Container, PageHero } from "@/components/ui";
import { days, locations, site } from "@/data/site";

export async function generateStaticParams() {
  return locations.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: PageProps<"/locations/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const loc = locations.find((l) => l.slug === slug);
  return loc ? { title: `${loc.city} Location`, description: `Jerk at Nite ${loc.city}: address, hours and online ordering.` } : {};
}

export default async function LocationPage({ params }: PageProps<"/locations/[slug]">) {
  const { slug } = await params;
  const loc = locations.find((l) => l.slug === slug);
  if (!loc) notFound();

  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(loc.mapsQuery)}&output=embed`;

  return (
    <>
      <PageHero eyebrow={loc.comingSoon ? "Coming soon" : "Jerk at Nite"} accent={loc.city}>
        {loc.address ?? "We're bringing the island vibes here soon. Follow us on social for opening news."}
      </PageHero>

      <Container className="grid gap-10 pb-24 lg:grid-cols-2">
        <div className="space-y-8">
          {loc.hours && (
            <section aria-labelledby="hours" className="rounded-2xl border border-white/10 bg-ink-2 p-6">
              <h2 id="hours" className="display text-3xl">Hours</h2>
              <dl className="mt-4 divide-y divide-white/10">
                {loc.hours.map((h, i) => (
                  <div key={days[i]} className="flex justify-between py-2">
                    <dt className="font-semibold">{days[i]}</dt>
                    <dd className={h ? "text-white/80" : "text-white/45"}>{h ?? "Closed"}</dd>
                  </div>
                ))}
              </dl>
            </section>
          )}
          <div className="flex flex-wrap gap-4">
            {!loc.comingSoon && <OrderButton />}
            {loc.reservations && <ButtonLink href={site.openTable} external variant="ghost">Reserve with OpenTable</ButtonLink>}
            <ButtonLink href="/locations" variant="ghost">All Locations</ButtonLink>
          </div>
        </div>

        <iframe
          src={mapSrc}
          title={`Map of Jerk at Nite ${loc.city}`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="min-h-96 w-full rounded-2xl border border-white/10"
        />
      </Container>
    </>
  );
}
