import type { Metadata } from "next";
import Image from "next/image";
import { Container, PageHero } from "@/components/ui";
import { images } from "@/data/site";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Captured moments of flavor and culture at Jerk at Nite.",
};

const photos = [
  { src: images.tacos, alt: "Jerk tacos" },
  { src: images.wings, alt: "Jerk chicken wings" },
  { src: images.catering, alt: "Catering spread" },
  { src: images.catering1, alt: "Jamaican plates" },
  { src: images.catering2, alt: "Jerk wings close-up" },
  { src: images.catering3, alt: "Dessert" },
  { src: images.restaurant, alt: "Jerk at Nite restaurant" },
];

export default function GalleryPage() {
  return (
    <>
      <PageHero eyebrow="Gallery" top="Captured Moments" accent="of Flavor & Culture">
        The sights of authentic Caribbean and Jamaican cuisine, vibrant energy, and the memories made every night.
      </PageHero>
      <Container className="columns-1 gap-5 pb-24 sm:columns-2 lg:columns-3">
        {photos.map((p) => (
          <div key={p.src} className="mb-5 break-inside-avoid overflow-hidden rounded-2xl border border-white/10">
            <Image src={p.src} alt={p.alt} width={1024} height={683} sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="h-auto w-full transition duration-500 hover:scale-105" />
          </div>
        ))}
      </Container>
    </>
  );
}
