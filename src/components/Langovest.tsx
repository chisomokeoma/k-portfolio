import Image from "next/image";
import type { CSSProperties } from "react";
import { Button, Container, reveal } from "./ui";

// The card stack is laid out on the Figma frame's 509px grid and scaled with
// container-query units, so it keeps its proportions at any width.
const FRAME_W = 509;
const cq = (px: number) => `${((px / FRAME_W) * 100).toFixed(3)}cqw`;

type StackCard = {
  x: number;
  y: number;
  w: number;
  h: number;
  r: number;
  content?: {
    image: string;
    logo?: boolean;
    title: string;
    subtitle: string;
    titleSize: number;
    subtitleSize: number;
    gap: number;
  };
};

// Back-to-front, matching the Figma layer order.
const CARDS: StackCard[] = [
  { x: 68, y: 205, w: 373, h: 74, r: 7.4 },
  { x: 51, y: 192, w: 407, h: 81, r: 8.1 },
  {
    x: 28, y: 171, w: 453, h: 90, r: 9,
    content: {
      image: "/images/roundtable.jpg",
      title: "Africa Infrastructure Roundtable",
      subtitle: "Annual event · London, UK",
      titleSize: 21.4, subtitleSize: 18, gap: 22.5,
    },
  },
  {
    x: 15, y: 89, w: 478, h: 95, r: 9.5,
    content: {
      image: "/images/langovest-initiatives.png",
      title: "Langovest Initiatives Ltd",
      subtitle: "Community and ecosystem building",
      titleSize: 22.6, subtitleSize: 19, gap: 23.8,
    },
  },
  {
    x: 0, y: 0, w: 509, h: 101, r: 10.1,
    content: {
      image: "/images/langovest-logo.png",
      logo: true,
      title: "Langovest Ltd",
      subtitle: "Business and infrastructure development",
      titleSize: 24, subtitleSize: 20.2, gap: 25.3,
    },
  },
];

// On reveal, each card slides down from behind the front card (--fold), front card first.
function CardStack() {
  return (
    <div {...reveal(0, "stack")} className="@container relative aspect-[509/261] w-full max-w-[509px]">
      {CARDS.map(({ x, y, w, h, r, content }, i) => (
        <div
          key={`${x}-${y}`}
          className="absolute flex items-center overflow-hidden border border-olive/15 bg-leaf"
          style={
            {
              left: cq(x),
              top: cq(y),
              width: cq(w),
              height: cq(h),
              borderRadius: cq(r),
              gap: content ? cq(content.gap) : undefined,
              "--fold": `-${cq(y)}`,
              "--card-delay": `${250 + (CARDS.length - 1 - i) * 140}ms`,
            } as CSSProperties
          }
        >
          {content && (
            <>
              <div
                className={`relative h-full flex-none ${content.logo ? "bg-black" : ""}`}
                style={{ width: cq(h) }}
              >
                {content.logo ? (
                  <div className="absolute left-[8.9%] top-[10.9%] h-[78.2%] w-[82.2%]">
                    <Image src={content.image} alt="" fill sizes="100px" className="object-cover" />
                  </div>
                ) : (
                  <Image src={content.image} alt="" fill sizes="120px" className="object-cover" />
                )}
              </div>
              {/* Browser Inter runs a touch wider than Figma's Inter Display, so tighten and truncate. */}
              <div
                className="min-w-0 flex-1 tracking-[-0.02em] whitespace-nowrap [&>p]:truncate"
                style={{ paddingRight: cq(12) }}
              >
                <p className="font-medium leading-[1.3]" style={{ fontSize: cq(content.titleSize) }}>
                  {content.title}
                </p>
                <p className="leading-[1.4] text-black/70" style={{ fontSize: cq(content.subtitleSize * 0.96) }}>
                  {content.subtitle}
                </p>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default function Langovest() {
  return (
    <section id="langovest" className="scroll-mt-12 bg-lime-wash py-20 lg:scroll-mt-16">
      <Container>
        <div className="grid gap-4 lg:grid-cols-[572fr_641fr] lg:grid-rows-[auto_auto] lg:gap-x-[67px] lg:gap-y-11">
          <div {...reveal()} className="flex flex-col gap-4 lg:gap-11 lg:self-end">
            <p className="text-small font-medium text-olive/80 lg:text-lead lg:font-medium">Langovest</p>
            <h2 className="text-lead lg:text-display">
              Building the next generation of African infrastructure.
            </h2>
            <div className="text-small text-black/70 lg:text-body">
              <p>
                Langovest began as a question: why does capital from the African diaspora not flow
                more directly toward the infrastructure development priorities of the continent? The
                answer is not a lack of will. It is a lack of structure — the right instruments, the
                right access, and the right coordination.
              </p>
              <p>
                Langovest is my attempt to build that structure. Through two entities, we work at the
                intersection of infrastructure development, diaspora capital, and community ecosystem
                — investing in the systems that shape how Africans live, not only how goods move.
              </p>
            </div>
          </div>

          <div className="grid place-items-center rounded-xl border border-olive/20 px-0 py-8 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:h-[710px] lg:border-0 lg:px-16 lg:py-0">
            <CardStack />
          </div>

          <div {...reveal(200)} className="lg:col-start-1 lg:row-start-2 lg:self-start">
            {/* TODO: point at the Langovest website */}
            <Button href="#" tone="olive">
              Visit Langovest
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
