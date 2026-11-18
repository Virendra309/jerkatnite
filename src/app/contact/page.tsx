import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { DeliveryBanner } from "@/components/home/delivery-banner";
import { InquiryForm } from "@/components/inquiry-form";
import { Container, Faq } from "@/components/ui";
import { images, locations, site } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Contact Jerk at Nite about our menu, catering, private events, partnerships or feedback. Baltimore HQ: 21 N Eutaw St.",
};

const open = locations.filter((l) => !l.comingSoon);
const hq = locations.find((l) => l.hq) ?? locations[0];
const tel = (p: string) => `tel:${p.replace(/[^\d+]/g, "")}`;

const contactFaqs = [
  { q: "How do I contact Jerk at Nite?", a: `Call ${site.phone}, email ${site.email}, or send us a message with the form on this page.` },
  { q: "What is the best way to ask about catering?", a: "Build your order on the Catering page and send it, or email us. Our team will follow up with a quote." },
  { q: "What is the fastest way to reach the Jerk at Nite team?", a: `Give us a call at ${site.phone} during opening hours.` },
  { q: "Can I contact the Jerk at Nite DC location directly?", a: "Our Washington DC location is coming soon. Until it opens, please reach out to the Baltimore HQ." },
  { q: "How do I make a table reservation?", a: "Reservations are available at our Baltimore (HQ) location through OpenTable. Other locations welcome walk-ins." },
  {
    q: "How far in advance should I contact Jerk at Nite for a private event?",
    a: "Please send your request at least 24 hours in advance. For larger events, the earlier the better.",
  },
  { q: "Can I give feedback or report an issue?", a: "Yes, please. Send us a message with the form on this page and our team will get back to you." },
  { q: "Can I submit a job application through the contact page?", a: "Please apply on our Careers page so your application goes straight to the right team." },
  { q: "Does Jerk at Nite have a YouTube channel?", a: "Find Jerk at Nite videos on YouTube by searching #jerkatnite, and follow us on Instagram and TikTok." },
  { q: "Does Jerk at Nite accept press and partnership inquiries?", a: "Yes. Send us the details with the form on this page and choose the location you're writing about." },
];

function PhoneLink({ phone }: { phone: string }) {
  return (
    <a href={tel(phone)} className="mt-4 inline-flex items-center gap-3 text-[#9be564] hover:text-gold">
      <span className="grid size-9 place-items-center rounded-full border border-white/15 bg-black text-[#9be564]">
        <svg viewBox="0 0 24 24" className="size-4" fill="currentColor" aria-hidden>
          <path d="M6.6 10.8a15.2 15.2 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1z" />
        </svg>
      </span>
      {phone}
    </a>
  );
}

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative isolate flex min-h-[55vh] items-center justify-center overflow-hidden pb-16 pt-32 text-center">
        <Image src={images.restaurant} alt="" fill priority sizes="100vw" className="animate-ken-burns -z-20 object-cover" />
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-black/65 via-black/60 to-black" />
        <Container className="animate-rise">
          <nav aria-label="Breadcrumb" className="mx-auto inline-flex items-center gap-3 rounded-full bg-black/50 px-6 py-2 backdrop-blur-sm">
            <Link href="/" className="text-white hover:text-gold">
              Home
            </Link>
            <span aria-hidden className="text-white">›</span>
            <span aria-current="page" className="text-gold">Contact Us</span>
          </nav>
          <h1 className="display mt-5 text-5xl sm:text-7xl">Contact Us Anytime!</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/90">
            Have questions or want to plan your visit? Contact us anytime, we&apos;re here to help and make your experience smooth, easy, and
            enjoyable.
          </p>
        </Container>
      </section>

      {/* Message card */}
      <section className="bg-black pb-12">
        <Container>
          <div className="grid gap-8 rounded-2xl border border-gold/90 bg-gradient-to-br from-black via-black to-[#123d19] p-5 sm:p-8 lg:grid-cols-[2fr_3fr]">
            <div>
              <h2 className="display text-5xl leading-[0.95] sm:text-6xl">
                Got Something
                <br />
                <span className="text-gradient">To Say?</span>
              </h2>
              <p className="mt-5 text-lg text-white/90">
                Have a question about our menu, interested in a partnership, or want to share your experience? We&apos;d love to hear from
                you.
              </p>
              <p className="mt-6 font-semibold">{hq.short} Location:</p>
              <p className="text-gradient mt-1 inline-block text-lg font-medium">{hq.address}</p>
              <ul className="mt-4 space-y-3 text-white/90">
                <li>
                  <a href={site.phoneHref} className="hover:text-gold">
                    📞 {site.phone}
                  </a>
                </li>
                <li>
                  <a href={`mailto:${site.email}`} className="hover:text-gold">
                    ✉️ {site.email}
                  </a>
                </li>
              </ul>
            </div>
            <InquiryForm
              subject="Website message"
              submitLabel="Submit"
              fields={[
                { name: "name", label: "Full Name", required: true },
                { name: "email", label: "Email", type: "email", required: true },
                { name: "phone", label: "Phone", type: "tel", required: true },
                { name: "location", label: "Location", options: open.map((l) => (l.hq ? `${l.city} (HQ)` : l.city)), required: true },
                { name: "message", label: "Message", textarea: true },
              ]}
            />
          </div>
        </Container>
      </section>

      {/* Location cards */}
      <section className="bg-black pb-10">
        <Container>
          <ul className="grid gap-5 md:grid-cols-3">
            {open.map((l) => {
              const [name, state] = l.city.split(",").map((x) => x.trim());
              return (
                <li key={l.slug} className="rounded-xl border border-white/20 bg-gradient-to-b from-[#2b2b2b] to-black px-5 pb-6 pt-5 text-center">
                  <h3 className="display text-3xl">
                    {name}
                    {l.hq ? <span className="text-[#5ee26f]"> (HQ)</span> : `, ${state}`}
                  </h3>
                  <p className="mt-2 text-sm text-white/85">{l.address}</p>
                  {l.phone && <PhoneLink phone={l.phone} />}
                </li>
              );
            })}
          </ul>
        </Container>
      </section>

      <DeliveryBanner
        title={
          <>
            Get Jerked Delivered
            <br />
            to Your Door
          </>
        }
        text="Order your favorite dishes easily through DoorDash or Uber Eats from your nearest location. Enjoy bold Jamaican flavors delivered straight to your doorstep, fresh and ready to satisfy your cravings."
      />

      {/* FAQ */}
      <section className="bg-gradient-to-b from-[#1c5a24] via-[#0b2410] to-black py-20">
        <Container>
          <h2 className="display text-5xl sm:text-6xl">
            Frequently Asked <span className="text-gradient">Questions</span>
          </h2>
          <p className="mb-10 mt-3 text-lg text-white/85">
            Got questions about our flavors, catering, or locations? We&apos;ve got answers. Explore our FAQs below.
          </p>
          <Faq items={contactFaqs} />
        </Container>
      </section>
    </>
  );
}
