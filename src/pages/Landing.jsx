import NavBar from "../components/landing/Navbar";
import Hero from "../components/landing/hero";
import About from "../components/landing/about";
import FeaturedMenu from "../components/landing/featuredMenu";
import Quote from "../components/landing/quote";
import Location from "../components/landing/location";
import Footer from "../components/landing/Footer";
import ScrollTrigger from "gsap/ScrollTrigger";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

function Landing() {
  useGSAP(() => {
    gsap.to("#navbar-main", {
      scrollTrigger: {
        trigger: "#section-about",
        start: "top 95%",
        end: "top 96%",
        scrub: true,
        markers: false,
      },
      backdropFilter: "blur(8px)",
      ease: "power4.out",
      duration: 0.3,
    });
  }, []);

  return (
    <>
      <header className="w-full">
        <NavBar className="nav" />
      </header>
      <main className="w-full flex flex-col md:space-y-10">
        <Hero className="hero" />
        <About className="about" />
        <FeaturedMenu />
        <Quote />
        <Location />
        <Footer />
      </main>
    </>
  );
}

export default Landing;
