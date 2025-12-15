import gsap from "gsap";
import { Plus } from "lucide-react";
import React, { useRef } from "react";

const MenuCard = ({ name, price, calories, image_src }) => {
  const btnRef = useRef(null);
  const contentRef = useRef(null);
  const iconRef = useRef(null);
  const serverURL = import.meta.env.VITE_API_BASE_URL;

  const handleEnter = () => {
    gsap.to(btnRef.current, {
      scale: 1.01,
      paddingLeft: "1.2em",
      paddingRight: "1.2em",
      background: "var(--primary-secondary-gradient)",
      duration: 0.3,
      ease: "power4.out",
      yoyo: true,
    });

    gsap.to([contentRef.current, iconRef.current], {
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
      paddingLeft: "1em",
      paddingRight: "1em",
      ease: "power4.out",
    });

    gsap.to([contentRef.current, iconRef.current], {
      duration: 0.1,
      rotateX: 0,
      ease: "power4.out",
    });
  };
  return (
    <article className="grid-rows-[1fr_auto_auto_auto] justify-items-center w-34 h-70 sm:w-54 sm:h-80 md:w-64 xl:w-74 xl:h-100 bg-surface/30 rounded-xl shadow-text-muted shadow-md/20">
      <img
        src={`${serverURL}${image_src}`}
        alt={`image of ${name}`}
        className="w-full h-1/2 object-cover rounded-t-xl"
        loading="lazy"
      />

      <div className="px-3 pt-4 pb-1">
        <h3 className="font-fraunces gradient-text  sm:text-2xl line-clamp-2 font-bold min-h-[3rem] sm:min-h-[4rem] xl:min-h-0">
          {name}
        </h3>
      </div>

      <div className="px-3">
        <p className="font-poppins text-[0.65rem] sm:text-sm text-muted">
          {calories} kcal
        </p>
      </div>

      <div className="flex justify-between items-center mt-3 xl:mt-12 px-3 xl:pl-5">
        <h4 className="font-poppins text-[1rem] sm:text-lg font-bold">
          {price}$
        </h4>
        <button
          ref={btnRef}
          className="self-end px-[1em] font-poppins py-[.1em] md:py-[0.3em] xl:mx-3 border-2 rounded-full flex-center space-x-1"
          onMouseEnter={handleEnter}
          onMouseLeave={handleLeave}
          aria-label="Menu details"
        >
          <span
            ref={contentRef}
            className="btn-content hidden sm:block sm:text-[0.65rem] font-medium"
          >
            Add to cart
          </span>
          <Plus
            ref={iconRef}
            fill="black"
            size={25}
            strokeWidth={2.5}
            className="btn-content"
          />
        </button>
      </div>
      {/* <div className="flex flex-col px-3 py-1 sm:py-4 sm:gap-2 xl:gap-3">
      </div> */}
    </article>
  );
};

export default MenuCard;
