import { ChevronDown, ChevronUp } from "lucide-react";
import React, { useState } from "react";

const MenuFilter = ({ filter, setFilter, isCatalog = false }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };
  return (
    <section>
      <h3 className="font-poppins text-xl font-bold pb-4" onClick={handleOpen}>
        FILTER BY
        {isOpen ? (
          <ChevronUp className="inline" size={30} strokeWidth={2} />
        ) : (
          <ChevronDown className="inline" size={30} strokeWidth={2} />
        )}
      </h3>
      {isOpen && (
        <div className="flex flex-col gap-y-4 bg-surface rounded-2xl shadow-text-muted shadow-md/20 p-5">
          <label
            htmlFor="name"
            className="w-full flex flex-col font-poppins font-light"
          >
            <span className="font-medium text-text/80">Name</span>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter name"
              className="border-1 rounded-xl border-text-muted mt-2 focus:outline-none p-[.5em]"
              value={filter.name}
              onChange={(e) => setFilter({ ...filter, name: e.target.value })}
            />
          </label>
          <label
            htmlFor="max-price"
            className="w-full flex flex-col font-poppins font-light"
          >
            <span className="font-medium text-text/80">Max price</span>
            <input
              type="number"
              id="max-price"
              name="max-price"
              placeholder="Enter max price"
              className="border-1 rounded-xl border-text-muted mt-2 focus:outline-none p-[.5em]"
              value={filter.maxPrice}
              onChange={(e) =>
                setFilter({ ...filter, maxPrice: e.target.value })
              }
            />
          </label>
          <label
            htmlFor="min-price"
            className="w-full flex flex-col font-poppins font-light"
          >
            <span className="font-medium text-text/80">Min price</span>
            <input
              type="number"
              id="min-price"
              name="min-price"
              placeholder="Enter min price"
              className="border-1 rounded-xl border-text-muted mt-2 focus:outline-none p-[.5em]"
              value={filter.minPrice}
              onChange={(e) =>
                setFilter({ ...filter, minPrice: e.target.value })
              }
            />
          </label>
          <label
            htmlFor="max-calories"
            className="w-full flex flex-col font-poppins font-light"
          >
            <span className="font-medium text-text/80">Max calories</span>
            <input
              type="number"
              id="max-calories"
              name="max-calories"
              placeholder="Enter max calories"
              className="border-1 rounded-xl border-text-muted mt-2 focus:outline-none p-[.5em]"
              value={filter.maxCalories}
              onChange={(e) =>
                setFilter({ ...filter, maxCalories: e.target.value })
              }
            />
          </label>
          <label
            htmlFor="min-calories"
            className="w-full flex flex-col font-poppins font-light"
          >
            <span className="font-medium text-text/80">Min calories</span>
            <input
              type="number"
              id="min-calories"
              name="min-calories"
              placeholder="Enter max calories"
              className="border-1 rounded-xl border-text-muted mt-2 focus:outline-none p-[.5em]"
              value={filter.minCalories}
              onChange={(e) =>
                setFilter({ ...filter, minCalories: e.target.value })
              }
            />
          </label>
          <label htmlFor="isFeatured" className="font-poppins flex gap-x-4">
            Featured
            <input
              type="checkbox"
              name="isFeatured"
              checked={filter.isFeatured}
              onChange={(e) =>
                setFilter({ ...filter, isFeatured: e.target.checked })
              }
            />
          </label>

          {!isCatalog && (
            <label htmlFor="available" className="font-poppins flex gap-x-4">
              Avalaible
              <input
                type="checkbox"
                name="available"
                checked={filter.available}
                onChange={(e) =>
                  setFilter({ ...filter, available: e.target.checked })
                }
              />
            </label>
          )}
        </div>
      )}
    </section>
  );
};

export default MenuFilter;
