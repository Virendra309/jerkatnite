"use client";

import { useRef, useState, type FormEvent } from "react";
import { site } from "@/data/site";

export type Job = { title: string; text: string; experience: string; type: string; location: string };

/** Job cards; "Apply Now" opens an application form for that role (sends via the visitor's email app). */
export function JobList({ jobs, locations }: { jobs: Job[]; locations: string[] }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [role, setRole] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const open = (title: string) => {
    setRole(title);
    setSent(false);
    dialog.current?.showModal();
  };

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const body = [
      `Position: ${role}`,
      `Name: ${d.get("name")}`,
      `Email: ${d.get("email")}`,
      `Phone: ${d.get("phone")}`,
      `Preferred location: ${d.get("location")}`,
      `Experience: ${d.get("about") ?? ""}`,
    ].join("\n");
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(`Job application: ${role}`)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  const input = "mt-1 w-full rounded-md border border-white/15 bg-black px-4 py-3 text-white placeholder:text-white/40 focus:border-leaf focus:outline-none";

  return (
    <>
      <ul className="space-y-6">
        {jobs.map((j) => (
          <li key={j.title} className="rounded-md border border-white/20 bg-black p-4 transition-colors hover:border-[#c6f135]/60 sm:p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="max-w-3xl">
                <h3 className="display text-2xl">{j.title}</h3>
                <p className="mt-3 text-white/90">{j.text}</p>
              </div>
              <button
                type="button"
                onClick={() => open(j.title)}
                className="btn-primary order-last shrink-0 self-start rounded-[4px] px-4 py-2 font-semibold shadow-none sm:order-none"
              >
                Apply Now
              </button>
            </div>
            <dl className="mt-4 grid gap-2 text-sm sm:grid-cols-[minmax(0,11rem)_minmax(0,10rem)_1fr] sm:gap-6">
              <div className="flex gap-2">
                <dt className="font-semibold">Experience:</dt>
                <dd className="text-white/85">{j.experience}</dd>
              </div>
              <div className="flex gap-2">
                <dt className="shrink-0 font-semibold">Job Type:</dt>
                <dd className="text-white/85">{j.type}</dd>
              </div>
              <div className="flex gap-2">
                <dt className="font-semibold">Location:</dt>
                <dd className="text-white/85">{j.location}</dd>
              </div>
            </dl>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialog}
        aria-labelledby="apply-title"
        className="m-auto w-[min(92vw,640px)] rounded-xl border border-[#c6f135]/50 bg-gradient-to-b from-[#123d19] to-black p-0 text-white shadow-2xl backdrop:bg-black/70 backdrop:backdrop-blur-sm"
        onClick={(e) => e.target === e.currentTarget && dialog.current?.close()}
      >
        <div className="p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-gold">Apply for</p>
              <h2 id="apply-title" className="display text-4xl">{role}</h2>
            </div>
            <button type="button" aria-label="Close" onClick={() => dialog.current?.close()} className="rounded-full p-2 text-2xl leading-none hover:bg-white/10">
              ×
            </button>
          </div>
          <form onSubmit={onSubmit} className="mt-6 grid gap-4 sm:grid-cols-2">
            <label className="text-sm font-semibold">
              Full name<span className="text-chili"> *</span>
              <input name="name" required autoComplete="name" className={input} />
            </label>
            <label className="text-sm font-semibold">
              Phone<span className="text-chili"> *</span>
              <input name="phone" type="tel" required autoComplete="tel" className={input} />
            </label>
            <label className="text-sm font-semibold">
              Email<span className="text-chili"> *</span>
              <input name="email" type="email" required autoComplete="email" className={input} />
            </label>
            <label className="text-sm font-semibold">
              Preferred location<span className="text-chili"> *</span>
              <select name="location" required defaultValue="" className={input}>
                <option value="" disabled>
                  Select…
                </option>
                {locations.map((l) => (
                  <option key={l}>{l}</option>
                ))}
              </select>
            </label>
            <label className="text-sm font-semibold sm:col-span-2">
              Tell us about your experience
              <textarea name="about" rows={4} className={input} />
            </label>
            <div className="sm:col-span-2">
              <button type="submit" className="btn-primary rounded-[4px] px-6 py-3 font-semibold shadow-none">
                Send Application
              </button>
              {sent && (
                <p role="status" className="mt-3 text-sm text-[#9be564]">
                  Your email app should open with your application. Thanks, we&apos;ll be in touch!
                </p>
              )}
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
}
