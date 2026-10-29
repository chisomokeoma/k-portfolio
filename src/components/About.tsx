import { Button, Container, reveal } from "./ui";

const PARAGRAPHS = [
  "Infrastructure is never abstract. It is a living system — one that should adapt to and enable the basic functions of our lives. That conviction grew out of an unlikely path: I trained as a medical doctor in Nigeria and Ukraine, completed a Master of Public Health at the National University of Kyiv-Mohyla Academy, and somewhere along the way realised that the infrastructure question was the same as the health question. Both are about whether systems function for the people inside them.",
  "That background shapes everything I write and build. My time in clinical and public health settings made clear to me that outcomes are determined not only by expertise, but by whether the surrounding systems hold. The clinic, the supply chain, the power connection — infrastructure is never a background condition. It is the condition.",
  "I am the founder of Langovest, a company working to accelerate infrastructure development in Africa through diaspora investment, and InfraMobile, which focuses on modular and mobile technology that enables basic human needs — clinics that move, water systems that scale, food networks that stay resilient.",
];

export default function About() {
  return (
    <section id="about" className="scroll-mt-12 bg-white py-16 lg:scroll-mt-16">
      <Container className="flex flex-col gap-6 lg:gap-8">
        <hr {...reveal(0, "line")} className="border-black/20" />
        <div className="flex flex-col gap-8 lg:grid lg:grid-cols-[1fr_2fr] lg:gap-0">
          <h2
            {...reveal(100)}
            className="text-small font-medium uppercase text-black/60 lg:text-body lg:font-normal"
          >
            About Kelvin
          </h2>
          <div className="flex flex-col gap-6 lg:gap-12">
            <p {...reveal(150)} className="text-title lg:text-lead">
              I am deeply curious about the African continent studying how external forces have
              shaped our development over the years, and how internal structures currently limit
              it. I express my thoughts through essays, manifestos, research, and articles.
            </p>
            <div className="flex flex-col gap-6 text-body text-black/70">
              {PARAGRAPHS.map((p, i) => (
                <p key={p.slice(0, 24)} {...reveal(200 + i * 80)}>
                  {p}
                </p>
              ))}
            </div>
            <div {...reveal(300)}>
              <Button href="#contact">Get in touch</Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
