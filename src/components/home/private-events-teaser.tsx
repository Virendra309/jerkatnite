import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui";
import { images } from "@/data/site";

/** "Private Events at Jerkatnite" section (home and locations pages). */
export function PrivateEventsTeaser() {
  return (
    <section className="relative overflow-hidden bg-black py-24">
      {/* decorative sparkles */}
      <Image src={images.star} alt="" width={83} height={83} aria-hidden className="pointer-events-none absolute left-4 top-16 w-16 opacity-30 blur-[1px] sm:left-8" />
      <svg aria-hidden viewBox="0 0 24 24" className="pointer-events-none absolute bottom-10 left-6 size-14 text-[#8dff3a] sm:left-10">
        <path d="M12 2v20M2 12h20M4.9 4.9l14.2 14.2M19.1 4.9 4.9 19.1" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" />
      </svg>
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 size-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-leaf/10 blur-3xl" />

      <Container className="relative grid items-center gap-12 lg:grid-cols-2">
        <Image
          src={images.events}
          alt="Guests celebrating a birthday party at Jerk at Nite"
          width={1014}
          height={1024}
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="mx-auto w-full max-w-lg transition-transform duration-700 hover:-rotate-1 hover:scale-[1.02]"
        />
        <div>
          <h2 className="display text-5xl sm:text-7xl">
            <span className="text-gradient block">Private Events</span>
            <span className="flex items-center gap-3">
              at Jerkatnite
              <Image src={images.eventThumb} alt="" width={94} height={70} aria-hidden className="h-12 w-auto rounded border-2 border-white sm:h-14" />
            </span>
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-white/85">
            From intimate birthday dinners to full-scale corporate mixers, the Jerk at Nite experience is the perfect setting for your
            next occasion. Bold Jamaican food, an unforgettable atmosphere, and a team that makes sure every event runs smoothly. A
            private room is also available for special events.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/private-events" className="btn-primary rounded-[4px] px-5 py-2.5 font-semibold shadow-none">
              Plan Your Booking
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-[4px] bg-white px-5 py-2.5 font-semibold text-black transition hover:-translate-y-0.5 hover:bg-gold"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
