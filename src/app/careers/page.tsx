import type { Metadata } from "next";
import { InquiryForm } from "@/components/inquiry-form";
import { Container, PageHero } from "@/components/ui";
import { locations } from "@/data/site";

export const metadata: Metadata = {
  title: "Careers",
  description: "Join the Jerk at Nite family. See open roles in our kitchens and front of house.",
};

const perks = [
  { title: "Grow with us", text: "Four cities and counting — there's room to move up." },
  { title: "Real food", text: "Fresh, Halal, no MSG. Cook food you're proud of." },
  { title: "Great vibes", text: "Late-night energy and a team that feels like family." },
];

const roles = ["Line Cook", "Prep Cook", "Cashier / Front of House", "Shift Lead", "Catering & Events"];

export default function CareersPage() {
  return (
    <>
      <PageHero eyebrow="Careers" top="Join the" accent="Jerk at Nite Family">
        We&apos;re always looking for people who love good food and good vibes.
      </PageHero>

      <Container className="grid gap-5 pb-16 sm:grid-cols-3">
        {perks.map((p) => (
          <div key={p.title} className="rounded-2xl border border-white/10 bg-ink-2 p-6">
            <h2 className="display text-3xl text-gradient">{p.title}</h2>
            <p className="mt-2 text-white/70">{p.text}</p>
          </div>
        ))}
      </Container>

      <Container className="pb-24">
        <h2 className="display mb-6 text-4xl">Apply <span className="text-gradient">now</span></h2>
        <InquiryForm
          subject="Job application"
          submitLabel="Send Application"
          fields={[
            { name: "name", label: "Full name", required: true },
            { name: "email", label: "Email", type: "email", required: true },
            { name: "phone", label: "Phone", type: "tel", required: true },
            { name: "role", label: "Position", options: roles, required: true },
            { name: "location", label: "Location", options: locations.filter((l) => !l.comingSoon).map((l) => l.city), required: true },
            { name: "about", label: "Tell us about your experience", textarea: true },
          ]}
        />
      </Container>
    </>
  );
}
