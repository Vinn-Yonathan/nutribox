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
    <nav className={`z-50 fixed top-0 w-full ${className} filter-none`}>
      {isOpen ? (
        <div className="w-screen h-[65vh] bg-secondary flex flex-col p-10 space-y-10 md:hidden backdrop-blur-sm">
          {/* Mobile navbar*/}
          <button className="self-end" onClick={handleOpen}>
            <X color="var(--text)" size={35} />
          </button>
          <div className="flex-center flex-col space-y-10 text-5xl content-center">
            <a href="#" className="font-jomhuria hover:text-slate-100">
              ABOUT
            </a>
            <a href="#" className="font-jomhuria hover:text-slate-100">
              EVENT
            </a>
            <Link href="#" className="font-jomhuria hover:text-slate-100">
              MENU
            </Link>
            <a href="#" className="font-jomhuria hover:text-slate-100">
              CART
            </a>
          </div>
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

          <div className="hidden md:flex-center space-x-4 text-3xl">
            <a
              href="#"
              className="font-jomhuria hover:gradient-text transition duration-75 ease-in"
            >
              ABOUT
            </a>
            <a
              href="#"
              className="font-jomhuria hover:gradient-text transition duration-75 ease-in"
            >
              EVENT
            </a>
            <Link
              href="#"
              className="font-jomhuria hover:gradient-text transition duration-75 ease-in"
            >
              MENU
            </Link>
            <a
              href="#"
              className="font-jomhuria hover:gradient-text transition duration-75 ease-in"
            >
              CART
            </a>

            <button onClick={handleDark} className="pb-[0.375rem]">
              {isDark ? (
                <Sun size={25} color="gold"></Sun>
              ) : (
                <Moon size={25} color="purple"></Moon>
              )}
            </button>
          </div>

          <div className="md:hidden flex-center">
            <button onClick={handleOpen} className="text-4xl">
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
