import React, { useEffect, useRef, useState } from "react";
import MenuFilter from "../components/common/MenuFilter";
import { useMenuInfinite } from "../hooks/useMenuInfinite";
// import CardFM from "../components/landing/CardFM";
import { PuffLoader } from "react-spinners";
import { alertError } from "../lib/alert";
import MenuCard from "../components/common/MenuCard";

const MenuCatalog = () => {
  const [filter, setFilter] = useState({
    name: "",
    maxPrice: null,
    minPrice: null,
    maxCalories: null,
    minCalories: null,
    available: false,
    isFeatured: false,
  });

  const observerTarget = useRef(null);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = useMenuInfinite(filter);

  const menus = data?.pages?.flatMap((page) => page.data) || [];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [hasNextPage, fetchNextPage, isFetchingNextPage]);

  const RenderContent = () => {
    if (isLoading)
      return (
        <PuffLoader color="var(--primary)" className="self-center my-10" />
      );
    if (isError) return alertError(error.message);
    if (menus.length === 0)
      return <p className="text-center text-xl font-poppins">No menu found.</p>;

    return (
      <>
        <MenuFilter filter={filter} setFilter={setFilter} />
        <div className="grid grid-cols-2 lg:grid-cols-3 4xl:grid-cols-4 gap-y-28 justify-items-center">
          {menus.map((menu) => {
            return (
              <MenuCard
                key={menu.id}
                name={menu.name}
                price={menu.price}
                calories={menu.calories}
                image_src={menu.image_src}
              />
            );
          })}
        </div>

        {isFetchingNextPage && (
          <PuffLoader color="var(--primary)" className="self-center my-10" />
        )}

        <div ref={observerTarget} className="h-40"></div>
      </>
    );
  };

  return (
    <main className="flex flex-col gap-y-8 min-h-screen px-8 sm:paddingx-tablet lg:paddingx py-8">
      <RenderContent />
    </main>
  );
};

export default MenuCatalog;
