import Image from "next/image";
import { Container, SectionHeading, reveal } from "./ui";

const VIDEO_URL = "https://youtu.be/CKb076fHz7Q";

export default function Interviews() {
  const external = VIDEO_URL.startsWith("http");

  return (
    <section id="interviews" className="scroll-mt-12 bg-ink py-16 text-white lg:scroll-mt-16">
      <Container className="flex flex-col gap-10">
        <SectionHeading
          eyebrow="Interviews"
          title="Conversations on African infrastructure, diaspora capital, and the systems that decide whether things work."
        />

        <div
          {...reveal(150)}
          className="grid min-h-[554px] place-items-center rounded-[10px] border border-white/10 bg-white/[0.02] px-[31px] lg:h-[652px]"
        >
          <a
            href={VIDEO_URL}
            {...(external && { target: "_blank", rel: "noopener noreferrer" })}
            className="group w-full max-w-[346px] rounded-md bg-ink p-1 transition-transform duration-500 ease-(--ease-soft) hover:-translate-y-1 lg:max-w-[690px] lg:rounded-xl lg:p-2"
          >
            <div className="relative aspect-[674/382] overflow-hidden rounded-md lg:rounded-xl">
              <Image
                src="/images/interview-thumb.jpg"
                alt="Joe Hotagua and Amafina Kelvin on Authentic African"
                fill
                sizes="(min-width: 1024px) 674px, 346px"
                className="object-cover transition-transform duration-[1.2s] ease-(--ease-soft) group-hover:scale-105"
              />
            </div>
            <div className="flex items-center gap-3 py-1.5 lg:gap-6 lg:py-3">
              <div className="flex flex-1 flex-col gap-1 lg:gap-2">
                <h3 className="text-caption lg:text-body">
                  Why Africa&apos;s Mega-Projects Fail — And How &ldquo;Modular&rdquo; Infrastructure
                  Is the Real Solution
                </h3>
                <p className="flex items-center gap-2 text-[11px] leading-4 text-white/80 lg:text-caption">
                  <span>Langovest</span>
                  <span aria-hidden>•</span>
                  <span>Youtube</span>
                </p>
              </div>
              <span className="relative flex-none">
                <span aria-hidden className="absolute inset-0 animate-soft-ping rounded-full bg-white/25" />
                <Image
                  src="/icons/play.svg"
                  alt="Play"
                  width={48}
                  height={48}
                  className="relative size-6 transition-transform group-hover:scale-110 lg:size-12"
                />
              </span>
            </div>
          </a>
        </div>
      </Container>
    </section>
  );
}
