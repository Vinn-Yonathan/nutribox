import { useRef } from "react";
import menus from "../data/featuredMenu";
import CardFM from "./cardFM";
import gsap from "gsap";

const FeaturedMenu = () => {
  const btnRef = useRef(null);
  const contentRef = useRef(null);

  const handleEnter = () => {
    gsap.to(btnRef.current, {
      scale: 1.01,
      paddingLeft: "5.2em",
      paddingRight: "5.2em",
      background: "var(--secondaryGradient)",
      duration: 0.3,
      ease: "power4.out",
      yoyo: true,
    });

    gsap.to(contentRef.current, {
      duration: 0.3,
      rotateX: 360,
      ease: "expo.out",
      yoyo: true,
    });
  };
  const handleLeave = () => {
    gsap.to(btnRef.current, {
      scale: 1,
      background: "",
      duration: 0.3,
      paddingLeft: "5em",
      paddingRight: "5em",
      ease: "power4.out",
    });

    gsap.to(contentRef.current, {
      duration: 0.1,
      rotateX: 0,
      ease: "power4.out",
    });
  };

  return (
    <section className="flex-center flex-col lg:space-y-30 xl:space-y-15 min-h-screen paddingx-mobile lg:paddingx md:py-20">
      <div className="flex justify-between items-center flex-wrap w-full font-bold text-6xl md:text-7xl md:space-x-10 mb-20">
        <h1>FEATURED</h1>
        <hr className="w-1/2 md:w-1/4 hidden md:block" />
        <h1>MENU</h1>
      </div>

      <div className="flex items-center justify-between flex-wrap space-x-30">
        {menus
          .filter((menu) => menu.featured)
          .map((menu) => (
            <CardFM
              key={menu.id}
              title={menu.title}
              src={menu.src}
              desc={menu.desc}
            />
          ))}
      </div>

      <button
        ref={btnRef}
        className=" px-[5em] py-[0.5em] border-2 w-fit rounded-full"
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
      >
        <p ref={contentRef} className="text-xl font-poppins font-bold">
          Discover your meals
        </p>
      </button>
    </section>
  );
};

export default FeaturedMenu;
