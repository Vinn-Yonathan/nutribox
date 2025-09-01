import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const About = ({ className }) => {
  useGSAP(() => {
    gsap.from("#about-para-1", {
      scrollTrigger: {
        trigger: "#section-about",
        start: "top 50%",
        end: "bottom 70%",
        scrub: 1,
        once: true,
        markers: false,
      },
      opacity: 0,
      yPercent: -10,
      duration: 2,
      ease: "expo.out",
    });

    gsap.from("#about-para-2", {
      scrollTrigger: {
        trigger: "#section-about",
        start: "top 40%",
        end: "bottom 70%",
        scrub: 1,
        once: true,
        markers: false,
      },
      opacity: 0,
      yPercent: -50,
      duration: 2,
      ease: "expo.out",
    });

    gsap.from(".img", {
      scrollTrigger: {
        trigger: "#section-about",
        start: "top 50%",
        end: "bottom 70%",
        scrub: 1,
        once: true,
        markers: false,
      },
      opacity: 0,
      xPercent: -50,
      duration: 2,
      ease: "expo.out",
    });
  }, []);

  return (
    <section
      className={`flex justify-center items-center lg:items-start flex-col lg:space-y-30 xl:space-y-15 min-h-screen paddingx-mobile lg:paddingx md:py-20 ${className}`}
      id="section-about"
    >
      <h2 className="font-bold text-6xl pl-10 text-center hidden lg:block">
        WHO WE <br className="sm:hidden" /> ARE
      </h2>

      <div className="flex flex-col lg:flex-row space-y-10 lg:space-x-30">
        <div className="img flex-center relative">
          <img
            src="src/assets/img/chef.jpg"
            alt="chef-cooking"
            className="rounded-[10%] md:rounded-[30%] h-[18rem] md:h-[24rem] md:w-[24rem] lg:h-[32rem] lg:max-w-[37.875rem] 2xl:h-[32rem]"
          />
          <img
            src="src/assets/img/ingredient.jpg"
            alt="ingredients"
            className="hidden xl:block absolute -bottom-30 -right-30 rounded-[5rem] h-[16rem] w-[16rem] xl:h-[14rem] xl:w-[14rem]"
          />
        </div>

        <h2 className="font-bold text-5xl md:text-6xl text-center lg:hidden">
          WHO WE <br className="sm:hidden" /> ARE
        </h2>

        <div className="sm:text-2xl max-w-[59.1875rem]">
          <p id="about-para-1" className="text-justify md:pt-30 xl:pt-35">
            At NutriBox, we are committed to providing a solution for everyone
            who wants to eat healthy without compromising on flavor.
          </p>
          <br />
          <p id="about-para-2" className="xl:pt-30 xl:pl-20">
            Every box is carefully prepared with fresh ingredients and balanced
            nutrition—just for you
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
