export const userRegister = async ({
  firstName,
  lastName,
  email,
  password,
}) => {
  return await fetch(`${import.meta.env.VITE_API_PATH}/users/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      first_name: firstName,
      last_name: lastName,
      email: email,
      password: password,
    }),
  });
};

export const userLogin = async ({ email, password }) => {
  return await fetch(`${import.meta.env.VITE_API_PATH}/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  });
};

export const userDetail = async (accessToken) => {
  return await fetch(`${import.meta.env.VITE_API_PATH}/users/current`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const userDetailById = async (id, accessToken) => {
  return await fetch(`${import.meta.env.VITE_API_PATH}/users/${id}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const userLogout = async (accessToken) => {
  return await fetch(`${import.meta.env.VITE_API_PATH}/users/current`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const userUpdate = async (
  { first_name, last_name, email, address },
  accessToken,
) => {
  return await fetch(`${import.meta.env.VITE_API_PATH}/users/current`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      first_name: first_name,
      last_name: last_name,
      email: email,
      address: address,
    }),
  });
};

export const userUpdateById = async (
  id,
  { first_name, last_name, address },
  accessToken,
) => {
  // console.log(first_name);
  // console.log(last_name);
  // console.log(address);

  return await fetch(`${import.meta.env.VITE_API_PATH}/users/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      first_name: first_name,
      last_name: last_name,
      address: address,
    }),
  });
};

export const userList = async ({ name }, page, accessToken) => {
  const url = new URL(`${import.meta.env.VITE_API_PATH}/users`);

  if (name) url.searchParams.append("name", name);
  if (page) url.searchParams.append("page", page);

  console.log(url);

  return await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const userDelete = async (id, accessToken) => {
  const url = new URL(`${import.meta.env.VITE_API_PATH}/users/${id}`);

  return await fetch(url, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
};
