import React from "react";
import { Link, Outlet } from "react-router";
import FooterInfo from "../common/FooterInfo";
import register_store from "../../assets/img/register-store.jpg";

const AuthLayout = () => {
  return (
    <main className="flex w-screen h-screen">
      <img
        src={register_store}
        alt="Picture of Nutribox Main Store Front Counter"
        className="flex-1 object-cover hidden lg:block h-full"
        loading="lazy"
      />
      <div className="flex-1 flex-center flex-col gap-y-4 paddingx-mobile lg:px-0">
        <Outlet />
      </div>
    </main>
  );
};

export default AuthLayout;
