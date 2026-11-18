"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { site } from "@/data/site";

/**
 * "Start Your Application" form on each job page.
 * There is no server yet, so sending opens the visitor's email app with the details filled in;
 * a browser can't attach the chosen resume to that email, so we ask them to attach it there.
 * Swap onSubmit for a form service (Formspree, Resend, an API route) to receive resumes directly.
 */
/** "Apply Now" button; the application form opens below it once clicked. */
export function ApplySection(props: { role: string; roles: string[]; locations: string[] }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    ref.current?.querySelector<HTMLInputElement>("input[name=name]")?.focus({ preventScroll: true });
  }, [open]);

  return (
    <>
      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-expanded={open}
          aria-controls="apply"
          className="btn-primary rounded-md px-6 py-3 text-lg font-semibold shadow-none"
        >
          Apply Now
        </button>
      )}
      {open && (
        <div ref={ref} className="animate-rise scroll-mt-28">
          <ApplicationForm {...props} />
        </div>
      )}
    </>
  );
}

function ApplicationForm({ role, roles, locations }: { role: string; roles: string[]; locations: string[] }) {
  const [sent, setSent] = useState<string | null>(null);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const resume = d.get("resume");
    const fileName = resume instanceof File ? resume.name : "";
    const job = String(d.get("job"));
    const body = [
      `Position: ${job}`,
      `Name: ${d.get("name")}`,
      `Email: ${d.get("email")}`,
      `Phone: ${d.get("phone")}`,
      `Location: ${d.get("location")}`,
      `Resume: ${fileName} (attached)`,
      "",
      `About me: ${d.get("about") ?? ""}`,
    ].join("\n");
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(`Job application: ${job}`)}&body=${encodeURIComponent(body)}`;
    setSent(fileName);
  }

  const field =
    "mt-2 w-full rounded-md border border-transparent bg-gradient-to-b from-[#333] to-[#1a1a1a] px-4 py-3 text-white placeholder:text-white/45 transition-colors focus:border-[#5ee26f] focus:outline-none";
  const req = <span className="text-chili"> *</span>;

  return (
    <section
      id="apply"
      aria-labelledby="apply-title"
      className="scroll-mt-28 rounded-2xl border border-gold/90 bg-gradient-to-br from-[#1c5a24] via-black to-black px-5 pb-8 pt-10 sm:px-8"
    >
      <div className="text-center">
        <h2 id="apply-title" className="display text-5xl sm:text-6xl">
          Start Your <span className="text-gradient">Application</span>
        </h2>
        <p className="mt-3 text-lg text-white/90">Fill out the form below and show us why you&apos;re a fit for Jerk at Nite.</p>
      </div>

      <form onSubmit={onSubmit} className="mt-10 grid gap-x-6 gap-y-5 sm:grid-cols-6">
        <label className="font-medium sm:col-span-3">
          Full Name{req}
          <input name="name" required autoComplete="name" placeholder="Eg. John Smith" className={field} />
        </label>
        <label className="font-medium sm:col-span-3">
          Email{req}
          <input name="email" type="email" required autoComplete="email" placeholder="example@gmail.com" className={field} />
        </label>
        <label className="font-medium sm:col-span-2">
          Phone Number{req}
          <input name="phone" type="tel" required autoComplete="tel" placeholder="(000) 000-0000" className={field} />
        </label>
        <label className="font-medium sm:col-span-2">
          Which Job{req}
          <select name="job" required defaultValue={role} className={field}>
            {roles.map((r) => (
              <option key={r} className="bg-[#1a1a1a]">
                {r}
              </option>
            ))}
          </select>
        </label>
        <label className="font-medium sm:col-span-2">
          Which Location{req}
          <select name="location" required defaultValue="" className={field}>
            <option value="" disabled className="bg-[#1a1a1a]">
              Select location
            </option>
            {locations.map((l) => (
              <option key={l} className="bg-[#1a1a1a]">
                {l}
              </option>
            ))}
          </select>
        </label>
        <label className="font-medium sm:col-span-6">
          Upload Resume{req}
          <input
            name="resume"
            type="file"
            required
            accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            className={`${field} py-2 file:mr-3 file:cursor-pointer file:rounded file:border-0 file:bg-white file:px-3 file:py-1 file:text-sm file:font-semibold file:text-black`}
          />
          <span className="mt-1 block text-sm font-normal text-white/55">PDF or Word document.</span>
        </label>
        <label className="font-medium sm:col-span-6">
          Tell Us About Yourself
          <textarea name="about" rows={5} placeholder="Type your message..." className={field} />
        </label>
        <div className="flex flex-col items-end gap-3 sm:col-span-6">
          <button type="submit" className="btn-primary rounded-md px-7 py-3 text-lg font-semibold shadow-none">
            Send My Application
          </button>
          {sent !== null && (
            <p role="status" className="max-w-xl text-right text-[#9be564]">
              Your email app should open with your application. Please attach your resume{sent ? ` (${sent})` : ""} to that email before
              sending. Thanks, we&apos;ll be in touch!
            </p>
          )}
        </div>
      </form>
    </section>
  );
}
