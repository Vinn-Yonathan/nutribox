import { Link } from "react-router";
import { useState } from "react";
import { Clover } from "lucide-react";
import { X } from "lucide-react";

const NavBar = ({ className }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(!isOpen);
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
            <a href="#" className="font-jomhuria">
              ABOUT
            </a>
            <a href="#" className="font-jomhuria">
              EVENT
            </a>
            <Link href="#" className="font-jomhuria">
              MENU
            </Link>
            <a href="#" className="font-jomhuria">
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

          <div className="hidden md:flex space-x-4 text-3xl content-center">
            <a href="#" className="font-jomhuria">
              ABOUT
            </a>
            <a href="#" className="font-jomhuria">
              EVENT
            </a>
            <Link href="#" className="font-jomhuria">
              MENU
            </Link>
            <a href="#" className="font-jomhuria">
              CART
            </a>
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
