export const cartItemAdd = async ({ menuId, quantity }, accessToken) => {
  return await fetch(`${import.meta.env.VITE_API_PATH}/carts/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      menu_id: menuId,
      quantity: quantity,
    }),
  });
};

export const cartItemMultipleAdd = async (items, accessToken) => {
  return await fetch(`${import.meta.env.VITE_API_PATH}/carts/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ items: items }),
  });
};

export const cartDetail = async (accessToken) => {
  return await fetch(`${import.meta.env.VITE_API_PATH}/carts/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const cartItemDelete = async (menuId, accessToken) => {
  return await fetch(`${import.meta.env.VITE_API_PATH}/carts/items/${menuId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
};
