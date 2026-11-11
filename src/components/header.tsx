"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { images, nav, type NavLink } from "@/data/site";
import { OrderButton } from "./order";

function isActive(pathname: string, item: NavLink) {
  if (item.href === "/") return pathname === "/";
  return [item, ...(item.children ?? [])].some((l) => pathname === l.href || pathname.startsWith(`${l.href}/`));
}

function Chevron({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 448 512" className={`size-3.5 fill-current transition-transform ${className}`}>
      <path d="M207 381.5 12.7 187.1c-9.4-9.4-9.4-24.6 0-33.9l22.7-22.7c9.4-9.4 24.5-9.4 33.9 0L224 284.5l154.7-154c9.4-9.3 24.5-9.3 33.9 0l22.7 22.7c9.4 9.4 9.4 24.6 0 33.9L241 381.5c-9.4 9.4-24.6 9.4-34 0z" />
    </svg>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [dropdown, setDropdown] = useState<string | null>(null);
  const [hovered, setHovered] = useState<number | null>(null);
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);
  const itemRefs = useRef<(HTMLElement | null)[]>([]);
  const pillRef = useRef<HTMLSpanElement>(null);

  // The white pill sits on the hovered/open item, otherwise on the current page.
  const activeIndex = nav.findIndex((item) => isActive(pathname, item));
  const openIndex = nav.findIndex((item) => item.label === dropdown);
  const target = hovered ?? (openIndex >= 0 ? openIndex : activeIndex);

  // Move the pill by writing its position straight to the DOM (no re-render needed).
  useLayoutEffect(() => {
    const pill = pillRef.current;
    if (!pill) return;
    const place = (animate: boolean) => {
      const el = itemRefs.current[target];
      if (!el) {
        pill.style.opacity = "0";
        return;
      }
      pill.style.transitionProperty = animate ? "left, width, opacity" : "opacity";
      pill.style.left = `${el.offsetLeft}px`;
      pill.style.width = `${el.offsetWidth}px`;
      pill.style.opacity = "1";
    };
    place(pill.dataset.ready === "1");
    pill.dataset.ready = "1";
    const onResize = () => place(false);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [target]);

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
    // Same look at every scroll position (no scroll-triggered changes): blurred dark bar, menu in a glass capsule.
    <header className={`fixed inset-x-0 top-0 z-40 border-b border-white/5 backdrop-blur-md ${open ? "bg-black/90" : "bg-black/55"}`}>
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6">
        <Link href="/" aria-label="Jerk at Nite home" className="shrink-0">
          <Image src={images.logo} alt="Jerk at Nite" width={174} height={30} priority />
        </Link>

        {/* Desktop menu */}
        <nav ref={navRef} aria-label="Main" className="hidden lg:block">
          <ul
            onMouseLeave={() => setHovered(null)}
            onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && setHovered(null)}
            className="relative flex items-center gap-0.5 whitespace-nowrap rounded-full border border-white/10 bg-white/[0.06] p-1.5 text-[15px] font-medium shadow-lg shadow-black/30 backdrop-blur-md xl:gap-1 xl:text-[17px]"
          >
            <span
              ref={pillRef}
              aria-hidden
              className="pointer-events-none absolute inset-y-1.5 rounded-full bg-white opacity-0 shadow-md duration-300 ease-out"
            />
            {nav.map((item, i) => {
              const active = isActive(pathname, item);
              const pill = `relative z-10 rounded-full transition-colors duration-300 ${i === target ? "text-black" : "text-white"}`;
              const track = {
                ref: (el: HTMLElement | null) => {
                  itemRefs.current[i] = el;
                },
                onMouseEnter: () => setHovered(i),
                onFocus: () => setHovered(i),
              };

              if (!item.children) {
                return (
                  <li key={item.href} {...track}>
                    <Link href={item.href} aria-current={active ? "page" : undefined} className={`block px-3.5 py-2.5 xl:px-5 ${pill}`}>
                      {item.label}
                    </Link>
                  </li>
                );
              }

              const expanded = dropdown === item.label;
              return (
                <li key={item.href} className="group relative" {...track}>
                  <div className={`flex items-center ${pill}`}>
                    <Link href={item.href} aria-current={pathname === item.href ? "page" : undefined} onClick={closeAll} className="py-2.5 pl-3.5 pr-1.5 xl:pl-5">
                      {item.label}
                    </Link>
                    <button
                      type="button"
                      aria-label={`${expanded ? "Close" : "Open"} ${item.label} menu`}
                      aria-expanded={expanded}
                      aria-controls={`menu-${item.label}`}
                      onClick={() => setDropdown(expanded ? null : item.label)}
                      className="py-3 pl-1 pr-3 xl:pr-4"
                    >
                      <Chevron className={expanded ? "rotate-180" : "group-hover:rotate-180"} />
                    </button>
                  </div>

                  {/* pt-3 bridges the gap so hover isn't lost moving into the panel */}
                  <div
                    id={`menu-${item.label}`}
                    className={`absolute left-1/2 top-full z-20 w-64 -translate-x-1/2 pt-3 ${
                      expanded ? "block" : "hidden group-hover:block"
                    }`}
                  >
                    <ul className="overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-ink-3 to-black p-2 shadow-2xl shadow-black/60">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            onClick={closeAll}
                            aria-current={pathname === child.href ? "page" : undefined}
                            className="flex items-center justify-between rounded-xl px-4 py-3 text-base text-white transition-colors hover:bg-white/10 aria-[current=page]:text-gold"
                          >
                            {child.label}
                            <span aria-hidden className="text-gradient text-lg font-bold">↗</span>
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
          <OrderButton className="hidden whitespace-nowrap sm:inline-flex" />
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
