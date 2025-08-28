import NavBar from "../components/navbar";
import Hero from "../components/hero";
import About from "../components/about";
import FeaturedMenu from "../components/featuredMenu";
import ScrollTrigger from "gsap/ScrollTrigger";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

function App() {
  useGSAP(() => {
    gsap.to(".nav", {
      scrollTrigger: {
        trigger: ".about",
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
    <main className="w-full flex flex-col space-y-10 text-text bg-background">
      <NavBar className="nav" />
      <Hero className="hero" />
      <About className="about" />
      <FeaturedMenu />
    </main>
  );
}

export default App;
