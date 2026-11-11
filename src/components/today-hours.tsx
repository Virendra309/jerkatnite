"use client";

import { useSyncExternalStore } from "react";
import { locations } from "@/data/site";

/**
 * Shows today's hours for a location. The day is read in the browser (after
 * hydration) so the page itself can stay fully prerendered.
 */
export function TodayHours({ slug }: { slug: string }) {
  // null on the server / during prerender, the real weekday in the browser.
  const day = useSyncExternalStore<number | null>(
    subscribe,
    () => new Date().getDay(),
    () => null,
  );

  const hours = locations.find((l) => l.slug === slug)?.hours;
  if (!hours) return null;

  const today = day === null ? undefined : hours[day];
  return (
    <span className="text-sm font-semibold text-leaf">
      {day === null ? "See hours" : `Today: ${today ?? "Closed"}`}
    </span>
  );
}

const subscribe = () => () => {};
