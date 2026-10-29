import ContactForm from "./ContactForm";
import { Container, SectionHeading, reveal } from "./ui";

export default function Contact() {
  return (
    <section id="contact" className="scroll-mt-12 bg-ink py-8 text-white lg:scroll-mt-16 lg:py-16">
      <Container className="flex flex-col gap-10">
        <SectionHeading
          eyebrow="Contact"
          title="Let's think together about what we are building."
        />
        <hr {...reveal(150, "line")} className="border-white/10" />
        <div {...reveal(250)}>
          <ContactForm />
        </div>
      </Container>
    </section>
  );
}
