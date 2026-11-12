"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { site } from "@/data/site";

const input =
  "mt-2 w-full rounded-md border border-white/10 bg-gradient-to-b from-[#2a2a2a] to-[#1b1b1b] px-3 py-3 text-sm text-white placeholder:text-white/40 [color-scheme:dark] focus:border-leaf focus:outline-none focus:ring-1 focus:ring-leaf";

function Field({ label, children, className = "" }: { label: string; children: ReactNode; className?: string }) {
  return (
    <label className={`block text-[15px] font-medium text-white ${className}`}>
      {label} <span className="text-chili">*</span>
      {children}
    </label>
  );
}

/**
 * Private event booking form (same fields and layout as the live site).
 * For now it opens the visitor's email app with everything filled in; swap onSubmit for a form service later.
 */
export function BookingForm() {
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const rows: [string, string][] = [
      ["Full Name", "name"],
      ["Event Address", "address"],
      ["Email", "email"],
      ["Phone", "phone"],
      ["Event Start Time", "start"],
      ["Event End Time", "end"],
      ["Event Type", "type"],
      ["Event Date", "date"],
      ["Total Guests", "guests"],
      ["Message", "message"],
    ];
    const body = rows.map(([l, k]) => `${l}: ${d.get(k) ?? ""}`).join("\n");
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent("Private event inquiry")}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      <Field label="Full Name" className="sm:col-span-2">
        <input name="name" required placeholder="Eg: Alex Preet" className={input} />
      </Field>
      <Field label="Event Address" className="sm:col-span-2">
        <input name="address" required placeholder="Enter full address" className={input} />
      </Field>

      <Field label="Email">
        <input name="email" type="email" required placeholder="example@gmail.com" className={input} />
      </Field>
      <Field label="Phone">
        <input name="phone" type="tel" required placeholder="(896) 235 0102" className={input} />
      </Field>
      <Field label="Event Start Time">
        <input name="start" type="time" required className={input} />
      </Field>
      <Field label="Event End Time">
        <input name="end" type="time" required className={input} />
      </Field>

      <div className="grid gap-5 sm:col-span-2 sm:grid-cols-2 lg:row-span-2">
        <Field label="Event Type" className="sm:col-span-2">
          <select name="type" required defaultValue="Private Event" className={input}>
            <option>Private Event</option>
          </select>
        </Field>
        <Field label="Event Date">
          <input name="date" type="date" required className={input} />
        </Field>
        <Field label="Total Guest">
          <input name="guests" type="number" min={1} required placeholder="00" className={input} />
        </Field>
      </div>
      <label className="block text-[15px] font-medium text-white sm:col-span-2 lg:row-span-2">
        Message
        <textarea name="message" placeholder="Type your message.." className={`${input} h-[calc(100%-2rem)] min-h-36 resize-y`} />
      </label>

      <div className="flex flex-col items-end gap-2 sm:col-span-2 lg:col-span-4">
        <button type="submit" className="btn-primary rounded-md px-6 py-3 text-lg font-semibold shadow-none">
          Send Inquiry
        </button>
        {sent && (
          <p role="status" className="text-sm text-leaf">
            Your email app should open with the details filled in. We&apos;ll be in touch!
          </p>
        )}
      </div>
    </form>
  );
}
