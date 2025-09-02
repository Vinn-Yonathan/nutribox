import { useEffect, useState } from "react";
import LocationDetail from "./locationDetail";

const Location = () => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    fetch("data/location.json")
      .then((res) => res.json())
      .then((data) => setLocations(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <section className="flex-center w-full paddingx-mobile relative py-10 sm:space-x-10">
      <img
        src="src/assets/img/store.jpg"
        alt="Picture of Main Store"
        className="absolute sm:static rounded-2xl -left-40 top-55 h-[24rem] sm:h-[26rem] sm:w-1/2 lg:h-[32rem] lg:w-2/3 object-cover"
      />
      <div className="flex flex-col space-y-15">
        <h2 className="font-bold text-5xl leading-[4rem] md:text-7xl">
          VISIT OUR <br /> STORE
        </h2>
        <div className="flex flex-col sm:flex-row sm:flex-wrap gap-y-15 sm:gap-x-10 2xl:gap-x-24 self-end">
          {locations.map((location) => {
            return <LocationDetail location={location} />;
          })}
        </div>
      </div>
    </section>
  );
};

export default Location;
