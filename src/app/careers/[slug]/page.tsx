import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ApplicationForm } from "@/components/application-form";
import { Container } from "@/components/ui";
import { jobs } from "@/data/jobs";
import { locations } from "@/data/site";

export async function generateStaticParams() {
  return jobs.map((j) => ({ slug: j.slug }));
}

export async function generateMetadata({ params }: PageProps<"/careers/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const job = jobs.find((j) => j.slug === slug);
  return job ? { title: `${job.title} | Careers`, description: job.text } : {};
}

type Params = PageProps<"/careers/[slug]">["params"];
const applyLocations = locations.map((l) => l.city);
const roles = jobs.map((j) => j.title);

async function JobDetails({ params }: { params: Params }) {
  const { slug } = await params;
  const job = jobs.find((j) => j.slug === slug);
  if (!job) notFound();
  return (
    <>
      <section className="relative isolate flex min-h-[55vh] items-center justify-center overflow-hidden pb-16 pt-32 text-center">
        <Image src="/images/locations/reel-baltimore-hq.jpg" alt="" fill priority sizes="100vw" className="-z-20 object-cover object-[center_35%]" />
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-black/65 via-black/60 to-black" />
        <Container className="animate-rise">
          <nav aria-label="Breadcrumb" className="mx-auto inline-flex items-center gap-3 rounded-full bg-black/50 px-6 py-2 backdrop-blur-sm">
            <Link href="/" className="text-white hover:text-gold">
              Home
            </Link>
            <span aria-hidden className="text-white">›</span>
            <Link href="/careers" className="text-gold hover:underline">
              Careers
            </Link>
          </nav>
          <h1 className="display mt-5 text-5xl sm:text-7xl">{job.title}</h1>
          <p className="mx-auto mt-4 max-w-4xl text-lg text-white/90">{job.text}</p>
        </Container>
      </section>

      <section className="bg-black pb-20 pt-12">
        <Container>
          <h2 className="text-lg font-semibold">What this person does:</h2>
          <ul className="mt-6 list-disc space-y-1.5 pl-14 text-lg text-white/90 marker:text-white">
            {job.duties.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>
          <p className="mt-8 text-lg italic text-white/90">Available at: {job.location}</p>
          <div className="mt-16">
            <ApplicationForm role={job.title} roles={roles} locations={applyLocations} />
          </div>
        </Container>
      </section>
    </>
  );
}

export default function JobPage({ params }: PageProps<"/careers/[slug]">) {
  return (
    <Suspense fallback={<section aria-hidden className="min-h-[90vh] bg-black" />}>
      <JobDetails params={params} />
    </Suspense>
  );
}
