import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/all";
import { useRef } from "react";

gsap.registerPlugin(SplitText);

const Hero = ({ classname = "" }) => {
  const btnRef = useRef(null);
  const contentRef = useRef(null);

  const handleEnter = () => {
    gsap.to(btnRef.current, {
      scale: 1.01,
      paddingLeft: "6.2em",
      paddingRight: "6.2em",
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
      duration: 0.3,
      paddingLeft: "6em",
      paddingRight: "6em",
      ease: "power4.out",
    });

    gsap.to(contentRef.current, {
      duration: 0.1,
      rotateX: 0,
      ease: "power4.out",
    });
  };

  useGSAP(() => {
    const heroSplit = new SplitText(".hero-title", {
      type: "chars",
    });
    const heroDescSplit = new SplitText(".hero-desc", {
      type: "chars",
    });

    gsap.from([heroSplit.chars, heroDescSplit.chars], {
      opacity: 0,
      yPercent: 100,
      duration: 0.8,
      ease: "expo.out",
      stagger: 0.04,
      repeat: 0,
    });
  });

  return (
    <section
      className={`relative h-screen pt-50 md:pt-30 flex items-center flex-col text-center overflow-hidden space-y-5 ${classname}`}
      id="section-hero"
    >
      <h1 className="hero-title font-fraunces text-6xl lg:text-7xl font-black">
        GOODNESS PREPARED <br />
        IN <span className="gradient-text">EVERY BOX</span>
      </h1>

      <p className="hero-desc font-poppins">
        Freshly-made everyday just for you{" "}
      </p>

      <button
        className="btn-gradient px-[6em] py-[1em] border-2 rounded-full z-5"
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        ref={btnRef}
      >
        <span className="font-poppins font-medium text-lg" ref={contentRef}>
          Order Now
        </span>
      </button>

      <div>
        <img
          className="hidden md:block h-[32rem] -translate-y-24 "
          src="src/assets/img/box.png"
          alt=""
        />
        <img
          className="h-[23rem] lg:h-[36rem] xl:h-[46rem] absolute -top-30 lg:-top-40 -left-40"
          src="src/assets/img/granola.png"
          alt=""
        />
        <img
          className="h-[10rem] md:h-[20rem] xl:h-[24rem] absolute top-130 md:top-80 right-0 rotate-270"
          src="src/assets/img/cabbage.png"
          alt=""
        />
      </div>
    </section>
  );
};

export default Hero;
