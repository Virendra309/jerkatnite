"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { images, nav } from "@/data/site";
import { OrderButton } from "./order";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-colors ${
        scrolled || open ? "bg-ink/85 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6">
        <Link href="/" aria-label="Jerk at Nite home" className="shrink-0">
          <Image src={images.logo} alt="Jerk at Nite" width={174} height={30} priority />
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-7 text-sm font-semibold">
            {nav.map((item) => {
              const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              return (
                <li key={item.href}>
                  <Link href={item.href} className={active ? "text-gold" : "text-white/85 hover:text-gold"}>
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <OrderButton className="hidden sm:inline-flex" />
          <button
            className="rounded-lg p-2 lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="block h-0.5 w-6 bg-white transition" style={{ transform: open ? "translateY(6px) rotate(45deg)" : "none" }} />
            <span className="mt-1.5 block h-0.5 w-6 bg-white transition" style={{ opacity: open ? 0 : 1 }} />
            <span className="mt-1.5 block h-0.5 w-6 bg-white transition" style={{ transform: open ? "translateY(-10px) rotate(-45deg)" : "none" }} />
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className="border-t border-white/10 px-4 pb-6 lg:hidden">
          <ul className="grid gap-1 pt-3">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} onClick={() => setOpen(false)} className="block rounded-lg px-3 py-3 text-lg font-semibold hover:bg-white/5">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <OrderButton className="mt-4 w-full sm:hidden" />
        </nav>
      )}
    </header>
  );
}
