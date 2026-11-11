"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { images, nav, type NavLink } from "@/data/site";
import { OrderButton } from "./order";

function isActive(pathname: string, item: NavLink) {
  if (item.href === "/") return pathname === "/";
  return [item, ...(item.children ?? [])].some((l) => pathname === l.href || pathname.startsWith(`${l.href}/`));
}

function Chevron({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 448 512" className={`size-3.5 fill-current transition-transform duration-300 ${className}`}>
      <path d="M207 381.5 12.7 187.1c-9.4-9.4-9.4-24.6 0-33.9l22.7-22.7c9.4-9.4 24.5-9.4 33.9 0L224 284.5l154.7-154c9.4-9.3 24.5-9.3 33.9 0l22.7 22.7c9.4 9.4 9.4 24.6 0 33.9L241 381.5c-9.4 9.4-24.6 9.4-34 0z" />
    </svg>
  );
}

/** Gradient (gold → green) diagonal arrow used in the dropdowns. */
function ArrowUpRight() {
  // Unique per instance: a shared gradient id breaks when the panel that defines it is hidden.
  const id = useId();
  return (
    <svg aria-hidden viewBox="0 0 24 24" fill="none" className="size-5 shrink-0">
      <defs>
        <linearGradient id={id} x1="6" y1="18" x2="18" y2="6" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFD700" />
          <stop offset="1" stopColor="#34A853" />
        </linearGradient>
      </defs>
      <path d="M9.4 6H18v8.6M6 18 17.9 6.1" stroke={`url(#${id})`} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [dropdown, setDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);

  // Like the live site: transparent at the top, a light blur once the page scrolls.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close an open dropdown on outside click or Escape.
  useEffect(() => {
    if (!dropdown) return;
    const onClick = (e: MouseEvent) => !navRef.current?.contains(e.target as Node) && setDropdown(null);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setDropdown(null);
    document.addEventListener("click", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [dropdown]);

  const closeAll = () => {
    setOpen(false);
    setDropdown(null);
  };

  return (
    <header
      // The blur sits on a ::before layer: a backdrop-filter on an ancestor would stop the dropdown panels from blurring.
      className={`fixed inset-x-0 top-0 z-40 before:absolute before:inset-0 before:-z-10 before:transition-[backdrop-filter,background-color] before:duration-300 ${
        open ? "before:bg-black/90 before:backdrop-blur-md" : scrolled ? "before:backdrop-blur-[6px]" : ""
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6">
        <Link href="/" aria-label="Jerk at Nite home" className="shrink-0">
          <Image src={images.logo} alt="Jerk at Nite" width={174} height={30} priority />
        </Link>

        {/* Desktop menu: dark glass capsule; current page and hovered items get a white pill. */}
        <nav ref={navRef} aria-label="Main" className="hidden lg:block">
          <ul className="relative isolate flex items-center gap-0.5 whitespace-nowrap rounded-full p-1 text-[15px] font-medium shadow-lg shadow-black/20 before:absolute before:inset-0 before:-z-10 before:rounded-full before:bg-black/45 before:backdrop-blur-md xl:gap-1 xl:text-base">
            {nav.map((item) => {
              const active = isActive(pathname, item);
              const pillBase = "rounded-full transition-colors duration-300";

              if (!item.children) {
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={`block px-3.5 py-2.5 xl:px-[18px] ${pillBase} ${
                        active ? "bg-white text-black" : "text-white hover:bg-white hover:text-black focus-visible:bg-white focus-visible:text-black"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              }

              const expanded = dropdown === item.label;
              const highlighted = active || expanded;
              return (
                <li key={item.href} className="group relative">
                  <div
                    className={`flex items-center ${pillBase} ${
                      highlighted ? "bg-white text-black" : "text-white group-hover:bg-white group-hover:text-black group-focus-within:bg-white group-focus-within:text-black"
                    }`}
                  >
                    <Link
                      href={item.href}
                      aria-current={pathname === item.href ? "page" : undefined}
                      onClick={closeAll}
                      className="py-2.5 pl-3.5 pr-1.5 xl:pl-[18px]"
                    >
                      {item.label}
                    </Link>
                    <button
                      type="button"
                      aria-label={`${expanded ? "Close" : "Open"} ${item.label} menu`}
                      aria-expanded={expanded}
                      aria-controls={`menu-${item.label}`}
                      onClick={() => setDropdown(expanded ? null : item.label)}
                      className="py-3 pl-1 pr-3.5 xl:pr-[18px]"
                    >
                      <Chevron className={expanded ? "rotate-180" : "group-hover:rotate-180"} />
                    </button>
                  </div>

                  {/* pt-4 bridges the gap so hover isn't lost moving into the panel */}
                  <div
                    id={`menu-${item.label}`}
                    className={`absolute left-1/2 top-full z-20 w-60 -translate-x-1/2 pt-4 ${expanded ? "block" : "hidden group-hover:block"}`}
                  >
                    <ul className="overflow-hidden rounded-lg border border-white/15 bg-gradient-to-b from-[#6b6b6b]/85 to-[#2b2b2b]/85 shadow-2xl shadow-black/40 backdrop-blur-xl">
                      {item.children.map((child) => (
                        <li key={child.href} className="border-b border-white/15 last:border-b-0">
                          <Link
                            href={child.href}
                            onClick={closeAll}
                            aria-current={pathname === child.href ? "page" : undefined}
                            className="flex items-center justify-between gap-3 px-4 py-3.5 text-sm font-medium text-white transition-colors duration-200 hover:text-gold focus-visible:text-gold aria-[current=page]:text-gold"
                          >
                            {child.label}
                            <ArrowUpRight />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <OrderButton className="hidden whitespace-nowrap rounded-md px-5 py-2.5 sm:inline-flex" />
          <button
            className="rounded-lg p-2 lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="block h-0.5 w-6 bg-white transition" style={{ transform: open ? "translateY(8px) rotate(45deg)" : "none" }} />
            <span className="mt-1.5 block h-0.5 w-6 bg-white transition" style={{ opacity: open ? 0 : 1 }} />
            <span className="mt-1.5 block h-0.5 w-6 bg-white transition" style={{ transform: open ? "translateY(-8px) rotate(-45deg)" : "none" }} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className="max-h-[calc(100vh-5rem)] overflow-y-auto border-t border-white/10 px-4 pb-6 lg:hidden">
          <ul className="grid gap-1 pt-3">
            {nav.map((item) => {
              const active = isActive(pathname, item);
              const expanded = dropdown === item.label;
              return (
                <li key={item.href}>
                  <div className={`flex items-center justify-between rounded-full ${active ? "bg-white text-black" : "text-white"}`}>
                    <Link href={item.href} onClick={closeAll} className="flex-1 px-5 py-3 text-lg font-medium">
                      {item.label}
                    </Link>
                    {item.children && (
                      <button
                        type="button"
                        aria-label={`${expanded ? "Close" : "Open"} ${item.label} menu`}
                        aria-expanded={expanded}
                        onClick={() => setDropdown(expanded ? null : item.label)}
                        className="px-5 py-4"
                      >
                        <Chevron className={expanded ? "rotate-180" : ""} />
                      </button>
                    )}
                  </div>
                  {item.children && expanded && (
                    <ul className="mt-1 grid gap-1 pl-4">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link href={child.href} onClick={closeAll} className="flex items-center justify-between rounded-xl px-4 py-2.5 text-white/85 hover:bg-white/5">
                            {child.label}
                            <span aria-hidden className="text-gradient font-bold">↗</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
          <OrderButton className="mt-4 w-full sm:hidden" />
        </nav>
      )}
    </header>
  );
}
