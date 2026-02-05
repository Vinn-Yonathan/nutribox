import { useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { menuList } from "../../lib/api/MenuApi";
// import { useEffectOnce } from "react-use";
import { Link } from "react-router";
import CardFM from "./CardFM";
import { useQuery } from "@tanstack/react-query";
import { PuffLoader } from "react-spinners";

gsap.registerPlugin(ScrollTrigger);
const FeaturedMenu = () => {
  const btnRef = useRef(null);
  const contentRef = useRef(null);

  const {
    data: menus,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["featured_menu"],
    queryFn: async () => {
      const response = await menuList({ isFeatured: 1 }, { size: 3 });
      const responseBody = await response.json();
      console.log(responseBody);

      if (response.status !== 200) {
        throw new Error(Object.values(responseBody.errors).flat().join("\n"));
      }

      return responseBody.data;
    },
  });

  // Animations
  useGSAP(() => {
    gsap.from(".menu", {
      scrollTrigger: {
        trigger: "#section-fm",
        start: "top 70%",
        end: "center 80%",
        markers: false,
        once: true,
        scrub: 1,
      },
      opacity: 0,
      yPercent: 10,
      duration: 2,
      ease: "expo.out",
    });

    gsap.from("#fm-title-1", {
      scrollTrigger: {
        trigger: "#section-fm",
        start: "top 95%",
        end: "center 85%",
        markers: false,
        once: true,
        scrub: 1,
      },
      opacity: 0,
      xPercent: -25,
      duration: 1.2,
      ease: "expo.out",
    });

    gsap.from("#fm-title-2", {
      scrollTrigger: {
        trigger: "#section-fm",
        start: "top 95%",
        end: "center 85%",
        markers: false,
        once: true,
        scrub: 1,
      },
      opacity: 0,
      xPercent: 25,
      duration: 1.2,
      ease: "expo.out",
    });
  });

  const handleEnter = () => {
    gsap.to(btnRef.current, {
      scale: 1.01,
      paddingLeft: "5.2em",
      paddingRight: "5.2em",
      background: "var(--primary-secondary-gradient)",
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

  const RenderContent = () => {
    if (isLoading)
      return (
        <PuffLoader color="var(--primary)" className="self-center my-10" />
      );
    if (isError) return console.error(error.message);

    return (
      <div className="menu flex flex-col md:flex-row flex-wrap items-center justify-center md:justify-between md:gap-x-2 lg:gap-x-15 xl:gap-x-18 2xl:gap-x-30 gap-y-10">
        {menus?.map((menu) => (
          <CardFM
            key={menu.id}
            title={menu.name}
            src={menu.image_src}
            desc={menu.description}
            id={menu.id}
          />
        ))}
      </div>
    );
  };

  // useEffect(() => {
  //   setMenus(data);
  // }, [data]);

  return (
    <section
      className="flex-center flex-col space-y-20 min-h-screen paddingx-mobile sm:paddingx-tablet xl:paddingx md:py-20"
      id="section-fm"
    >
      <h2 className="flex flex-col md:flex-row justify-center font-fraunces lg:justify-between items-center w-full font-bold text-5xl md:text-6xl md:space-x-10">
        <span id="fm-title-1">FEATURED</span>
        <hr className="w-1/2 md:w-1/4 hidden md:block" />
        <span id="fm-title-2">MENU</span>
      </h2>

      <RenderContent />

      <button
        ref={btnRef}
        className="px-[5em] py-[0.5em] border-2 w-fit rounded-full"
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        aria-label="Discover more meals"
      >
        <Link
          to={"/menus"}
          ref={contentRef}
          className="text-lg md:text-xl font-poppins font-medium"
        >
          Discover more meals
        </Link>
      </button>
    </section>
  );
};

export default FeaturedMenu;
