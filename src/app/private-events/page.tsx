import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BookingForm } from "@/components/booking-form";
import { Container, Faq } from "@/components/ui";
import { images } from "@/data/site";

export const metadata: Metadata = {
  title: "Private Events",
  description: "Host private events with bold Caribbean flavors and a vibrant atmosphere: sports, celebrity, school, wedding, corporate and private parties.",
};

const categories = [
  {
    title: "Sports",
    text: "From little league to pro-level, we serve fast, flavorful halal eats that keep fans and players energized.",
    items: ["Youth Tournaments", "College Tailgates", "Pro Matches", "Tournament & Camps"],
    img: images.restaurant,
  },
  {
    title: "Celebrity",
    text: "Roll out the red carpet! Whether it's a VIP appearance, launch party, or exclusive gathering, we specialize in high-end, discreet event planning for celebrities and influencers.",
    items: ["Celebrity Party", "Influencers Party"],
    img: images.catering,
  },
  {
    title: "Schools & Colleges",
    text: "Campus-ready catering that brings energy and food to any school or college gathering.",
    items: ["Orientation", "Club Events", "Graduation Parties", "Campus Festivals"],
    img: images.wings,
  },
  {
    title: "Weddings",
    text: "Your big day, your way. Our truck rolls in with fresh, halal street eats so you can focus on “I do.”",
    items: ["Ceremonies", "Receptions", "Rehearsals", "Bridal Showers"],
    img: images.catering1,
  },
  {
    title: "Corporate Gatherings",
    text: "Our truck shows up on time, every time.",
    items: ["Conferences", "Team-Building", "Brand Activations", "Employee Appreciation", "Launches"],
    img: images.catering2,
  },
  {
    title: "Private Parties",
    text: "We bring the food; you bring the celebration!",
    items: ["Birthdays", "Anniversaries", "Celebrations", "Influencer Gatherings", "Special Occasions"],
    img: images.tacos,
  },
];

const eventFaqs = [
  {
    q: "What types of private events does Jerk at Nite host?",
    a: "Birthdays, anniversaries, weddings, corporate gatherings, sports events, school and college events, celebrity and influencer parties, and more.",
  },
  {
    q: "How do I book a private event?",
    a: "Fill out the booking form on this page with your event details and our team will get back to you to confirm availability and plan the menu.",
  },
  {
    q: "Can Jerk at Nite cater a wedding?",
    a: "Yes. From ceremonies and receptions to rehearsals and bridal showers, we bring fresh, halal Jamaican food so you can focus on your big day.",
  },
  {
    q: "Can I get catering food trays delivered to my private event instead?",
    a: "Yes. If you'd rather host somewhere else, our catering team can bring fresh trays straight to your venue. See the Catering page for details.",
  },
  {
    q: "How much notice do I need to give for a private event?",
    a: "Please submit your party request at least 24 hours in advance. For larger events, the earlier the better.",
  },
  {
    q: "Can Jerk at Nite handle corporate events and brand activations?",
    a: "Absolutely. We cater conferences, team-building days, brand activations, employee appreciation events and launches, and we show up on time, every time.",
  },
  {
    q: "Is the private event food the same quality as the restaurant?",
    a: "Yes. Everything is made fresh with the same recipes and real Caribbean spices: 100% halal, no MSG and no preservatives.",
  },
  {
    q: "Can Jerk at Nite cater school and college events?",
    a: "Yes. We offer campus-ready catering for orientations, club events, graduation parties and campus festivals.",
  },
  {
    q: "Is there a private room available at Jerk at Nite Baltimore?",
    a: "Yes. A private room is available at our Baltimore location for special events.",
  },
  {
    q: "Is a deposit required to book a private event?",
    a: "Booking details depend on the size and type of your event. Our team will go over everything with you after you send your inquiry.",
  },
];

export default function PrivateEventsPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative isolate flex min-h-[70vh] items-center justify-center overflow-hidden pb-16 pt-32 text-center">
        <Image src={images.restaurant} alt="" fill priority sizes="100vw" className="animate-ken-burns -z-20 object-cover" />
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-black/60 via-black/55 to-black" />
        <Container className="animate-rise">
          <nav aria-label="Breadcrumb" className="mx-auto inline-flex items-center gap-3 rounded-full bg-black/50 px-6 py-2 backdrop-blur-sm">
            <Link href="/" className="text-white hover:text-gold">
              Home
            </Link>
            <span aria-hidden className="text-white">›</span>
            <span aria-current="page" className="text-gold">Private Events</span>
          </nav>
          <h1 className="display mt-5 text-5xl sm:text-7xl">
            Arrange <span className="text-gradient">Private Events</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/90">
            Host private events with bold Caribbean flavors and a vibrant atmosphere, perfect for creating memorable celebrations.
          </p>
          <a href="#book" className="btn-primary mt-8 rounded-[4px] px-5 py-2.5 font-semibold shadow-none">
            Book Private Event
          </a>
        </Container>
      </section>

      {/* Event types */}
      <section className="bg-black pb-20 pt-6">
        <Container className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c) => (
            <article
              key={c.title}
              className="group flex flex-col rounded-xl border border-white/15 bg-gradient-to-b from-[#1e1e1e] to-black p-2 transition duration-300 hover:-translate-y-1 hover:border-leaf/60"
            >
              <div className="relative aspect-[16/7.5] overflow-hidden rounded-lg">
                <Image src={c.img} alt={c.title} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="px-1 pb-4 pt-4">
                <h2 className="display text-2xl">{c.title}</h2>
                <p className="mt-2 text-white/90">{c.text}</p>
                <ul className="mt-4 space-y-2.5">
                  {c.items.map((i) => (
                    <li key={i} className="flex items-center gap-3 text-[15px] text-[#b7e04a]">
                      <span aria-hidden className="size-2 shrink-0 rounded-full border-2 border-gold" />
                      {i}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </Container>
      </section>

      {/* Booking form */}
      <section id="book" className="scroll-mt-24 bg-black pb-20">
        <Container>
          <div className="rounded-2xl border border-gold bg-gradient-to-b from-[#1c5a24] via-[#0b2410] via-30% to-black p-5 sm:p-8">
            <div className="text-center">
              <h2 className="display text-4xl sm:text-6xl">
                Memories <span className="text-gradient">Start After Dark</span>
              </h2>
              <p className="mt-3 inline-flex items-center gap-2 rounded-full bg-black/45 px-5 py-2 text-white">
                <span aria-hidden>⚠️</span> Please submit your party request at least 24 hours in advance.
              </p>
            </div>
            <div className="mt-8">
              <BookingForm />
            </div>
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="bg-gradient-to-b from-[#1c5a24] via-[#0b2410] to-black py-20">
        <Container>
          <h2 className="display text-5xl sm:text-6xl">
            Frequently Asked <span className="text-gradient">Questions</span>
          </h2>
          <p className="mb-10 mt-3 text-lg text-white/85">Join us for authentic Jamaican flavors and an atmosphere you won&apos;t forget.</p>
          <Faq items={eventFaqs} />
        </Container>
      </section>
    </>
  );
}
