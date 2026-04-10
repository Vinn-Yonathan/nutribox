import React, { useState } from "react";
import { LucideEye, LucideEyeClosed } from "lucide-react";
import { FormButton } from "../../components/common/FormButton";
import { Link, useNavigate } from "react-router";
import { userRegister } from "../../lib/api/UserApi";
import { alertError, alertSuccess } from "../../lib/alert";

const UserRegister = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await userRegister({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    });
    const responseBody = await response.json();
    console.log(responseBody);
    console.log(response.status);

    if (response.status === 201) {
      alertSuccess("User created successfully!");
      await navigate("/login");
    } else {
      console.log(responseBody.errors);
      await alertError(Object.values(responseBody.errors).flat().join("\n"));
    }
  };

  const togglePassowrd = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };
  return (
    <>
      <img
        src="src/assets/img/logo.png"
        alt="Nutribox Logo"
        className="object-cover h-24 -mb-6"
        loading="lazy"
      />
      <h1 className="font-fraunces font-bold text-4xl mb-8">
        Welcome to Nutribox!
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex items-center flex-col gap-y-6"
      >
        <label
          htmlFor="first-name"
          className="w-full flex flex-col gap-y-4 font-poppins"
        >
          <span className="font-medium">First Name</span>
          <input
            type="text"
            id="first-name"
            name="first-name"
            placeholder="Enter your first name"
            className="border-b-2 py-[0.5em] focus:outline-none"
            value={firstName}
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
          />
        </label>
        <label
          htmlFor="last-name"
          className="w-full flex flex-col gap-y-4 font-poppins"
        >
          <span className="font-medium">Last Name</span>
          <input
            type="text"
            id="last-name"
            name="last-name"
            placeholder="Enter your last-name"
            className="border-b-2 py-[0.5em] focus:outline-none"
            required
            value={lastName}
            onChange={(e) => {
              setLastName(e.target.value);
            }}
          />
        </label>
        <label
          htmlFor="email"
          className="w-full flex flex-col gap-y-4 font-poppins"
        >
          <span className="font-medium">E-mail</span>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            className="border-b-2 py-[0.5em] focus:outline-none"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label
          htmlFor="password"
          className="w-full flex flex-col gap-y-4 font-poppins"
        >
          <span className="font-medium">Password</span>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              placeholder="Enter your password"
              className="border-b-2 py-[0.5em] focus:outline-none w-full"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={togglePassowrd}
              className="absolute right-0 bottom-[0.5em]"
            >
              {showPassword ? <LucideEye /> : <LucideEyeClosed />}
            </button>
          </div>
        </label>
        <FormButton title="Sign Up" className={"mt-4"} />
      </form>
      <div>
        <p className="text-center text-sm">
          Already have account? <br />{" "}
          <Link
            to="/login"
            className="font-bold hover:underline hover:text-primary"
          >
            Sign in
          </Link>
        </p>
      </div>
    </>
  );
};

export default UserRegister;
