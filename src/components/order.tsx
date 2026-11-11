"use client";

import { createContext, useContext, useRef, useState, type ReactNode } from "react";
import { locations, type Location, type PlatformId } from "@/data/site";

type Mode = "pickup" | "delivery";

const OrderContext = createContext<() => void>(() => {});

/** Brand tiles for each ordering platform (simple stand-ins; swap for official logo files if you have them). */
const platforms: Record<PlatformId, { name: string; tile: ReactNode }> = {
  doordash: {
    name: "DoorDash",
    tile: (
      <span className="grid size-full place-items-center bg-[#FF3008] text-[9px] font-black tracking-tight text-white">DOORDASH</span>
    ),
  },
  ubereats: {
    name: "Uber Eats",
    tile: (
      <span className="grid size-full place-items-center bg-black text-center text-[15px] font-semibold leading-[1.05] text-white">
        <span>
          Uber
          <br />
          <span className="text-[#06C167]">Eats</span>
        </span>
      </span>
    ),
  },
  toast: {
    name: "Toast",
    tile: (
      <span className="grid size-full place-items-center bg-[#FF4C00]">
        <svg viewBox="0 0 24 24" className="size-8" fill="none" stroke="white" strokeWidth="2.2" strokeLinejoin="round" aria-hidden>
          <path d="M6 20V11a4 4 0 0 1-1-7h14a4 4 0 0 1-1 7v9z" />
        </svg>
      </span>
    ),
  },
  direct: {
    name: "Direct Pickup",
    tile: (
      <span className="grid size-full place-items-center bg-[#FFE500]">
        <svg viewBox="0 0 24 24" className="size-8" aria-hidden>
          <path
            fill="#111"
            d="M6.6 10.8a15.2 15.2 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1z"
          />
        </svg>
      </span>
    ),
  },
};

function ModeToggle({ mode, onChange, light }: { mode: Mode; onChange: (m: Mode) => void; light?: boolean }) {
  return (
    <div role="radiogroup" aria-label="Order type" className="relative grid shrink-0 grid-cols-2 rounded-full bg-white/20 p-1">
      <span
        aria-hidden
        className={`absolute inset-y-1 left-1 w-[calc(50%-4px)] rounded-full transition-[transform,background-color] duration-300 ease-out ${
          light ? "bg-white" : "bg-[#5ee26f]"
        } ${mode === "delivery" ? "translate-x-full" : ""}`}
      />
      {(["pickup", "delivery"] as const).map((m) => (
        <button
          key={m}
          type="button"
          role="radio"
          aria-checked={mode === m}
          onClick={() => onChange(m)}
          className={`relative z-10 rounded-full px-5 py-2 text-sm font-medium capitalize transition-colors duration-300 sm:px-6 sm:text-base ${
            mode === m ? "text-black" : "text-white"
          }`}
        >
          {m}
        </button>
      ))}
    </div>
  );
}

/** Site-wide "Order Now" popup: choose pickup/delivery and a location, then an ordering platform. */
export function OrderProvider({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDialogElement>(null);
  const [mode, setMode] = useState<Mode>("pickup");
  const [loc, setLoc] = useState<Location | null>(null);

  // Same order as the live site: HQ last.
  const openLocations = locations.filter((l) => !l.comingSoon && l.orderPopup !== false).sort((a, b) => Number(!!a.hq) - Number(!!b.hq));
  const open = () => {
    setLoc(null);
    ref.current?.showModal();
  };
  const close = () => ref.current?.close();
  const links = loc ? loc.order[mode] : [];

  return (
    <OrderContext.Provider value={open}>
      {children}
      <dialog
        ref={ref}
        aria-labelledby="order-title"
        onClick={(e) => e.target === ref.current && close()}
        className="m-auto w-[min(94vw,680px)] overflow-visible bg-transparent p-0 text-white backdrop:bg-black/75"
      >
        <div className="relative rounded-2xl border border-white/10 bg-gradient-to-b from-[#6e6e6e] via-[#3a3a3a] to-[#161616] p-4 shadow-2xl shadow-black/60 sm:p-6">
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="absolute right-3 top-3 grid size-6 place-items-center rounded border border-white/40 text-sm leading-none text-white/80 hover:bg-white/10 hover:text-white"
          >
            ×
          </button>

          <div className="mb-6 flex flex-wrap items-center justify-between gap-4 pr-6 sm:pl-3">
            <h2 id="order-title" className="display text-4xl sm:text-5xl">
              {loc ? "Order Online Now" : "Select Location"}
            </h2>
            <ModeToggle mode={mode} onChange={setMode} light={!!loc} />
          </div>

          {!loc ? (
            <ul className="grid gap-3 sm:grid-cols-2">
              {openLocations.map((l) => (
                <li key={l.slug}>
                  <button
                    type="button"
                    onClick={() => setLoc(l)}
                    className="display w-full rounded-xl border border-white/25 bg-gradient-to-b from-[#3a3a3a] to-[#111] px-4 py-5 text-2xl transition hover:-translate-y-0.5 hover:border-leaf/70 sm:text-3xl"
                  >
                    {l.short.toUpperCase()}
                    {l.hq && <span className="text-[#5ee26f]"> (HQ)</span>}
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <>
              {links.length > 0 ? (
                <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {links.map((o) => {
                    const p = platforms[o.platform];
                    return (
                      <li key={o.platform} className="flex flex-col items-center rounded-xl border border-white/25 bg-white/[0.04] px-3 pb-4 pt-4 text-center">
                        <span className="size-14 overflow-hidden rounded-xl">{p.tile}</span>
                        <h3 className="display mt-3 whitespace-nowrap text-xl sm:text-2xl">{p.name}</h3>
                        <p className="text-sm text-white/70 underline underline-offset-2">{mode === "pickup" ? "Pickup Option" : "Delivery Service"}</p>
                        {o.href && o.href !== "#" ? (
                          <a
                            href={o.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-3 inline-flex w-full items-center justify-center rounded-[4px] bg-gradient-brand px-3 py-2.5 font-semibold text-ink transition hover:brightness-110"
                          >
                            Order Now
                          </a>
                        ) : (
                          <span
                            aria-disabled="true"
                            className="mt-3 inline-flex w-full cursor-not-allowed items-center justify-center whitespace-nowrap rounded-[4px] border border-white/20 px-2 py-2.5 text-sm font-semibold text-white/50"
                          >
                            Coming soon
                          </span>
                        )}
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <p className="py-6 text-center text-white/75">No {mode} options at this location yet.</p>
              )}
            </>
          )}
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
