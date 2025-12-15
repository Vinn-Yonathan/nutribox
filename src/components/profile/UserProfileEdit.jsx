import { UserRound } from "lucide-react";
import React, { useState } from "react";
import ProfileField from "../common/ProfileField";
import { FormButton } from "../common/FormButton";
import { useNavigate, useOutletContext } from "react-router";
import { userUpdate } from "../../lib/api/UserApi";
import { alertConfirm, alertError, alertSuccess } from "../../lib/alert";
import { Button } from "../common/Button";
import { useLocalStorage } from "react-use";

const UserProfileEdit = () => {
  const { user, getUserDetail } = useOutletContext();
  const [firstName, setFirstName] = useState(user.first_name);
  const [lastName, setLastName] = useState(user.last_name);
  const [email, setEmail] = useState(user.email);
  const [address, setAddress] = useState(user.address || "");
  const [accessToken, _] = useLocalStorage("access-token", "");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedField = {};

    const confirmed = await alertConfirm("");

    if (confirmed) {
      if (firstName !== user.first_name) updatedField.firstName = firstName;
      if (lastName !== user.last_name) updatedField.lastName = lastName;
      if (email !== user.email) updatedField.email = email;
      if (address !== user.address) updatedField.address = address;

      if (Object.keys(updatedField).length === 0) {
        await alertError("No changes detected!");
        return;
      }

      console.log(accessToken);
      const response = await userUpdate(updatedField, accessToken);
      const responseBody = await response.json();
      console.log(responseBody);
      console.log(response.status);

      if (response.status === 200) {
        alertSuccess("User updated successfully!");
        await getUserDetail();
        await navigate("/profile");
      } else {
        console.log(responseBody.errors);
        await alertError(Object.values(responseBody.errors).flat().join("\n"));
      }
    }
    return;
  };

  return (
    <>
      <section className="flex-center flex-col gap-y-8 p-8">
        <div className="p-5 bg-primary rounded-full w-fit">
          <UserRound size={50} />
        </div>

        <h1 className="font-fraunces font-bold text-center text-4xl lg:text-5xl">
          {user.first_name} {user.last_name}
        </h1>
      </section>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col mx-12 my-8 lg:my-12 gap-y-6 lg:gap-y-12 md:flex-row md:flex-wrap"
      >
        <label
          htmlFor="first-name"
          className="w-full flex flex-col font-poppins md:basis-1/2 md:px-8"
        >
          <span className="font-medium">First Name</span>
          <input
            type="text"
            id="first-name"
            name="first-name"
            placeholder="Enter your first name"
            className="border-b-2 mt-2 focus:outline-none"
            value={firstName}
            onChange={(e) => {
              setFirstName(e.target.value);
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
            placeholder="Enter your last name"
            className="border-b-2 mt-2 focus:outline-none"
            value={lastName}
            onChange={(e) => {
              setLastName(e.target.value);
            }}
          />
        </label>

        <label
          htmlFor="email"
          className="w-full flex flex-col font-poppins md:basis-1/2 md:px-8"
        >
          <span className="font-medium">E-mail</span>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            className="border-b-2 mt-2 focus:outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            placeholder="Enter your address"
            className="border-b-2 mt-2 focus:outline-none"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </label>

        <div className="flex-center gap-x-4 md:mx-auto md:gap-x-12">
          <Button
            title="cancel"
            className={"bg-red-400"}
            colorHover="transparent"
            px={3}
            type="button"
            onClick={() => navigate("/profile")}
          />
          <FormButton title="save" px={3} />
        </div>
      </form>
    </>
  );
};

export default UserProfileEdit;
