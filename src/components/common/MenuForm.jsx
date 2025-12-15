// import React, { useState } from "react";

import { FormButton } from "./FormButton";
import { CircleX } from "lucide-react";

const MenuForm = ({
  handleSubmit,
  formData,
  setFormData,
  btnTitle,
  isEditForm = false,
  className = "",
}) => {
  return (
    <form className={`flex flex-col ${className}`} onSubmit={handleSubmit}>
      <div className="flex flex-col gap-y-4 md:gap-y-12 md:flex-row md:flex-wrap">
        <label
          htmlFor="name"
          className="w-full flex flex-col font-poppins md:basis-1/2 md:px-8"
        >
          Name
          <input
            type="text"
            name="name"
            placeholder="Enter menu name"
            className="border-b-2 mt-2 focus:outline-none"
            required={isEditForm}
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </label>
        <label
          htmlFor="description"
          className="w-full flex flex-col font-poppins md:basis-1/2 md:px-8"
        >
          Description
          <input
            type="text"
            name="description"
            placeholder="Enter menu description"
            className="border-b-2 mt-2 focus:outline-none"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
        </label>
        <label
          htmlFor="image"
          className="w-full flex flex-col font-poppins md:basis-1/2 md:px-8"
        >
          Upload image
          {/* Custom button */}
          <div className="flex items-center gap-x-4 pt-2">
            <div className="border-2 rounded-full w-fit px-2">Browse</div>

            <div className="flex items-center gap-x-1">
              {formData.image && (
                <img
                  src={URL.createObjectURL(formData.image)}
                  alt="preview"
                  className="w-[20px]"
                />
              )}
              <span>{formData.image?.name || "No file selected"}</span>

              {formData.image && (
                <button
                  onClick={() => setFormData({ ...formData, image: null })}
                >
                  <CircleX className="text-red-400" />
                </button>
              )}
            </div>
          </div>
          <input
            id="image"
            type="file"
            name="image"
            accept="image/*"
            className="hidden"
            required={isEditForm}
            onChange={(e) =>
              setFormData({ ...formData, image: e.target.files[0] })
            }
          />
        </label>
        <label
          htmlFor="price"
          className="w-full flex flex-col font-poppins md:basis-1/2 md:px-8"
        >
          Price
          <input
            type="number"
            name="price"
            placeholder="Enter menu price"
            className="border-b-2 mt-2 focus:outline-none"
            required={isEditForm}
            value={formData.price}
            onChange={(e) =>
              setFormData({ ...formData, price: e.target.value })
            }
          />
        </label>
        <label
          htmlFor="calories"
          className="w-full flex flex-col font-poppins md:basis-1/2 md:px-8"
        >
          Calories
          <input
            type="number"
            name="calories"
            placeholder="Enter menu calories"
            className="border-b-2 mt-2 focus:outline-none"
            required={isEditForm}
            value={formData.calories}
            onChange={(e) =>
              setFormData({ ...formData, calories: e.target.value })
            }
          />
        </label>
        <label
          htmlFor="stock"
          className="w-full flex flex-col font-poppins md:basis-1/2 md:px-8"
        >
          Stock
          <input
            type="number"
            name="stock"
            placeholder="Enter menu stock"
            className="border-b-2 mt-2 focus:outline-none"
            required={isEditForm}
            value={formData.stock}
            onChange={(e) =>
              setFormData({ ...formData, stock: e.target.value })
            }
          />
        </label>
        <label
          htmlFor="isFeatured"
          className="font-poppins flex gap-x-4 md:basis-1/2 md:px-8"
        >
          Is Featured?
          <input
            type="checkbox"
            name="isFeatured"
            value={formData.isFeatured}
            onChange={(e) =>
              setFormData({ ...formData, isFeatured: e.target.checked ? 1 : 0 })
            }
          />
        </label>
      </div>
      <FormButton title={btnTitle} className={"self-end"} px={2} />
    </form>
  );
};

export default MenuForm;
