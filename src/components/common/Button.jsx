import gsap from "gsap";
import React, { useRef } from "react";

export const Button = ({
  title,
  className,
  type,
  colorHover = "var(--primary-secondary-gradient)",
  onClick,
  px = 5,
}) => {
  const contentRef = useRef(null);
  const btnRef = useRef(null);

  const handleEnter = () => {
    gsap.to(btnRef.current, {
      scale: 1.01,
      paddingLeft: `${px + 0.2}em`,
      paddingRight: `${px + 0.2}em`,
      background: colorHover,
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
      paddingLeft: `${px}em`,
      paddingRight: `${px}em`,
      ease: "power4.out",
    });

    gsap.to(contentRef.current, {
      duration: 0.1,
      rotateX: 0,
      ease: "power4.out",
    });
  };
  return (
    <button
      ref={btnRef}
      type={type}
      style={{ paddingLeft: `${px}em`, paddingRight: `${px}em` }}
      className={`py-[0.5em] border-2 rounded-full ${className}`}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onClick={onClick}
      aria-label="Multi purpose button"
    >
      <span
        ref={contentRef}
        className="text-lg md:text-xl font-poppins font-medium"
      >
        {title}
      </span>
    </button>
  );
};
