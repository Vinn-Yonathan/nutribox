import NavBar from "../components/common/Navbar";
import Hero from "../components/landing/hero";
import About from "../components/landing/about";
import FeaturedMenu from "../components/landing/featuredMenu";
import Quote from "../components/landing/quote";
import Location from "../components/landing/location";
import Footer from "../components/landing/Footer";
import gsap from "gsap";
import { useLocation } from "react-router";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
// import { useGSAP } from "@gsap/react";
import { useEffect } from "react";

gsap.registerPlugin(ScrollToPlugin);

function Landing() {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      gsap.to(window, { duration: 0.2, scrollTo: hash, ease: "power2" });
    }
  }, [hash]);

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
