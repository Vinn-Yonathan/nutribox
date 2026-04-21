import NavBar from "../components/common/Navbar";
import Hero from "../components/landing/Hero";
import About from "../components/landing/About";
import FeaturedMenu from "../components/landing/FeaturedMenu";
import Quote from "../components/landing/Quote";
import Location from "../components/landing/Location";
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
      <main className="w-full flex flex-col lg:space-y-30">
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
