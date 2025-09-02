import NavBar from "../components/navbar";
import Hero from "../components/hero";
import About from "../components/about";
import FeaturedMenu from "../components/featuredMenu";
import Quote from "../components/quote";
import Location from "../components/location";
import ScrollTrigger from "gsap/ScrollTrigger";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

function App() {
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
      <main className="w-full flex flex-col space-y-10">
        <Hero className="hero" />
        <About className="about" />
        <FeaturedMenu />
        <Quote />
        <Location />
      </main>
    </>
  );
}

export default App;
