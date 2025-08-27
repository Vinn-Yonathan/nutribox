import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/all";

gsap.registerPlugin(SplitText);

const Hero = ({ classname = "" }) => {
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
    });
    gsap.from(".hero-btn ", {
      // opacity: 0,
      // y: 20,
      // scale: 0.8,
      // duration: 0.8,
      // ease: "expo.out",
      // immediateRender: false,
      y: 50, // jangan terlalu jauh
      scale: 0.8,
      opacity: 0,
      duration: 0.8,
      ease: "expo.out", // samakan dengan teks
      delay: 1.0, // sedikit jeda setelah teks
      immediateRender: false,
    });
  });

  return (
    <section
      className={`relative h-screen pt-50 md:pt-30 flex items-center flex-col text-center overflow-hidden space-y-5 ${classname}`}
    >
      <h1 className="hero-title text-6xl lg:text-7xl font-black">
        GOODNESS PREPARED <br />
        IN <span className="text-primary">EVERY BOX</span>
      </h1>

      <p className="hero-desc">Freshly-made everyday just for you </p>

      <button className="hero-btn font-poppins px-[6em] py-[1em] rounded-full font-medium text-lg bg-transparent border-2 hover:bg-secondary hover:text-white transition duration-100 ease-in">
        Order Now
      </button>

      <div className="-z-10">
        <img
          className="hidden md:block h-[32rem] -translate-y-24 "
          src="src/assets/img/box.png"
          alt="bento box"
        />
        <img
          className="h-[23rem] lg:h-[36rem] xl:h-[46rem] absolute -top-30 lg:-top-40 -left-40"
          src="src/assets/img/granola.png"
          alt="granola"
        />
        <img
          className="h-[10rem] md:h-[20rem] xl:h-[24rem] absolute top-130 md:top-80 right-0 rotate-270"
          src="src/assets/img/cabbage.png"
          alt="cabbage"
        />
      </div>
    </section>
  );
};

export default Hero;
