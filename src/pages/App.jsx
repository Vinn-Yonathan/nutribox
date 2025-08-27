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
        start: "top 90%",
        end: "top 91%",
        scrub: 1,
        markers: true,
      },
      backdropFilter: "blur(8px)",
      backgroundColor: "rgba(255,255,255,0.5)",
      duration: 0.3,
      ease: "power4.out",
    });
  }, []);

  return (
    <main className="w-full flex flex-col space-y-10">
      <NavBar className="nav" />
      <Hero className="hero" />
      <About className="about" />
      <FeaturedMenu />
    </main>
  );
}

export default App;
