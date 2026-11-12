"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import type { CateringItem, CateringTab } from "@/data/catering";
import { site } from "@/data/site";
import { OrderButton } from "./order";

type CartKey = string; // `${itemId}|${label}`
type Toast = { id: number; title: string; qty: number; msg: string };

const money = (p: string | null) => (p && /^\$\d/.test(p) ? Number(p.replace(/[^0-9.]/g, "")) : null);

/** Placeholder used by the live site for items without a photo: neon J logo. */
function JLogo() {
  return (
    <div className="grid size-full place-items-center bg-[#0d1f10]">
      <svg viewBox="0 0 120 120" className="h-[85%] w-auto" aria-hidden>
        <circle cx="60" cy="60" r="54" fill="none" stroke="#9be564" strokeWidth="9" />
        <circle cx="60" cy="60" r="34" fill="none" stroke="#9be564" strokeWidth="7" />
        <path d="M66 26v42a14 14 0 0 1-28 0" fill="none" stroke="#ef4f3b" strokeWidth="9" strokeLinecap="round" />
      </svg>
    </div>
  );
}

function Stepper({ value, onMinus, onPlus, label }: { value: number; onMinus: () => void; onPlus: () => void; label: string }) {
  return (
    <div className="flex items-center gap-2 rounded-full bg-gradient-to-b from-[#3a3a3a] to-[#1a1a1a] p-1 shadow-inner">
      <button
        type="button"
        onClick={onMinus}
        aria-label={`Remove one ${label}`}
        className="grid size-8 place-items-center rounded-full bg-[#7a7a7a] text-lg leading-none text-white transition hover:bg-[#999]"
      >
        −
      </button>
      <span aria-live="polite" className="w-7 text-center font-semibold tabular-nums">
        {String(value).padStart(2, "0")}
      </span>
      <button
        type="button"
        onClick={onPlus}
        aria-label={`Add one ${label}`}
        className="grid size-8 place-items-center rounded-full bg-[#2fbf4a] text-lg leading-none text-white transition hover:bg-[#3ad457]"
      >
        +
      </button>
    </div>
  );
}

const fieldCls =
  "mt-2 w-full rounded-md border border-white/10 bg-gradient-to-b from-[#2a2a2a] to-[#1b1b1b] px-3 py-3 text-sm text-white placeholder:text-white/40 [color-scheme:dark] focus:border-leaf focus:outline-none focus:ring-1 focus:ring-leaf";

function Field({ label, children, required = true, className = "" }: { label: string; children: ReactNode; required?: boolean; className?: string }) {
  return (
    <label className={`block text-[15px] font-medium text-white ${className}`}>
      {label} {required && <span className="text-chili">*</span>}
      {children}
    </label>
  );
}

/** Catering menu (tabs, tray quantities, toasts) + "Order Your Catering Today" form, sharing one cart. */
export function CateringOrder({ tabs, locations }: { tabs: CateringTab[]; locations: string[] }) {
  const [active, setActive] = useState(0);
  const [cart, setCart] = useState<Record<CartKey, number>>({});
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [sent, setSent] = useState(false);
  const toastId = useRef(0);

  const allItems = tabs.flatMap((t) => t.items);
  const find = (id: string) => allItems.find((i) => i.id === id)!;

  const pushToast = (t: Omit<Toast, "id">) => {
    const id = ++toastId.current;
    setToasts((cur) => [...cur.slice(-4), { ...t, id }]);
  };
  useEffect(() => {
    if (!toasts.length) return;
    const timer = window.setTimeout(() => setToasts((cur) => cur.slice(1)), 2500);
    return () => window.clearTimeout(timer);
  }, [toasts]);

  const change = (item: CateringItem, label: string, delta: number) => {
    const key = `${item.id}|${label}`;
    const prev = cart[key] ?? 0;
    const next = Math.max(0, prev + delta);
    if (next === prev) return;
    setCart((c) => {
      const copy = { ...c };
      if (next) copy[key] = next;
      else delete copy[key];
      return copy;
    });
    pushToast({
      title: item.name,
      qty: next,
      msg: next === 0 ? "Removed from cart" : delta > 0 ? "Added into cart successfully" : "Quantity updated successfully",
    });
  };

  const lines = Object.entries(cart).map(([key, qty]) => {
    const [id, label] = key.split("|");
    const item = find(id);
    const price = item.prices.find((p) => p.label === label)?.price ?? null;
    const unit = money(price);
    return { key, item, label, qty, total: unit === null ? price ?? "Ask for price" : `$${unit * qty}` };
  });

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const order = lines.length ? lines.map((l) => `- ${l.item.name}: ${l.label} x${l.qty} (${l.total})`).join("\n") : "- (no items selected)";
    const fields: [string, string][] = [
      ["Full Name", "name"],
      ["Email", "email"],
      ["Phone", "phone"],
      ["Event Date", "date"],
      ["Total Guests", "guests"],
      ["Event Start Time", "start"],
      ["Event End Time", "end"],
      ["Location", "location"],
      ["Message", "message"],
    ];
    const body = `Catering items:\n${order}\n\n` + fields.map(([l, k]) => `${l}: ${d.get(k) ?? ""}`).join("\n");
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent("Catering order request")}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  return (
    <>
      {/* Toasts (top-right), as on the live site */}
      <div aria-live="polite" className="pointer-events-none fixed right-4 top-24 z-50 flex w-56 flex-col gap-2">
        {toasts.map((t) => (
          <div key={t.id} className="animate-fade-up rounded-lg bg-[#3cb54a] px-4 py-3 text-white shadow-lg shadow-black/40">
            <p className="font-bold leading-tight">{t.title}</p>
            <p className="text-sm font-semibold">Qty: {t.qty}</p>
            <p className="mt-1 text-xs text-white/85">{t.msg}</p>
          </div>
        ))}
      </div>

      {/* Menu & pricing */}
      <section id="menu" className="scroll-mt-24 bg-black py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="display text-5xl sm:text-6xl">Our Catering Menu &amp; Pricing</h2>
          <p className="mt-3 text-lg text-white/90">All items are made fresh daily, 100% Halal, with premium ingredients</p>

          <div className="mt-6 max-w-full rounded-full bg-gradient-to-r from-gold via-[#1d4a22] to-leaf p-px sm:inline-block">
            <div role="tablist" aria-label="Catering categories" className="flex overflow-x-auto rounded-full bg-gradient-to-r from-black via-[#0b2310] to-[#1d4f26] p-1.5">
              {tabs.map((t, i) => (
                <button
                  key={t.title}
                  id={`ctab-${i}`}
                  role="tab"
                  type="button"
                  aria-selected={active === i}
                  aria-controls="catering-panel"
                  onClick={() => setActive(i)}
                  className={`shrink-0 rounded-full px-5 py-2.5 font-semibold transition-colors sm:px-6 ${
                    active === i ? "bg-[#FFE500] text-black" : "text-white hover:bg-[#FFE500] hover:text-black"
                  }`}
                >
                  {t.title}
                </button>
              ))}
            </div>
          </div>

          <div id="catering-panel" role="tabpanel" aria-labelledby={`ctab-${active}`} key={active} className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {tabs[active].items.map((item, n) => (
              <article
                key={item.id}
                style={{ animationDelay: `${Math.min(n, 8) * 50}ms` }}
                className="animate-fade-up flex flex-col rounded-xl border border-white/15 bg-gradient-to-b from-black via-[#0f2a13] to-[#24562b] p-2"
              >
                <div className="relative aspect-[16/10] overflow-hidden rounded-lg">
                  {item.image ? (
                    <Image src={item.image} alt={item.name} fill sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" className="object-cover" />
                  ) : (
                    <JLogo />
                  )}
                </div>
                <div className="flex flex-1 flex-col px-1 pb-3 pt-4">
                  <h3 className="display text-[22px] leading-tight">{item.name}</h3>
                  {item.description && <p className="mt-1 text-sm text-white/90">{item.description}</p>}
                  <div className="mt-auto space-y-3 pt-4">
                    {item.prices.map((p) => {
                      const key = `${item.id}|${p.label}`;
                      return (
                        <div key={p.label} className="flex items-end justify-between gap-2">
                          <div>
                            <p className="text-sm text-white/80">{p.label}</p>
                            <p className="display text-2xl text-gradient">{p.price ?? "Ask for price"}</p>
                          </div>
                          <Stepper
                            value={cart[key] ?? 0}
                            label={`${p.label} of ${item.name}`}
                            onMinus={() => change(item, p.label, -1)}
                            onPlus={() => change(item, p.label, +1)}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-12 text-center">
            <OrderButton className="rounded-[4px] px-5 py-2.5 font-semibold shadow-none">Order Online Now</OrderButton>
          </div>
        </div>
      </section>

      {/* Order form */}
      <section id="order" className="scroll-mt-24 bg-black pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="rounded-2xl border border-gold bg-gradient-to-b from-[#1c5a24] via-[#0b2410] via-30% to-black p-5 sm:p-8">
            <div className="text-center">
              <h2 className="display text-4xl sm:text-6xl">
                <span className="text-gradient">Order Your Catering</span> Today
              </h2>
              <p className="mt-3 text-lg text-white/90">Ready to bring the flavors of Jamaica to your next event? Contact us today to discuss your catering needs!</p>
              <p className="mt-5 inline-flex items-center gap-2 rounded-full bg-black/45 px-5 py-2 text-white">
                <span aria-hidden>⚠️</span> Please submit your party request at least 24 hours in advance.
              </p>
            </div>

            <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_1.3fr]">
              {/* Cart */}
              <div>
                <h3 className="display text-2xl">Catering Items Added:</h3>
                {lines.length === 0 ? (
                  <p className="mt-3 text-sm text-white/60">
                    No items yet. Use the <span className="font-bold text-[#2fbf4a]">+</span> buttons in the menu above to add trays.
                  </p>
                ) : (
                  <ul className="mt-4 space-y-3">
                    {lines.map((l) => (
                      <li key={l.key} className="flex items-center gap-3 rounded-lg border border-white/10 bg-black/40 p-2">
                        <div className="relative size-16 shrink-0 overflow-hidden rounded-md">
                          {l.item.image ? <Image src={l.item.image} alt="" fill sizes="64px" className="object-cover" /> : <JLogo />}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="display truncate text-lg leading-tight">{l.item.name}</p>
                          <p className="text-xs text-white/70">
                            {l.label} · Qty: {l.qty}
                          </p>
                          <p className="text-sm font-semibold text-gold">Total: {l.total}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => change(l.item, l.label, -l.qty)}
                          aria-label={`Remove ${l.item.name} ${l.label}`}
                          className="grid size-8 shrink-0 place-items-center rounded-full border border-white/20 text-white/80 transition hover:border-chili hover:text-chili"
                        >
                          ✕
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Form */}
              <form onSubmit={onSubmit} className="grid gap-5 sm:grid-cols-2">
                <Field label="Full Name">
                  <input name="name" required placeholder="Eg: Alex Preet" className={fieldCls} />
                </Field>
                <Field label="Email">
                  <input name="email" type="email" required placeholder="example@gmail.com" className={fieldCls} />
                </Field>
                <Field label="Phone">
                  <input name="phone" type="tel" required placeholder="(896) 235 0102" className={fieldCls} />
                </Field>
                <Field label="Event Date">
                  <input name="date" type="date" required className={fieldCls} />
                </Field>
                <Field label="Total Guest">
                  <input name="guests" type="number" min={1} required placeholder="00" className={fieldCls} />
                </Field>
                <Field label="Event Start Time">
                  <input name="start" type="time" required className={fieldCls} />
                </Field>
                <Field label="Event End Time">
                  <input name="end" type="time" required className={fieldCls} />
                </Field>
                <Field label="Select Location">
                  <select name="location" required defaultValue={locations[0]} className={fieldCls}>
                    {locations.map((l) => (
                      <option key={l}>{l}</option>
                    ))}
                  </select>
                </Field>
                <Field label="Message" required={false} className="sm:col-span-2">
                  <textarea name="message" rows={5} placeholder="Type your message..." className={fieldCls} />
                </Field>
                <div className="sm:col-span-2">
                  <button type="submit" className="btn-primary w-full rounded-md py-3 text-lg font-semibold shadow-none">
                    Send It
                  </button>
                  {sent && (
                    <p role="status" className="mt-3 text-center text-sm text-leaf">
                      Your email app should open with your order and details filled in. We&apos;ll be in touch!
                    </p>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
