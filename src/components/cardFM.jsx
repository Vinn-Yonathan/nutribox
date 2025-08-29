import gsap from "gsap";
import React, { useRef } from "react";
import { MoveRight } from "lucide-react";
// import { ReactComponent as ArrowRight } from "@src/assets/icons/arrow_right.svg";

const CardFM = ({ src, title, desc }) => {
  const btnRef = useRef(null);
  const contentRef = useRef(null);
  const iconRef = useRef(null);

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
    <article className="flex flex-col w-64 h-80 xl:w-74 xl:h-100 bg-surface rounded-xl shadow-text-muted shadow-md/20">
      <img
        src={src}
        alt={`image of ${title}`}
        className="w-full h-1/2 object-cover rounded-t-xl"
      />
      <div className="px-3 py-4 gap-2 xl:gap-3 flex flex-col">
        <h3 className="text-2xl gradient-text font-bold">{title}</h3>
        <p className="text-xs text-muted">{desc}</p>
        <button
          ref={btnRef}
          className="self-end px-[1em] font-poppins py-[.1em] md:py-[0.3em] xl:mx-3 border-2 rounded-full flex-center space-x-1 mt-3"
          onMouseEnter={handleEnter}
          onMouseLeave={handleLeave}
          aria-label="Menu details"
        >
          <span
            ref={contentRef}
            className="btn-content text-[0.65rem] font-medium"
          >
            Menu details
          </span>
          <MoveRight
            ref={iconRef}
            fill="black"
            size={28}
            className="btn-content pt-0.5"
          />
        </button>
      </div>
    </article>
  );
};

export default CardFM;
