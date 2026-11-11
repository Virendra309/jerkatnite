import type { Metadata } from "next";
import Image from "next/image";
import { ButtonLink, Container, PageHero } from "@/components/ui";
import { images } from "@/data/site";

export const metadata: Metadata = {
  title: "About Us",
  description: "From a Howard University dorm room in 2012 to restaurants across the country — the Jerk at Nite story.",
};

const values = [
  { title: "100% Halal", text: "Every dish, since day one, so great food is for everyone." },
  { title: "No MSG", text: "No MSG or preservatives — natural ingredients and real Caribbean spices." },
  { title: "Fusion Cooking", text: "Jamaican, Mexican and American soul food, healthy yet affordable." },
  { title: "12+ Years", text: "Chefs with over a decade of professional experience." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero eyebrow="Our Story" top="Who we are." accent="Jerk at Nite" />

      <Container className="grid items-center gap-12 pb-16 lg:grid-cols-2">
        <div className="space-y-5 text-lg text-white/75">
          <p>
            The founder started selling his flavorful Jamaican jerk chicken from his dorm room in Drew Hall at Howard University in
            2012. Jerk at Nite was founded because of the lack of authentic late-night food at Howard: after 10pm the campus
            cafeteria closed, and students writing late-night papers and studying for exams were left with greasy burgers, fries and
            pizza.
          </p>
          <p>
            The founder was raised in a Jamaican household where he received three wholesome meals a day and fast food was a
            rarity. That upbringing shaped the concept.
          </p>
          <p>
            Jerk at Nite places an emphasis on healthy yet affordable Mexican, Jamaican and American soul food with a focus on fusion
            cooking. Guests can expect hearty Jamaican staples like our signature jerk chicken, oxtail, jammin&apos; salmon and many
            other savory dishes.
          </p>
        </div>
        <Image src={images.about} alt="Signature Jerk at Nite dishes" width={982} height={1024} sizes="(min-width: 1024px) 50vw, 100vw" className="mx-auto w-full max-w-lg" />
      </Container>

      <Container className="grid gap-5 pb-16 sm:grid-cols-2 lg:grid-cols-4">
        {values.map((v) => (
          <div key={v.title} className="rounded-2xl border border-white/10 bg-ink-2 p-6">
            <h2 className="display text-3xl text-gradient">{v.title}</h2>
            <p className="mt-2 text-white/70">{v.text}</p>
          </div>
        ))}
      </Container>

      <Container className="flex flex-wrap gap-4 pb-24">
        <ButtonLink href="/menu">View Menu</ButtonLink>
        <ButtonLink href="/locations" variant="ghost">Find a Location</ButtonLink>
      </Container>
    </>
  );
}
