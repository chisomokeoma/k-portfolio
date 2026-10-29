import Image from "next/image";
import { Fragment, type ReactNode } from "react";
import { CONTACT_EMAIL, PRIMARY_LINKS, SECONDARY_LINKS, type NavLink } from "@/lib/links";
import { Container, underlineClass } from "./ui";

function LinkRow({ links }: { links: NavLink[] }) {
  return (
    <p className="flex items-center gap-4">
      {links.map((link, i) => (
        <Fragment key={link.href}>
          {i > 0 && (
            <span aria-hidden className="text-sm text-mist/40">
              /
            </span>
          )}
          <a
            href={link.href}
            className={`text-caption uppercase text-mist transition-colors hover:text-white ${underlineClass}`}
          >
            {link.label}
          </a>
        </Fragment>
      ))}
    </p>
  );
}

function Detail({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-1">
      <p className="text-[10px] leading-[13px] font-medium tracking-[0.4px] uppercase text-mist/60">{label}</p>
      {children}
    </div>
  );
}

function Copyright({ className }: { className: string }) {
  return <p className={`text-[10px] leading-[13px] text-mist/60 ${className}`}>© 2026 — Copyright</p>;
}

export default function Footer() {
  return (
    <footer className="bg-ink text-white">
      <Container>
        <div className="relative grid gap-6 border-t border-white/10 py-6 lg:grid-cols-3">
          <div className="flex flex-col gap-6 lg:justify-between">
            <p className="text-[23px] leading-[30px] font-medium">AMAFINA KELVIN</p>
            <nav aria-label="Footer" className="flex flex-col gap-3">
              <LinkRow links={PRIMARY_LINKS} />
              <LinkRow links={SECONDARY_LINKS} />
            </nav>
          </div>

          <div className="flex flex-col gap-6 text-mist">
            <Detail label="Contact us">
              <p className="text-[20px] leading-6 font-medium tracking-[-0.4px]">+1 999 888-76-54</p>
            </Detail>
            <Detail label="Email">
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className={`w-fit text-sm transition-colors hover:text-white ${underlineClass}`}
              >
                {CONTACT_EMAIL}
              </a>
            </Detail>
            <Detail label="Address">
              <p className="flex items-center gap-1.5 text-sm">
                Ukraine <span aria-hidden className="text-[10px]">•</span> Nigeria
              </p>
            </Detail>
            <Copyright className="lg:hidden" />
          </div>

          <div className="absolute right-0 top-4 flex flex-col items-end justify-between lg:static lg:py-0">
            <a
              href="#top"
              aria-label="Back to top"
              className="transition-transform duration-300 hover:-translate-y-1"
            >
              <Image src="/icons/to-top.svg" alt="" width={40} height={40} />
            </a>
            <Copyright className="hidden lg:block" />
          </div>
        </div>
      </Container>
    </footer>
  );
}
