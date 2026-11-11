"use client";

import { createContext, useContext, useRef, type ReactNode } from "react";
import { locations } from "@/data/site";

const OrderContext = createContext<() => void>(() => {});

/** Provides a site-wide "Order Now" dialog listing each location's ordering links. */
export function OrderProvider({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDialogElement>(null);
  const open = () => ref.current?.showModal();

  return (
    <OrderContext.Provider value={open}>
      {children}
      <dialog
        ref={ref}
        aria-labelledby="order-title"
        onClick={(e) => e.target === ref.current && ref.current?.close()}
        className="m-auto w-[min(92vw,640px)] rounded-2xl border border-white/10 bg-ink-2 p-0 text-white backdrop:bg-black/70 backdrop:backdrop-blur-sm"
      >
        <div className="p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <h2 id="order-title" className="display text-4xl">
              Order <span className="text-gradient">Now</span>
            </h2>
            <button
              onClick={() => ref.current?.close()}
              aria-label="Close"
              className="rounded-full p-2 text-2xl leading-none text-white/70 hover:bg-white/10 hover:text-white"
            >
              ×
            </button>
          </div>
          <p className="mt-2 text-white/70">Pick your nearest location for pickup or delivery.</p>
          <ul className="mt-6 grid gap-4">
            {locations.map((loc) => (
              <li key={loc.slug} className="rounded-xl border border-white/10 bg-ink-3/60 p-4">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="display text-2xl">{loc.city}</h3>
                  {loc.comingSoon && <span className="rounded-full bg-gold/15 px-3 py-1 text-xs font-semibold text-gold">Coming soon</span>}
                </div>
                {loc.order.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {loc.order.map((o) => (
                      <a
                        key={o.label}
                        href={o.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-full border border-leaf/50 px-4 py-2 text-sm font-semibold hover:bg-leaf hover:text-ink"
                      >
                        {o.label}
                      </a>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </dialog>
    </OrderContext.Provider>
  );
}

export function OrderButton({
  children = "Order Now",
  className = "",
  variant = "primary",
}: {
  children?: ReactNode;
  className?: string;
  variant?: "primary" | "ghost";
}) {
  const open = useContext(OrderContext);
  return (
    <button type="button" onClick={open} className={`${variant === "primary" ? "btn-primary" : "btn-ghost"} ${className}`}>
      {children}
    </button>
  );
}
