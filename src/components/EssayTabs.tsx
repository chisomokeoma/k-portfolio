"use client";

import Image from "next/image";
import { useState } from "react";
import { pillClass, pillGroupClass, reveal } from "./ui";

type Essay = {
  title: string;
  excerpt: string;
  year: string;
  readTime: string;
  image: string;
  href: string;
};

const TABS = [
  { id: "essays", label: "Essays", icon: "/icons/essay.svg" },
  { id: "manifesto", label: "Manifesto", icon: "/icons/quill.svg" },
] as const;

type TabId = (typeof TABS)[number]["id"];

const WRITING: Record<TabId, Essay[]> = {
  essays: [
    {
      title: "The Return of a Civilization",
      excerpt:
        "Infrastructure, historical cycles, and the conditions assembling for Africa's next development phase.",
      year: "2026",
      readTime: "12 Mins Read",
      image: "/images/essay-landscape.jpg",
      href: "#",
    },
  ],
  manifesto: [],
};

function EssayCard({ essay }: { essay: Essay }) {
  return (
    <article className="group relative h-[385px] overflow-hidden rounded-[7.7px]">
      <Image
        src={essay.image}
        alt=""
        fill
        sizes="(min-width: 1440px) 1280px, 100vw"
        className="object-cover transition-transform duration-[1.2s] ease-(--ease-soft) group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-black/40 transition-colors duration-500 group-hover:bg-black/50" />
      <div className="absolute inset-x-3 bottom-[22px] flex max-w-[525px] flex-col text-white lg:inset-x-6">
        <h3 className="text-title font-medium lg:text-heading">{essay.title}</h3>
        <p className="text-caption text-white/80 lg:text-small">{essay.excerpt}</p>
        <p className="mt-1 flex items-center gap-2 text-caption font-medium text-white/80">
          <span>{essay.year}</span>
          <span aria-hidden>•</span>
          <span>{essay.readTime}</span>
        </p>
        <a
          href={essay.href}
          className="mt-2.5 w-fit rounded-[3.85px] bg-white/10 px-[19px] py-[11px] text-[15.4px] leading-none backdrop-blur-sm transition-colors hover:bg-white/20"
        >
          Read
        </a>
      </div>
    </article>
  );
}

export default function EssayTabs() {
  const [tab, setTab] = useState<TabId>("essays");
  const items = WRITING[tab];

  return (
    <div className="flex flex-col gap-5">
      <div {...reveal()} className="flex flex-col gap-4">
        <h2 className="text-small uppercase text-black/80 lg:text-body">Writing</h2>
        <div role="tablist" aria-label="Writing type" className={pillGroupClass}>
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={tab === t.id}
              onClick={() => setTab(t.id)}
              className={pillClass(tab === t.id)}
            >
              <Image
                src={t.icon}
                alt=""
                width={16}
                height={16}
                className={`transition-[opacity,filter] ${tab === t.id ? "" : "opacity-60 grayscale"}`}
              />
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Stable wrapper for the scroll reveal; the keyed panel re-animates on tab change. */}
      <div {...reveal(120)}>
        <div key={tab} role="tabpanel" className="animate-fade-up">
          {items.length ? (
            <div className="flex flex-col gap-2">
              {items.map((essay) => (
                <EssayCard key={essay.title} essay={essay} />
              ))}
            </div>
          ) : (
            <div className="grid h-[385px] place-items-center rounded-[7.7px] bg-[#f6f6f6] text-body text-black/60">
              Manifestos are on the way.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
