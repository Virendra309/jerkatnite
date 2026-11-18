import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { JobList, type Job } from "@/components/job-list";
import { Container } from "@/components/ui";
import { locations } from "@/data/site";

export const metadata: Metadata = {
  title: "Careers",
  description: "Join the Jerk at Nite family. Open roles: Kitchen Manager, Server, Hostess, Host and Food Truck Support.",
};

const allLocations = "Baltimore MD, Washington DC, Houston TX & Detroit MI";

const jobs: Job[] = [
  {
    title: "Kitchen Manager",
    text: "The Kitchen Manager runs the kitchen during service. They make sure every dish meets Jerk at Nite's standard of bold, fresh, consistent food.",
    experience: "5+ Years",
    type: "Full Time",
    location: allLocations,
  },
  {
    title: "Server",
    text: "Servers take care of guests from the moment they sit down to the moment they leave. They know the Jerk at Nite menu inside and out.",
    experience: "5+ Years",
    type: "Full Time | Part Time",
    location: allLocations,
  },
  {
    title: "Hostess",
    text: "Same role as Host. The Hostess is the face of Jerk at Nite and creates a great first impression for every single guest who walks in.",
    experience: "5+ Years",
    type: "Full Time",
    location: allLocations,
  },
  {
    title: "Host",
    text: "The Host is the first person guests see when they walk in. They set the tone for the whole dining experience and make sure every guest feels welcome.",
    experience: "5+ Years",
    type: "Full Time | Part Time",
    location: allLocations,
  },
  {
    title: "Food Truck Support",
    text: "Food Truck Support staff keep the Jerk at Nite food trucks running smoothly. They work directly on the truck during events and service hours.",
    experience: "5+ Years",
    type: "Full Time | Part Time | Weekends",
    location: allLocations,
  },
];

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
          <JobList jobs={jobs} locations={locations.map((l) => (l.comingSoon ? `${l.city} (coming soon)` : l.city))} />
        </Container>
      </section>
    </>
  );
}
