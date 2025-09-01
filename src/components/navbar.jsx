import { Link } from "react-router";
import { useState } from "react";
import { Clover } from "lucide-react";
import { X } from "lucide-react";
import { Sun } from "lucide-react";
import { Moon } from "lucide-react";

const NavBar = ({ className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleDark = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <nav
      className={`nav z-50 fixed top-0 w-full ${className} filter-none`}
      id="navbar-main"
      aria-label="Main Navigation"
    >
      {isOpen ? (
        <div className="w-screen h-[65vh] bg-secondary flex flex-col p-10 space-y-10 md:hidden backdrop-blur-sm">
          {/* Mobile navbar*/}
          <button
            className="self-end"
            onClick={handleOpen}
            aria-label="close menu"
          >
            <X color="var(--text)" size={35} />
          </button>
          <ul className="flex-center flex-col space-y-10 text-5xl content-center">
            <li>
              <a href="#" className="font-jomhuria hover:text-slate-100">
                ABOUT
              </a>
            </li>
            <li>
              <a href="#" className="font-jomhuria hover:text-slate-100">
                EVENT
              </a>
            </li>
            <li>
              <Link href="#" className="font-jomhuria hover:text-slate-100">
                MENU
              </Link>
            </li>
            <li>
              <a href="#" className="font-jomhuria hover:text-slate-100">
                CART
              </a>
            </li>
          </ul>
        </div>
      ) : (
        // Dekstop navbar
        <div className="flex justify-between px-3 md:paddingx py-3">
          <a
            href="#"
            className="font-jomhuria text-5xl flex items-center gap-2"
          >
            NUTRIBOX
          </a>

          <ul className="hidden md:flex-center space-x-4 text-3xl">
            <li>
              <a
                href="#"
                className="font-jomhuria hover:gradient-text transition duration-75 ease-in"
              >
                ABOUT
              </a>
            </li>
            <li>
              <a
                href="#"
                className="font-jomhuria hover:gradient-text transition duration-75 ease-in"
              >
                EVENT
              </a>
            </li>
            <li>
              <Link
                href="#"
                className="font-jomhuria hover:gradient-text transition duration-75 ease-in"
              >
                MENU
              </Link>
            </li>
            <li>
              <a
                href="#"
                className="font-jomhuria hover:gradient-text transition duration-75 ease-in"
              >
                CART
              </a>
            </li>
            <li>
              <button
                onClick={handleDark}
                className="pb-[0.375rem]"
                aria-label="Toggle Dark Mode"
              >
                {isDark ? (
                  <Sun size={25} color="gold"></Sun>
                ) : (
                  <Moon size={25} color="purple"></Moon>
                )}
              </button>
            </li>
          </ul>

          <div className="md:hidden flex-center space-x-4">
            <button onClick={handleDark} aria-label="Toggle Dark Mode">
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
