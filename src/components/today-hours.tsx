"use client";

import { useSyncExternalStore } from "react";
import { locations, type WeekHours } from "@/data/site";

// --- current time, read in the browser only so pages stay prerendered ---------------------

function subscribeMinute(cb: () => void) {
  const id = window.setInterval(cb, 30_000);
  return () => window.clearInterval(id);
}
/** Current time in whole minutes since the epoch (stable within a minute). */
const getEpochMinute = () => Math.floor(Date.now() / 60_000);

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
/** Minutes since Sunday 00:00 in the given time zone. */
function minuteOfWeekIn(epochMinute: number, timeZone: string) {
  const parts = new Intl.DateTimeFormat("en-US", { timeZone, weekday: "short", hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).formatToParts(
    new Date(epochMinute * 60_000),
  );
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "0";
  return DAYS.indexOf(get("weekday")) * 1440 + (Number(get("hour")) % 24) * 60 + Number(get("minute"));
}

/** Minutes since Sunday 00:00 at the location — `null` on the server / during prerender. */
function useLocationMinuteOfWeek(slug: string) {
  const epoch = useSyncExternalStore<number | null>(subscribeMinute, getEpochMinute, () => null);
  const loc = locations.find((l) => l.slug === slug);
  if (epoch === null || !loc) return null;
  return minuteOfWeekIn(epoch, loc.timeZone);
}

// --- parsing "4:00 PM – 10:00 PM" ---------------------------------------------------------

function toMinutes(t: string) {
  const m = t.trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!m) return null;
  let h = Number(m[1]) % 12;
  if (m[3].toUpperCase() === "PM") h += 12;
  return h * 60 + Number(m[2]);
}

/** [start, end] in minutes from that day's midnight; `end` may exceed 1440 for past-midnight closing. */
function range(hours: string | null): [number, number] | null {
  if (!hours) return null;
  const [a, b] = hours.split(/[–-]/);
  const s = toMinutes(a ?? "");
  let e = toMinutes(b ?? "");
  if (s === null || e === null) return null;
  if (e <= s) e += 1440;
  return [s, e];
}

type Status = { open: boolean; until?: string; today: string | null };

function statusAt(week: WeekHours, minuteOfWeek: number): Status {
  const day = Math.floor(minuteOfWeek / 1440);
  const m = minuteOfWeek % 1440;
  const today = week[day];
  const t = range(today);
  if (t && m >= t[0] && m < t[1]) return { open: true, until: today!.split(/[–-]/)[1]?.trim(), today };
  // still open from yesterday's late-night shift?
  const yIdx = (day + 6) % 7;
  const y = range(week[yIdx]);
  if (y && y[1] > 1440 && m < y[1] - 1440) return { open: true, until: week[yIdx]!.split(/[–-]/)[1]?.trim(), today };
  return { open: false, today };
}

// --- components ---------------------------------------------------------------------------

/** "Today: 4:00 PM – 10:00 PM" line. */
export function TodayHours({ slug }: { slug: string }) {
  const now = useLocationMinuteOfWeek(slug);
  const hours = locations.find((l) => l.slug === slug)?.hours;
  if (!hours) return null;
  const today = now === null ? undefined : hours[Math.floor(now / 1440)];
  return (
    <span className="text-sm font-semibold text-leaf">{now === null ? "See hours" : `Today: ${today ?? "Closed"}`}</span>
  );
}

/** Live "Open now · until 10:00 PM" / "Closed now" pill. */
export function OpenBadge({ slug }: { slug: string }) {
  const now = useLocationMinuteOfWeek(slug);
  const hours = locations.find((l) => l.slug === slug)?.hours;
  if (!hours) return null;
  if (now === null) return <span className="h-7 w-24 rounded-full bg-white/5" aria-hidden />;

  const s = statusAt(hours, now);
  return s.open ? (
    <span className="inline-flex items-center gap-2 rounded-full border border-leaf/40 bg-leaf/10 px-3 py-1 text-xs font-semibold text-leaf">
      <span className="relative flex size-2">
        <span className="absolute inline-flex size-full animate-ping rounded-full bg-leaf opacity-60 motion-reduce:animate-none" />
        <span className="relative inline-flex size-2 rounded-full bg-leaf" />
      </span>
      Open now{s.until ? ` · until ${s.until}` : ""}
    </span>
  ) : (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-semibold text-white/60">
      <span className="size-2 rounded-full bg-chili/80" />
      Closed now
    </span>
  );
}

/** Today's hours text only (e.g. "4:00 PM – 10:00 PM" or "Closed today"). */
export function TodayHoursText({ slug }: { slug: string }) {
  const now = useLocationMinuteOfWeek(slug);
  const hours = locations.find((l) => l.slug === slug)?.hours;
  if (!hours) return null;
  if (now === null) return <>See weekly hours</>;
  return <>{hours[Math.floor(now / 1440)] ?? "Closed today"}</>;
}
