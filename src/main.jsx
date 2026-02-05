import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Landing from "./pages/Landing.jsx";
import { BrowserRouter, Route, Routes } from "react-router";
import AuthLayout from "./components/Layout/AuthLayout.jsx";
import UserLayout from "./components/layout/UserLayout.jsx";
import { DashboardLayout } from "./components/layout/DashboardLayout.jsx";
import MenuAdd from "./components/dashboard/Menus/MenuAdd.jsx";
import MenuEdit from "./components/dashboard/Menus/MenuEdit.jsx";
import MenuList from "./components/dashboard/Menus/MenuList.jsx";
import UserEdit from "./components/dashboard/Users/UserEdit.jsx";
import UserRegister from "./components/register/UserRegister.jsx";
import UserLogin from "./components/login/LoginForm.jsx";
import UserProfile from "./components/profile/UserProfile.jsx";
import UserProfileEdit from "./components/profile/UserProfileEdit.jsx";
import UserList from "./components/dashboard/Users/UserList.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MenuCatalog from "./pages/MenuCatalog.jsx";
import MenuDetails from "./pages/MenuDetails.jsx";
import UserCart from "./components/profile/UserCart.jsx";
import { Provider } from "react-redux";
import { store } from "./store/store.js";
import AdminValidation from "./components/validation/AdminValidation.jsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 2 * 60 * 1000,
      gcTime: 5 * 60 * 1000,
    },
  },
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path={"/"} element={<Landing />} />
            <Route path={"/menus"} element={<MenuCatalog />} />
            <Route path={"/menus/:menuId"} element={<MenuDetails />} />

            <Route element={<UserLayout />}>
              <Route path="/profile" element={<UserProfile />} />
              <Route path="/profile/edit" element={<UserProfileEdit />} />
              <Route path="/cart" element={<UserCart />} />
            </Route>

            <Route element={<AuthLayout />}>
              <Route path="/login" element={<UserLogin />} />
              <Route path="/register" element={<UserRegister />} />
            </Route>

            <Route
              path="/dashboard"
              element={
                <AdminValidation>
                  <DashboardLayout />
                </AdminValidation>
              }
            >
              <Route path="menus">
                <Route index element={<MenuList />} />
                <Route path="add" element={<MenuAdd />} />
                <Route path=":menuId/edit" element={<MenuEdit />} />
              </Route>
              <Route path="users">
                <Route index element={<UserList />} />
                <Route path=":userId">
                  <Route path="edit" element={<UserEdit />} />
                </Route>
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </Provider>
  </StrictMode>,
);
