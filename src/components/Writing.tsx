import Image from "next/image";
import EssayTabs from "./EssayTabs";
import { Button, Container, pillClass, pillGroupClass, reveal } from "./ui";

export default function Writing() {
  return (
    <section id="writing" className="scroll-mt-12 bg-white py-14 lg:scroll-mt-16">
      <Container className="flex flex-col gap-10">
        <EssayTabs />

        <hr {...reveal(0, "line")} className="border-black/20" />

        <div id="extracts" className="flex scroll-mt-16 flex-col gap-5 lg:scroll-mt-20">
          <div {...reveal()} className={pillGroupClass}>
            <span className={pillClass(true)}>
              <Image src="/icons/note.svg" alt="" width={16} height={16} />
              Intellectual Extracts
            </span>
          </div>

          <div className="flex flex-col gap-[7px] lg:grid lg:grid-cols-[822fr_425fr] lg:gap-[33px]">
            <div {...reveal(100)} className="flex flex-col gap-[30px] py-6">
              <p className="text-small text-black/80 lg:text-title">
                I write about thinkers whose work catches my intellectual curiosity — not
                summaries, but extracts of what stays with me and how it shapes how I see the
                world. The first is James Grier Miller, whose theory of living systems became the
                intellectual foundation of everything I am building. Others, like the educational
                psychologist Benjamin Bloom, will follow as I encounter work worth sitting with.
              </p>
              <hr className="border-black/20" />
              <div className="flex flex-col gap-5 lg:max-w-[630px]">
                <blockquote className="flex flex-col gap-4 rounded-[2px] border-l border-black px-3.5">
                  <p className="text-title">
                    &ldquo;All living systems process matter, energy, and information across their
                    boundaries to maintain themselves against entropy.&rdquo;
                  </p>
                  <footer className="text-body text-black/70">
                    James Grier Miller — Living Systems, 1978
                  </footer>
                </blockquote>
                <Button href="#">Read the first extract</Button>
              </div>
            </div>

            <div
              {...reveal(200)}
              className="group relative order-first h-[362px] overflow-hidden rounded-[7.7px] lg:order-none lg:h-auto lg:min-h-[421px]"
            >
              <Image
                src="/images/pen.jpg"
                alt="Fountain pen writing on lined paper"
                fill
                sizes="(min-width: 1024px) 425px, 100vw"
                className="object-cover transition-transform duration-[1.2s] ease-(--ease-soft) group-hover:scale-105"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
