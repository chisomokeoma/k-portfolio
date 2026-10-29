import type { CSSProperties, ReactNode } from "react";

/** Props that opt an element into the scroll reveal (styles in globals.css). */
export function reveal(delay = 0, variant: "" | "line" | "stack" = "") {
  return {
    "data-reveal": variant,
    style: { "--reveal-delay": `${delay}ms` } as CSSProperties,
  };
}

export const underlineClass =
  "relative after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 hover:after:scale-x-100";

export function Container({
  className = "",
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={`mx-auto w-full max-w-[1440px] px-6 lg:px-20 ${className}`}>
      {children}
    </div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  className = "",
}: {
  eyebrow: string;
  title: string;
  className?: string;
}) {
  return (
    <div className={`flex flex-col gap-4 text-center ${className}`}>
      <p {...reveal()} className="text-small uppercase text-white/80 lg:text-body">
        {eyebrow}
      </p>
      <h2 {...reveal(120)} className="mx-auto text-title text-white lg:text-display">
        {title}
      </h2>
    </div>
  );
}

const TONES = {
  forest: "bg-forest",
  olive: "bg-olive",
  send: "bg-send",
} as const;

export function buttonClass(tone: keyof typeof TONES = "forest") {
  return `inline-flex h-12 w-full items-center justify-center rounded px-4 text-caption leading-none uppercase text-white transition-[opacity,transform] duration-300 hover:-translate-y-0.5 hover:opacity-90 active:translate-y-0 lg:h-[41px] lg:w-fit ${TONES[tone]}`;
}

export function Button({
  href,
  tone = "forest",
  children,
}: {
  href: string;
  tone?: keyof typeof TONES;
  children: ReactNode;
}) {
  return (
    <a href={href} className={buttonClass(tone)}>
      {children}
    </a>
  );
}

export const pillGroupClass =
  "inline-flex w-fit rounded-lg border border-[#eeeeee] bg-[#f6f6f6] p-2";

export function pillClass(active: boolean) {
  return `flex h-10 min-w-[135px] items-center justify-center gap-2 rounded-lg px-3 text-small lg:text-body transition-colors ${
    active ? "bg-white text-black" : "text-black/60 hover:text-black"
  }`;
}
