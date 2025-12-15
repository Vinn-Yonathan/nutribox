import React, { useState } from "react";
import { FormButton } from "../common/FormButton";
import { Link, useNavigate } from "react-router";
import { LucideEye, LucideEyeClosed } from "lucide-react";
import { userLogin } from "../../lib/api/UserApi";
import { alertError } from "../../lib/alert";
import { useLocalStorage } from "react-use";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [_, setAccessToken] = useLocalStorage("access-token", "");
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await userLogin({ email, password });
    const responseBody = await response.json();
    console.log(responseBody);
    console.log(response.status);

    if (response.status === 200) {
      setAccessToken(responseBody.data.access_token);
      await navigate("/");
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
        className="object-cover h-24 -mb-4"
        loading="lazy"
      />
      <h1 className="font-fraunces font-bold text-4xl mb-12">Welcome Back !</h1>
      <form
        onSubmit={handleSubmit}
        className="flex items-center flex-col gap-y-8"
      >
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
        <FormButton title="Sign In" className={"mt-8"} />
      </form>
      <div>
        <p className="text-center text-sm">
          Doesn't have account? <br />{" "}
          <Link
            to="/register"
            className="font-bold hover:underline hover:text-primary"
          >
            Sign up
          </Link>
        </p>
      </div>
    </>
  );
};

export default UserLogin;
