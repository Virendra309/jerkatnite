import type { Metadata } from "next";
import Image from "next/image";
import { InquiryForm } from "@/components/inquiry-form";
import { Container, PageHero } from "@/components/ui";
import { images, locations } from "@/data/site";

export const metadata: Metadata = {
  title: "Private Events",
  description: "Host birthdays, corporate mixers, sports events and more at Jerk at Nite. Private room available.",
};

const occasions = ["Birthdays", "Corporate mixers", "Sports events", "Weddings", "Celebrity gatherings", "Group dinners"];

export default function PrivateEventsPage() {
  return (
    <>
      <PageHero eyebrow="Private Events" top="Celebrate" accent="at Jerk at Nite">
        From intimate birthday dinners to full-scale corporate mixers — bold Jamaican food, an unforgettable atmosphere, and a team
        that makes sure every event runs smoothly.
      </PageHero>

      <Container className="grid items-center gap-12 pb-16 lg:grid-cols-2">
        <Image src={images.events} alt="Guests at a Jerk at Nite private event" width={1014} height={1024} sizes="(min-width: 1024px) 50vw, 100vw" className="mx-auto w-full max-w-md" />
        <div>
          <h2 className="display text-4xl">We host <span className="text-gradient">every occasion</span></h2>
          <ul className="mt-6 grid grid-cols-2 gap-3">
            {occasions.map((o) => (
              <li key={o} className="rounded-xl border border-white/10 bg-ink-2 px-4 py-3 font-semibold">{o}</li>
            ))}
          </ul>
          <p className="mt-6 text-white/70">A private room is available for special events.</p>
        </div>
      </Container>

      <Container className="pb-24">
        <h2 className="display mb-6 text-4xl">Plan your <span className="text-gradient">booking</span></h2>
        <InquiryForm
          subject="Private event inquiry"
          fields={[
            { name: "name", label: "Full name", required: true },
            { name: "email", label: "Email", type: "email", required: true },
            { name: "phone", label: "Phone", type: "tel", required: true },
            { name: "type", label: "Event type", options: occasions, required: true },
            { name: "date", label: "Preferred date", type: "date", required: true },
            { name: "guests", label: "Number of guests", type: "number", required: true },
            { name: "location", label: "Location", options: locations.filter((l) => !l.comingSoon).map((l) => l.city), required: true },
            { name: "details", label: "Tell us about your event", textarea: true },
          ]}
        />
      </Container>
    </>
  );
}
