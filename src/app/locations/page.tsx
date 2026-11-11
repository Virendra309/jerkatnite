import type { Metadata } from "next";
import { Container, LocationGrid, PageHero } from "@/components/ui";

export const metadata: Metadata = {
  title: "Locations",
  description: "Find Jerk at Nite in Baltimore, Houston, Detroit and soon Washington, DC.",
};

export default function LocationsPage() {
  return (
    <>
      <PageHero top="Find a" accent="Location">
        Bold jerk flavors in cities across the country — with late-night hours on weekends at select spots.
      </PageHero>
      <Container className="pb-24">
        <LocationGrid />
      </Container>
    </>
  );
}
