import { ButtonLink, PageHero } from "@/components/ui";

export default function NotFound() {
  return (
    <PageHero eyebrow="404" top="This page" accent="Ran Out">
      <p>We couldn&apos;t find what you were looking for.</p>
      <div className="mt-6"><ButtonLink href="/">Back Home</ButtonLink></div>
    </PageHero>
  );
}
