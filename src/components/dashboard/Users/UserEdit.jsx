import React, { useEffect, useState } from "react";
import BackButton from "../../common/BackButton";
import { useLocalStorage } from "react-use";
import { useNavigate, useParams } from "react-router";
import { userDetailById, userUpdateById } from "../../../lib/api/UserApi";
import { alertConfirm, alertError, alertSuccess } from "../../../lib/alert";
import { FormButton } from "../../common/FormButton";
import { Button } from "../../common/Button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { PuffLoader } from "react-spinners";

const UserEdit = () => {
  // const [user, setUser] = useState({});
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    address: "",
  });
  const [accessToken, _] = useLocalStorage("access-token", "");
  const userId = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: user, isLoading } = useQuery({
    queryKey: ["user", userId.userId],
    queryFn: async () => {
      const response = await userDetailById(userId.userId, accessToken);
      const responseBody = await response.json();
      console.log(responseBody);

      if (response.status !== 200) {
        await alertError(Object.values(responseBody.errors).flat().join("\n"));
      }

      return responseBody.data;
    },
  });

  // const getUser = async () => {
  //   const response = await userDetailById(userId.userId, accessToken);
  //   const responseBody = await response.json();
  //   console.log(responseBody);

  //   if (response.status === 200) {
  //     setUser(responseBody.data);
  //     console.log("User fetched successfuly.");
  //   } else {
  //     console.log(responseBody.errors);
  //     await alertError(Object.values(responseBody.errors).flat().join("\n"));
  //   }
  // };

  const mutation = useMutation({
    mutationFn: async (updatedField) => {
      const response = await userUpdateById(
        userId.userId,
        updatedField,
        accessToken,
      );
      const responseBody = await response.json();
      console.log(responseBody);

      if (response.status !== 200) {
        console.log(responseBody.errors);
        throw new Error(Object.values(responseBody.errors).flat().join("\n"));
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      alertSuccess("User updated successfully!");
      navigate("/dashboard/users");
    },
    onError: (error) => {
      alertError(error.message);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const confirmed = await alertConfirm(
      "Are you sure want to edit this user?",
    );
    const updatedField = {};

    if (confirmed) {
      console.log("formData", formData);
      console.log("user", user);
      if (formData.first_name !== user.first_name)
        updatedField.first_name = formData.first_name;
      if (formData.last_name !== user.last_name)
        updatedField.last_name = formData.last_name;
      if (formData.address !== user.address)
        updatedField.address = formData.address;

      mutation.mutate(updatedField);
    }

    return;
  };

  // useEffectOnce(() => {
  //   getUser();
  // });

  useEffect(() => {
    console.log(user, "jalan nih");
    setFormData({
      first_name: user?.first_name || "",
      last_name: user?.last_name || "",
      address: user?.address || "",
    });
  }, [user]);

  return (
    <div className="flex flex-col gap-y-4">
      <BackButton
        className={"self-start hover:text-primary transition duration-200"}
      />
      <h2 className="font-poppins text-5xl font-bold pb-4">EDIT USER</h2>
      {isLoading ? (
        <PuffLoader color="var(--primary)" className="self-center my-10" />
      ) : (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col bg-surface rounded-2xl shadow-text-muted shadow-md/20 p-4"
        >
          <div className="flex flex-col gap-y-6 lg:gap-y-12 md:flex-row md:flex-wrap">
            <label
              htmlFor="first-name"
              className="w-full flex flex-col font-poppins md:basis-1/2 md:px-8"
            >
              <span className="font-medium">First Name</span>
              <input
                type="text"
                id="first-name"
                name="first-name"
                placeholder="Enter first name"
                className="border-b-2 mt-2 focus:outline-none"
                value={formData.first_name}
                onChange={(e) => {
                  setFormData({ ...formData, first_name: e.target.value });
                }}
              />
            </label>

            <label
              htmlFor="last-name"
              className="w-full flex flex-col font-poppins md:basis-1/2 md:px-8"
            >
              <span className="font-medium">Last Name</span>
              <input
                type="text"
                id="last-name"
                name="last-name"
                placeholder="Enter last name"
                className="border-b-2 mt-2 focus:outline-none"
                value={formData.last_name}
                onChange={(e) => {
                  setFormData({ ...formData, last_name: e.target.value });
                }}
              />
            </label>

            <label
              htmlFor="address"
              className="w-full flex flex-col font-poppins md:basis-1/2 md:px-8"
            >
              <span className="font-medium">Address</span>
              <input
                type="text"
                id="address"
                name="address"
                placeholder="Enter address"
                className="border-b-2 mt-2 focus:outline-none"
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
              />
            </label>
          </div>

          <FormButton title={"Update"} className={"self-end"} px={2} />
        </form>
      )}
    </div>
  );
};

export default UserEdit;
