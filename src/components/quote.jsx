import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Quote = () => {
  // Animation
  useGSAP(() => {
    gsap.from(".block-quote", {
      scrollTrigger: {
        trigger: "#section-quote",
        start: "top 60%",
        end: "center 40%",
        scrub: 1,
        once: true,
        markers: false,
      },
      opacity: 0,
      yPercent: 10,
      duration: 2,
      ease: "expo.out",
    });
  }, []);

  return (
    <section
      className="flex justify-center flex-col lg:flex-row lg:items-center min-h-screen paddingx-mobile sm:paddingx-tablet lg:paddingx space-y-10 lg:space-y-0 lg:gap-x-20"
      id="section-quote"
    >
      <img
        src="src/assets/img/chef-anthony.jpg"
        alt="Potrait of Anthony Chang, Head Chef at Nutribox"
        className="rounded-4xl w-[18.75rem] h-[18.75rem] self-end sm:self-center lg:order-2 lg:min-w-[30rem] lg:min-h-[30rem] xl:min-w-[42rem] xl:min-h-[42rem] lg:object-fill lg:rounded-none"
        loading="lazy"
      />
      <blockquote className="block-quote max-w-[19rem] flex flex-col sm:self-center space-y-4 lg:space-y-10 lg:max-w-[26rem]">
        <h2 className="sr-only">Quote</h2>
        <p className=" text-lg lg:text-2xl xl:text-3xl lg:leading-11">
          “As head chef at Nutribox, I believe cooking isn't just about making
          food taste good—it's about crafting meals that nourish and energize
          every person who enjoys them.”
        </p>
        <footer className="font-fraunces self-end text-end text-base lg:text-xl xl:text-2xl font-medium">
          <span className="block">Anthony Chang</span>
          <span className="block">Head Chef at Nutribox</span>
        </footer>
      </blockquote>
    </section>
  );
};

export default Quote;
