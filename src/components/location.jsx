import { useEffect, useState } from "react";
import LocationDetail from "./locationDetail";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const Location = () => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    fetch("data/location.json")
      .then((res) => res.json())
      .then((data) => setLocations(data))
      .catch((err) => console.error(err));
  }, []);

  // Animations
  useGSAP(() => {
    gsap.from("#location-title", {
      scrollTrigger: {
        trigger: "#section-location",
        start: "top 70%",
        end: "center 50%",
        scrub: 1,
        once: true,
        markers: false,
      },
      opacity: 0,
      xPercent: 20,
      duration: 1,
      ease: "expo.out",
    });
  }, []);

  useGSAP(() => {
    if (locations.length === 0) return;
    gsap.fromTo(
      ".location-item",
      { opacity: 0, xPercent: 20 },
      {
        scrollTrigger: {
          trigger: "#section-location",
          start: "top 40%",
          end: "center 65%",
          scrub: 1,
          once: true,
          markers: true,
        },
        opacity: 1,
        xPercent: 0,
        duration: 1,
        stagger: 0.3,
        ease: "expo.out",
      }
    );
  }, [locations]);

  return (
    <section
      className="flex-center w-full paddingx-mobile relative py-10 sm:space-x-10"
      id="section-location"
    >
      <img
        src="src/assets/img/store.jpg"
        alt="Picture of Main Store"
        className="absolute sm:static rounded-2xl -left-40 top-55 h-[24rem] sm:h-[26rem] sm:w-1/2 lg:h-[32rem] lg:w-2/3 object-cover"
        loading="lazy"
      />
      <div className="flex flex-col space-y-15">
        <h2
          className="font-bold text-5xl leading-[4rem] md:text-7xl font-fraunces"
          id="location-title"
        >
          VISIT OUR <br /> STORE
        </h2>
        <div className="flex flex-col sm:flex-row sm:flex-wrap gap-y-15 sm:gap-x-10 2xl:gap-x-24 self-end">
          {locations.map((location) => {
            return (
              <LocationDetail
                location={location}
                key={location.id}
                className="location-item"
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Location;
