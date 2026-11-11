import type { Metadata } from "next";
import Image from "next/image";
import { InquiryForm } from "@/components/inquiry-form";
import { Container, PageHero } from "@/components/ui";
import { images, locations } from "@/data/site";

export const metadata: Metadata = {
  title: "Catering",
  description: "Fresh Jamaican catering trays for offices, weddings and every gathering. Halal, no MSG, generous portions.",
};

const options = [
  { title: "Half & Full Trays", text: "Jerk chicken, oxtail, rasta pasta, rice & peas and more — sized for your crowd." },
  { title: "Office Lunches", text: "Reliable, on-time drop-off for teams of any size." },
  { title: "Weddings & Celebrations", text: "Beautifully presented spreads for the big day." },
  { title: "Custom Menus", text: "Tell us your event and we'll build the perfect menu." },
];

export default function CateringPage() {
  return (
    <>
      <PageHero eyebrow="Catering" top="Bold flavor," accent="Generous Portions">
        Bring the authentic flavors of Jerk at Nite to your home or office. Fresh, beautifully presented food prepared daily for any
        size gathering.
      </PageHero>

      <Container className="grid gap-5 pb-16 sm:grid-cols-3">
        {[images.catering1, images.catering2, images.catering3].map((src, i) => (
          <div key={src} className="relative aspect-[3/2] overflow-hidden rounded-2xl">
            <Image src={src} alt={`Catering spread ${i + 1}`} fill sizes="(min-width: 640px) 33vw, 100vw" className="object-cover" />
          </div>
        ))}
      </Container>

      <Container className="grid gap-5 pb-16 sm:grid-cols-2 lg:grid-cols-4">
        {options.map((o) => (
          <div key={o.title} className="rounded-2xl border-l-4 border-gold bg-ink-2 p-6">
            <h2 className="display text-2xl">{o.title}</h2>
            <p className="mt-2 text-white/70">{o.text}</p>
          </div>
        ))}
      </Container>

      <Container className="pb-24">
        <h2 className="display mb-6 text-4xl">Request <span className="text-gradient">Catering</span></h2>
        <InquiryForm
          subject="Catering request"
          submitLabel="Request Catering"
          fields={[
            { name: "name", label: "Full name", required: true },
            { name: "email", label: "Email", type: "email", required: true },
            { name: "phone", label: "Phone", type: "tel", required: true },
            { name: "date", label: "Event date", type: "date", required: true },
            { name: "guests", label: "Number of guests", type: "number", required: true },
            { name: "location", label: "Nearest location", options: locations.filter((l) => !l.comingSoon).map((l) => l.city), required: true },
            { name: "details", label: "What would you like on the menu?", textarea: true },
          ]}
        />
      </Container>
    </>
  );
}
