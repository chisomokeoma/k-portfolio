"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { PRIMARY_LINKS, SECONDARY_LINKS, type NavLink } from "@/lib/links";
import { underlineClass } from "./ui";

function LinkList({ links }: { links: NavLink[] }) {
  return (
    <ul className="hidden gap-4 p-2 lg:flex">
      {links.map((link) => (
        <li key={link.href}>
          <a href={link.href} className="block py-2 text-caption uppercase">
            <span className={underlineClass}>{link.label}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // The design's glass bar only reads over the hero; darken it once the page scrolls.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 animate-fade-down border-b-[0.5px] border-white/20 text-white backdrop-blur-md transition-colors duration-300 ${
        scrolled || open ? "bg-ink/85" : "bg-linear-to-br from-white/5 to-[#999999]/5"
      }`}
    >
      <div className="relative mx-auto flex h-12 max-w-[1440px] items-center justify-between px-6 lg:h-[65px] lg:px-20">
        <LinkList links={PRIMARY_LINKS} />
        <a
          href="#top"
          className="text-[23px] leading-[30px] font-medium lg:absolute lg:left-1/2 lg:-translate-x-1/2"
        >
          AMAFINA KELVIN
        </a>
        <LinkList links={SECONDARY_LINKS} />
        <button
          type="button"
          className="lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <Image src="/icons/menu.svg" alt="" width={24} height={24} />
        </button>
      </div>

      {open && (
        <nav id="mobile-menu" className="border-t border-white/10 px-6 pb-6 pt-2 lg:hidden">
          <ul className="flex flex-col">
            {[...PRIMARY_LINKS, ...SECONDARY_LINKS].map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block border-b border-white/10 py-4 text-caption uppercase"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
