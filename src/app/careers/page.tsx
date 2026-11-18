import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui";
import { jobs } from "@/data/jobs";

export const metadata: Metadata = {
  title: "Careers",
  description: "Join the Jerk at Nite family. Open roles: Kitchen Manager, Server, Hostess, Host and Food Truck Support.",
};

export default function CareersPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative isolate flex min-h-[50vh] items-center justify-center overflow-hidden pb-16 pt-32 text-center">
        <Image
          src="/images/locations/detroit-storefront.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="animate-ken-burns -z-20 scale-150 object-cover object-[40%_25%]"
        />
        <div aria-hidden className="absolute inset-0 -z-10 bg-black/60" />
        <Container className="animate-rise">
          <nav aria-label="Breadcrumb" className="mx-auto inline-flex items-center gap-3 rounded-full bg-black/50 px-6 py-2 backdrop-blur-sm">
            <Link href="/" className="text-white hover:text-gold">
              Home
            </Link>
            <span aria-hidden className="text-white">›</span>
            <span aria-current="page" className="text-gold">Careers</span>
          </nav>
          <h1 className="display mt-5 text-5xl sm:text-7xl">
            Join the <span className="text-gradient">Jerk at Nite Family</span>
          </h1>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-white/90">
            We are always looking for bold, passionate people to join our high-energy team. Bring your flavor and help us serve the
            community.
          </p>
        </Container>
      </section>

      {/* Jobs */}
      <section className="bg-black pb-24 pt-16">
        <Container className="max-w-5xl">
          <h2 className="display mb-8 text-center text-5xl sm:text-6xl">
            Explore <span className="text-gradient">Jerk at Nite Jobs</span>
          </h2>
          <ul className="space-y-6">
            {jobs.map((j) => (
              <li key={j.slug} className="rounded-lg border border-[#1f4d26] bg-black p-5 transition-colors hover:border-[#5ee26f]/70 sm:p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="max-w-3xl">
                    <h3 className="display text-2xl normal-case">
                      <Link href={`/careers/${j.slug}`} className="hover:text-gold">
                        {j.title}
                      </Link>
                    </h3>
                    <p className="mt-4 text-lg text-white/90">{j.text}</p>
                  </div>
                  <Link
                    href={`/careers/${j.slug}`}
                    aria-label={`Apply Now: ${j.title}`}
                    className="btn-primary order-last shrink-0 self-start rounded-md px-6 py-3 text-lg font-semibold shadow-none sm:order-none"
                  >
                    Apply Now
                  </Link>
                </div>
                <dl className="mt-4 grid gap-2 sm:grid-cols-[minmax(0,12rem)_minmax(0,14rem)_1fr] sm:gap-6">
                  <div className="flex gap-2">
                    <dt className="font-semibold">Experience:</dt>
                    <dd className="text-white/85">{j.experience}</dd>
                  </div>
                  <div className="flex gap-2">
                    <dt className="shrink-0 font-semibold">Job Type:</dt>
                    <dd className="text-white/85">{j.type}</dd>
                  </div>
                  <div className="flex gap-2">
                    <dt className="font-semibold">Location:</dt>
                    <dd className="text-white/85">{j.location}</dd>
                  </div>
                </dl>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}
