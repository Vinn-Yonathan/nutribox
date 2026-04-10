export const transactionAdd = async (menus, totalPrice, accessToken) => {
  return await fetch(
    `${import.meta.env.VITE_API_PATH}/users/current/transactions`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        menus: menus,
        total_price: totalPrice,
      }),
    },
  );
};

export const userTransactionList = async (accessToken) => {
  return fetch(`${import.meta.env.VITE_API_PATH}/users/current/transactions`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const userTransactionDetails = async (accessToken, transactionId) => {
  return fetch(
    `${import.meta.env.VITE_API_PATH}/users/current/transactions/${transactionId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
};

export const deleteUserTransaction = async (accessToken, transactionId) => {
  return fetch(
    `${import.meta.env.VITE_API_PATH}/users/current/transactions/${transactionId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
};

export const generateToken = async (accessToken, transactionId) => {
  return fetch(
    `${import.meta.env.VITE_API_PATH}/users/current/transactions/${transactionId}/payment-token`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
};
