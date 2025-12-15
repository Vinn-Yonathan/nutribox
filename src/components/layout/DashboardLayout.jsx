import { BadgeDollarSign, CookingPot, House, UserRound } from "lucide-react";
import React from "react";
import { useLocation } from "react-router";
import { Link, Outlet } from "react-router";

export const DashboardLayout = () => {
  const url = useLocation();
  return (
    <div className="flex h-screen w-screen fixed overflow-y-hidden">
      <nav className="bg-primary/60 py-8 pl-8 pr-8 xl:pr-0 basis-1/6">
        <h1 className="font-jomhuria text-5xl text-text pb-8">NUTRIBOX</h1>
        <div className="flex flex-col gap-y-6 font-poppins">
          <Link
            className={`flex items-center gap-x-4 ${
              url.pathname === "/dashboard"
                ? "text-text font-bold"
                : "text-text-muted"
            }`}
            to="/dashboard"
          >
            <House size={20} strokeWidth={2.5} /> <span>Home</span>
          </Link>

          <Link
            className={`flex items-center gap-x-4 ${
              url.pathname === "/dashboard/users"
                ? "text-text font-bold"
                : "text-text-muted"
            }`}
            to="/dashboard/users"
          >
            <UserRound size={20} strokeWidth={2.5} /> <span>Users</span>
          </Link>

          <Link
            className={`flex items-center gap-x-4 ${
              url.pathname === "/dashboard/menus"
                ? "text-text font-bold"
                : "text-text-muted"
            }`}
            to="/dashboard/menus"
          >
            <CookingPot size={20} strokeWidth={2.5} /> <span>Menus</span>
          </Link>

          <Link
            className={`flex items-center gap-x-4 ${
              url.pathname === "/dashboard/transaction"
                ? "text-text font-bold"
                : "text-text-muted"
            }`}
          >
            <BadgeDollarSign size={20} strokeWidth={2.5} />{" "}
            <span>Transactions</span>
          </Link>
        </div>
      </nav>
      <main className="py-8 px-24 w-full overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};
