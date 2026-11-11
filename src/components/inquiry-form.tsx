"use client";

import { useState, type FormEvent } from "react";
import { site } from "@/data/site";

type Field = { name: string; label: string; type?: string; required?: boolean; options?: string[]; textarea?: boolean };

/**
 * Inquiry form. For now it opens the visitor's email app with the details filled in.
 * Swap `onSubmit` for a call to a form service (Formspree, Resend, an API route) when ready.
 */
export function InquiryForm({ subject, fields, submitLabel = "Send Inquiry" }: { subject: string; fields: Field[]; submitLabel?: string }) {
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const body = fields.map((f) => `${f.label}: ${data.get(f.name) ?? ""}`).join("\n");
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  const input = "mt-1 w-full rounded-lg border border-white/15 bg-ink px-4 py-3 text-white placeholder:text-white/40 focus:border-leaf focus:outline-none";

  return (
    <form onSubmit={onSubmit} className="grid gap-5 rounded-2xl border border-white/10 bg-ink-2 p-6 sm:grid-cols-2 sm:p-8">
      {fields.map((f) => (
        <label key={f.name} className={`text-sm font-semibold ${f.textarea ? "sm:col-span-2" : ""}`}>
          {f.label}
          {f.required && <span className="text-chili"> *</span>}
          {f.textarea ? (
            <textarea name={f.name} required={f.required} rows={5} className={input} />
          ) : f.options ? (
            <select name={f.name} required={f.required} className={input} defaultValue="">
              <option value="" disabled>Select…</option>
              {f.options.map((o) => <option key={o}>{o}</option>)}
            </select>
          ) : (
            <input name={f.name} type={f.type ?? "text"} required={f.required} className={input} />
          )}
        </label>
      ))}
      <div className="sm:col-span-2">
        <button type="submit" className="btn-primary">{submitLabel}</button>
        {sent && <p role="status" className="mt-3 text-sm text-leaf">Your email app should open with your inquiry. Thanks — we&apos;ll be in touch!</p>}
      </div>
    </form>
  );
}
