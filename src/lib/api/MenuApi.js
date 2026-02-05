export const menuAdd = async (
  { name, description, image, price, calories, stock, isFeatured },
  accessToken,
) => {
  const formData = new FormData();

  formData.append("name", name);
  formData.append("description", description);
  formData.append("image", image);
  formData.append("price", price);
  formData.append("calories", calories);
  formData.append("stock", stock);
  formData.append("is_featured", isFeatured);

  // console.log("Menu API", formData);

  return await fetch(`${import.meta.env.VITE_API_PATH}/menus`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: formData,
  });
};

export const menuList = async (
  { name, maxPrice, minPrice, maxCalories, minCalories, available, isFeatured },
  { page, size },
) => {
  const url = new URL(`${import.meta.env.VITE_API_PATH}/menus`);
  if (name) url.searchParams.append("name", name);
  if (maxPrice) url.searchParams.append("max_price", maxPrice);
  if (minPrice) url.searchParams.append("min_price", minPrice);
  if (maxCalories) url.searchParams.append("max_calories", maxCalories);
  if (minCalories) url.searchParams.append("min_calories", minCalories);
  if (available) url.searchParams.append("available", available);
  if (isFeatured) url.searchParams.append("is_featured", isFeatured);
  if (page) url.searchParams.append("page", page);
  if (size) url.searchParams.append("size", size);

  // console.log(url);

  return await fetch(url, {
    method: "GET",
    headers: {
      //   "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
};

export const menuUpdate = async (
  { id, name, description, image, price, calories, stock, isFeatured },
  accessToken,
) => {
  const formData = new FormData();

  if (name !== undefined) formData.append("name", name);
  if (description !== undefined) formData.append("description", description);
  if (image !== undefined) formData.append("image", image);
  if (price !== undefined) formData.append("price", price);
  if (calories !== undefined) formData.append("calories", calories);
  if (stock !== undefined) formData.append("stock", stock);
  if (isFeatured !== undefined) formData.append("is_featured", isFeatured);
  formData.append("_method", "PATCH");

  return await fetch(`${import.meta.env.VITE_API_PATH}/menus/${id}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: formData,
  });
};

export const menuDetail = async (id) => {
  return await fetch(`${import.meta.env.VITE_API_PATH}/menus/${id}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });
};

export const menuDelete = async (id, accessToken) => {
  return await fetch(`${import.meta.env.VITE_API_PATH}/menus/${id}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
};
