import { Link } from "react-router";
import { useRef, useState } from "react";
import { Clover } from "lucide-react";
import { X } from "lucide-react";
import { Sun } from "lucide-react";
import { Moon } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const NavBar = ({ className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const btnThemeMobileRef = useRef();
  const btnThemeDekstopRef = useRef();

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  useGSAP(() => {
    gsap.fromTo(
      [btnThemeMobileRef.current, btnThemeDekstopRef.current],
      { rotateY: 0 },
      {
        rotateY: 360,
        duration: 1,
        ease: "expo.out",
      }
    );
  }, [isDark]);

  const handleDark = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
  };

  const handleEnter = () => {
    gsap.to(".icon-close", {
      stroke: "var(--highlight)",
      duration: 0.1,
      ease: "expo.in",
    });
  };
  const handleLeave = () => {
    gsap.to(".icon-close", {
      stroke: "var(--text)",
      duration: 0.05,
      ease: "power3.out",
    });
  };

  return (
    <nav
      className={`nav z-50 fixed top-0 w-full ${className} filter-none`}
      id="navbar-main"
      aria-label="Main Navigation"
    >
      {isOpen ? (
        <div className="w-screen h-[65vh] bg-primary rounded-b-4xl flex flex-col p-10 space-y-3 md:hidden">
          {/* Mobile navbar*/}
          <button
            className="self-end"
            onClick={handleOpen}
            aria-label="close menu"
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
          >
            <X className="icon-close" stroke="var(--text)" size={35} />
          </button>
          <ul className="flex-center flex-col space-y-10 text-5xl content-center">
            <li>
              <a
                href="#section-about"
                className="font-jomhuria hover:text-slate-100"
              >
                ABOUT
              </a>
            </li>
            <li>
              <a
                href="#section-fm"
                className="font-jomhuria hover:text-slate-100"
              >
                FEATURED MENU
              </a>
            </li>
            <li>
              <a
                href="#section-location"
                className="font-jomhuria hover:text-slate-100"
              >
                LOCATION
              </a>
            </li>
            <li>
              <Link to="#" className="font-jomhuria hover:text-slate-100">
                CART
              </Link>
            </li>
          </ul>
        </div>
      ) : (
        // Dekstop navbar
        <div className="flex justify-between items-center px-3 md:paddingx py-3">
          <a href="#section-hero" className="font-jomhuria text-5xl">
            NUTRIBOX
          </a>

          <ul className="hidden md:flex-center space-x-4 text-3xl">
            <li className="flex-center">
              <a
                href="#section-about"
                className="font-jomhuria hover:gradient-text transition duration-75 ease-in"
              >
                ABOUT
              </a>
            </li>
            <li className="flex-center">
              <a
                href="#section-fm"
                className="font-jomhuria hover:gradient-text transition duration-75 ease-in"
              >
                FEATURED MENU
              </a>
            </li>
            <li className="flex-center">
              <a
                href="#section-location"
                className="font-jomhuria hover:gradient-text transition duration-75 ease-in"
              >
                LOCATION
              </a>
            </li>
            <li className="flex-center">
              <Link
                to="#"
                className="font-jomhuria hover:gradient-text transition duration-75 ease-in"
              >
                CART
              </Link>
            </li>
            <li className="flex-center">
              <button
                onClick={handleDark}
                className="pb-[0.3rem]"
                aria-label="Toggle Dark Mode"
                ref={btnThemeDekstopRef}
              >
                {isDark ? (
                  <Sun size={25} color="gold"></Sun>
                ) : (
                  <Moon size={25} color="purple"></Moon>
                )}
              </button>
            </li>
          </ul>

          {/* Mobile Nav Button */}
          <div className="md:hidden flex-center space-x-4">
            <button
              ref={btnThemeMobileRef}
              onClick={handleDark}
              aria-label="Toggle Dark Mode"
            >
              {isDark ? (
                <Sun size={30} color="gold"></Sun>
              ) : (
                <Moon size={30} color="purple"></Moon>
              )}
            </button>
            <button
              onClick={handleOpen}
              className="text-4xl"
              aria-label="Open Menu"
              aria-expanded={isOpen}
            >
              <Clover color="var(--text)" size={35} />
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;

// fixed top-0 py-3 flex justify-between w-full

// flex space-x-4 text-3xl content-center
