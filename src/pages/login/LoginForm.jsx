import React, { useState } from "react";
import { FormButton } from "../../components/common/FormButton";
import { Link, useNavigate } from "react-router";
import { LucideEye, LucideEyeClosed } from "lucide-react";
import { userLogin } from "../../lib/api/UserApi";
import { alertError } from "../../lib/alert";
import { useLocalStorage } from "react-use";
import { useDispatch, useSelector } from "react-redux";
import { clear } from "../../store/slices/cartSlice";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cartItemMultipleAdd } from "../../lib/api/CartApi";
import logo from "/logo.png";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [_, setAccessToken] = useLocalStorage("access-token", "");
  const navigate = useNavigate();
  const guestCartItems = useSelector((state) => state.cartGuest.items);
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);

  const mutation = useMutation({
    mutationFn: async ({ datas, token }) => {
      const response = await cartItemMultipleAdd(datas, token);
      const responseBody = await response.json();

      if (response.status !== 201) {
        throw new Error(Object.values(responseBody.errors).flat().join("\n"));
      }

      return responseBody.data;
    },
    onMutate: async ({ datas }) => {
      await queryClient.cancelQueries({ queryKey: ["carts"] });
      const prevCart = queryClient.getQueryData(["carts"]);
      queryClient.setQueryData(["carts"], (old) => {
        if (!old) return old;
        let newCart = old;

        datas.forEach((data) => {
          const isExist = old.items.find(
            (item) => item.menu_id === data.menu_id,
          );

          if (isExist) {
            newCart = {
              ...newCart,
              items: newCart.items.map((item) =>
                item.menu_id === data.menu_id
                  ? { ...item, quantity: item.quantity + data.quantity }
                  : item,
              ),
            };
          } else {
            newCart = {
              ...newCart,
              items: [
                ...newCart.items,
                { menu_id: data.menu_id, quantity: data.quantity },
              ],
            };
          }
        });
        return newCart;
      });

      return { prevCart };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["carts"] });
      dispatch(clear());
      console.info("Cart item added successfully.");
    },
    onError: (error, _, context) => {
      if (context?.prevCart !== undefined) {
        queryClient.setQueryData(["carts"], context.prevCart);
      }
      alertError(error.message);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await userLogin({ email, password });
    const responseBody = await response.json();
    console.log(responseBody);
    console.log(response.status);

    if (response.status === 200) {
      setAccessToken(responseBody.data.access_token);
      console.log(guestCartItems.length !== 0);
      if (guestCartItems.length !== 0) {
        await mutation.mutateAsync({
          datas: guestCartItems,
          token: responseBody.data.access_token,
        });
      }
      navigate("/");
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
        src={logo}
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
