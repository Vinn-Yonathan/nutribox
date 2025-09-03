import Newsletter from "./newsletter";
import { Link } from "react-router";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Footer = () => {
  useGSAP(() => {
    const links = gsap.utils.toArray(".footer-link");

    links.forEach((el) => {
      const icon = el.querySelector(".arrow-icon");
      el.addEventListener("mouseenter", () => {
        gsap.to(icon, {
          rotateZ: 45,
          duration: 0.4,
          ease: "power3.in",
        });
      });

      el.addEventListener("mouseleave", () => {
        gsap.to(icon, {
          rotateZ: 0,
          duration: 0.4,
          ease: "power3.in",
        });
      });
    });

    return () => {
      links.forEach((el) => {
        const icon = el.querySelector(".arrow-icon");
        el.removeEventListener("mouseenter", () => {
          gsap.to(icon, {
            rotateX: 360,
            duration: 1,
            ease: "power3.in",
          });
        });

        el.removeEventListener("mouseleave", () => {
          gsap.to(icon, {
            rotateY: 0,
            duration: 1,
            ease: "power3.in",
          });
        });
      });
    };
  });

  return (
    <footer className="bg-primary w-full px-10 pt-5 md:pt-20 pb-2 space-y-25 md:space-y-10">
      <div className="flex flex-col space-y-10 md:flex-row md:items-center">
        <Newsletter />
        <nav
          className="flex font-poppins justify-between gap-x-5 md:gap-x-15 lg:gap-x-24"
          aria-label="footer navigation"
        >
          <div>
            <h3 className="text-xl font-bold lg:text-2xl lg:mb-2">Services</h3>
            <ul className="text-xs space-y-1.5 font-semibold lg:text-base">
              <li>
                <Link to="" className="footer-link">
                  <ArrowUpRight className="inline arrow-icon" /> All Menu
                </Link>
              </li>
              <li>
                <Link to="" className="footer-link">
                  <ArrowUpRight className="inline arrow-icon" /> Reservation
                </Link>
              </li>
              <li>
                <Link to="" className="footer-link">
                  <ArrowUpRight className="inline arrow-icon" /> Partnership
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold lg:text-2xl lg:mb-2">Socials</h3>
            <ul className="text-xs space-y-1.5 font-semibold lg:text-base">
              <li>
                <Link to="" className="footer-link">
                  <ArrowUpRight className="inline arrow-icon" /> Instagram
                </Link>
              </li>
              <li>
                <Link to="" className="footer-link">
                  <ArrowUpRight className="inline arrow-icon" /> Facebook
                </Link>
              </li>
              <li>
                <Link to="" className="footer-link">
                  <ArrowUpRight className="inline arrow-icon" /> Twitter/X
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>

      <div className="flex flex-col justify-center font-jomhuria md:flex-row md:justify-between md:items-center">
        <h2 className="text-4xl self-center md:text-5xl">NUTRIBOX</h2>
        <div className="flex justify-between md:justify-around md:gap-x-10 md:text-xl">
          <address className="not-italic">
            <p>info@nutribox.com</p>
          </address>
          <p>&copy; 2025. All rights reserved</p>
          <address className="not-italic">
            <p>+1 (000) 000-0000</p>
          </address>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
