import Image from "next/image";
import TypewriterWords from "./TypewriterWords";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative h-svh max-h-[1000px] min-h-[600px] overflow-hidden bg-[#0b2a22] text-white"
    >
      <Image
        src="/images/hero.jpg"
        alt="Portrait of Amafina Kelvin"
        fill
        preload
        sizes="100vw"
        className="animate-ken-burns object-cover object-center lg:object-[center_5%]"
      />
      <div className="relative mx-auto flex h-full max-w-[1440px] items-end justify-between px-6 pb-[81px] lg:px-20 lg:pb-[93px]">
        <TypewriterWords />
        <a href="#about" aria-label="Scroll to About" className="mb-2 lg:-mr-8 lg:mb-2.5">
          <Image src="/icons/scroll-down.svg" alt="" width={32} height={32} className="animate-nudge" />
        </a>
      </div>
    </section>
  );
}
