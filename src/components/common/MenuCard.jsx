// import gsap from "gsap";
// import { Plus } from "lucide-react";
// import React, { useRef } from "react";
import { useNavigate } from "react-router";
import formatCurrency from "../../lib/formatCurrency";

const MenuCard = ({ id, name, price, calories, image_src }) => {
  // const btnRef = useRef(null);
  // const contentRef = useRef(null);
  // const iconRef = useRef(null);
  const navigate = useNavigate();
  const serverURL = import.meta.env.VITE_API_BASE_URL;

  // const handleEnter = () => {
  //   gsap.to(btnRef.current, {
  //     paddingLeft: "1.2em",
  //     paddingRight: "1.2em",
  //     background: "var(--primary-secondary-gradient)",
  //     duration: 0.3,
  //     ease: "power4.out",
  //     yoyo: true,
  //   });

  //   gsap.to([contentRef.current, iconRef.current], {
  //     duration: 0.3,
  //     rotateX: 360,
  //     ease: "expo.out",
  //     yoyo: true,
  //   });
  // };

  // const handleLeave = () => {
  //   gsap.to(btnRef.current, {
  //     scale: 1,
  //     background: "",
  //     duration: 0.3,
  //     paddingLeft: "1em",
  //     paddingRight: "1em",
  //     ease: "power4.out",
  //   });

  //   gsap.to([contentRef.current, iconRef.current], {
  //     duration: 0.1,
  //     rotateX: 0,
  //     ease: "power4.out",
  //   });
  // };
  return (
    // grid-rows-[1fr_auto_auto_auto]
    // flex flex-col
    <article
      className="flex flex-col w-44 h-70 sm:w-54 sm:h-80 md:w-64 xl:w-74 xl:h-100 bg-surface/30 rounded-xl shadow-text-muted shadow-md/20"
      onClick={() => navigate(`/menus/${id}`)}
    >
      <img
        src={`${serverURL}${image_src}`}
        alt={`image of ${name}`}
        className="w-full h-1/2 md:h-[60%] object-cover rounded-t-xl"
        loading="lazy"
      />

      <div className="flex flex-col h-1/2 md:h-[40%] justify-between pt-2 pb-4 px-3">
        <div className="space-y-1">
          <h3 className="font-fraunces gradient-text text-lg sm:text-2xl line-clamp-2 font-bold ">
            {name}
          </h3>
          <p className="text-[0.75rem] sm:text-sm text-muted">
            {calories} kcal
          </p>
        </div>
        <h4 className="text-[0.95rem] sm:text-base lg:text-lg font-bold">
          {formatCurrency(price)}
        </h4>
        {/* <div className="px-3 space-y-1"></div> */}

        {/* <div className="flex justify-between items-center mt-3 xl:mt-12 px-3 xl:pl-5">
          <button
            ref={btnRef}
            className="self-end px-[1em] hidden sm:block font-poppins py-[.1em] md:py-[0.3em] xl:mx-3 border-2 rounded-full flex-center space-x-1"
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
            aria-label="Menu details"
            onClick={() => navigate(`/menus/${id}`)}
          >
            <span
              ref={contentRef}
              className="btn-content  sm:text-[0.8rem] font-medium"
            >
              Menu Details
            </span>
          </button>
        </div> */}
      </div>
    </article>
  );
};

export default MenuCard;
