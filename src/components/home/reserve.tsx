import Image from "next/image";
import { images, site } from "@/data/site";

/** Full-width photo banner with the OpenTable reservation link (Baltimore only). */
export function Reserve({
  image = images.tacos,
  cta = "Get Reservation With Open Table",
  overlay = "bg-black/60",
}: { image?: string; cta?: string; overlay?: string } = {}) {
  return (
    <section className="relative isolate overflow-hidden py-28 text-center sm:py-36">
      <Image src={image} alt="" fill sizes="100vw" className="-z-20 object-cover object-[center_75%]" />
      <div aria-hidden className={`absolute inset-0 -z-10 ${overlay}`} />
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-5 py-2 font-semibold text-white backdrop-blur-sm">
          <svg viewBox="0 0 24 24" className="size-5 text-gold" fill="currentColor" aria-hidden>
            <path d="M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z" />
          </svg>
          Only for Baltimore Location
        </p>
        <h2 className="display mt-6 text-4xl leading-[0.95] sm:text-6xl">
          Reserve Your Seat for an
          <br />
          Authentic Jamaican Experience
        </h2>
        <p className="mt-4 text-lg text-white/90">Join us for authentic Jamaican flavors and an atmosphere you won&apos;t forget.</p>
        <a
          href={site.openTable}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary mt-8 rounded-[4px] px-6 py-3 font-semibold shadow-none"
        >
          {cta}
        </a>
      </div>
    </section>
  );
}
