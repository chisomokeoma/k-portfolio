import About from "@/components/About";
import BioData from "@/components/BioData";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Interviews from "@/components/Interviews";
import Langovest from "@/components/Langovest";
import Nav from "@/components/Nav";
import Writing from "@/components/Writing";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <BioData />
        <Writing />
        <Interviews />
        <Langovest />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
