import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Work from "@/components/Work";
import About from "@/components/About";
import Services from "@/components/Services";
import Process from "@/components/Process";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

/** Single-page portfolio: Hero → Work → About → Services → Process → Contact. */
export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Work />
      <About />
      <Services />
      <Process />
      <Contact />
      <Footer />
    </main>
  );
}
