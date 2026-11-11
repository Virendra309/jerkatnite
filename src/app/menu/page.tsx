import type { Metadata } from "next";
import { OrderButton } from "@/components/order";
import { Container, PageHero } from "@/components/ui";
import { menu } from "@/data/menu";

export const metadata: Metadata = {
  title: "Menu",
  description: "Jerk chicken, oxtail, rasta pasta, jerk tacos, wings and more. 100% Halal, no MSG, made fresh daily.",
};

export default function MenuPage() {
  return (
    <>
      <PageHero eyebrow="All Halal · No MSG" top="Our" accent="Food Menu">
        Bold Jamaican flavors with a fusion twist, made fresh every day.
      </PageHero>
      <Container className="grid gap-16 pb-24">
        {menu.map((section) => (
          <section key={section.title} aria-labelledby={section.title}>
            <h2 id={section.title} className="display border-b border-white/10 pb-3 text-4xl text-gradient">{section.title}</h2>
            <ul className="mt-6 grid gap-x-10 gap-y-6 md:grid-cols-2">
              {section.items.map((item) => (
                <li key={item.name} className="flex justify-between gap-6">
                  <div>
                    <h3 className="text-lg font-bold">
                      {item.name}
                      {item.tags?.map((t) => (
                        <span key={t} className="ml-2 rounded-full bg-leaf/15 px-2 py-0.5 align-middle text-xs font-semibold text-leaf">{t}</span>
                      ))}
                    </h3>
                    <p className="mt-1 text-white/65">{item.description}</p>
                  </div>
                  {item.price && <span className="shrink-0 font-bold text-gold">{item.price}</span>}
                </li>
              ))}
            </ul>
          </section>
        ))}
        <div className="text-center"><OrderButton /></div>
      </Container>
    </>
  );
}
