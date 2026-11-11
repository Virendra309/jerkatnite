import type { Metadata } from "next";
import { InquiryForm } from "@/components/inquiry-form";
import { Container, Faq, PageHero } from "@/components/ui";
import { locations, site, socials } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with Jerk at Nite for questions, catering and private events.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero top="Get in" accent="Touch">
        Questions, feedback, catering or events — we&apos;d love to hear from you.
      </PageHero>

      <Container className="grid gap-10 pb-16 lg:grid-cols-[1fr_2fr]">
        <aside className="space-y-6">
          <div>
            <h2 className="display text-2xl text-gradient">Phone</h2>
            <a href={site.phoneHref} className="text-lg hover:text-gold">{site.phone}</a>
          </div>
          <div>
            <h2 className="display text-2xl text-gradient">Email</h2>
            <a href={`mailto:${site.email}`} className="text-lg hover:text-gold">{site.email}</a>
          </div>
          <div>
            <h2 className="display text-2xl text-gradient">Baltimore HQ</h2>
            <p className="text-lg">{locations[0].address}</p>
          </div>
          <div>
            <h2 className="display text-2xl text-gradient">Follow</h2>
            <ul className="mt-1 flex flex-wrap gap-3">
              {socials.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className="rounded-full border border-white/20 px-4 py-2 text-sm font-semibold hover:border-gold hover:text-gold">{s.label}</a>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <InquiryForm
          subject="Website inquiry"
          submitLabel="Send Message"
          fields={[
            { name: "name", label: "Full name", required: true },
            { name: "email", label: "Email", type: "email", required: true },
            { name: "phone", label: "Phone", type: "tel" },
            { name: "topic", label: "Topic", options: ["General question", "Catering", "Private event", "Feedback", "Careers"], required: true },
            { name: "message", label: "Message", textarea: true, required: true },
          ]}
        />
      </Container>

      <Container className="pb-24">
        <h2 className="display mb-8 text-4xl">Frequently Asked <span className="text-gradient">Questions</span></h2>
        <Faq />
      </Container>
    </>
  );
}
