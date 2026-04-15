import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import { DashboardLayout } from "./components/layout/DashboardLayout.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { store } from "./store/store.js";
import Landing from "./pages/Landing.jsx";
import AuthLayout from "./components/layout/AuthLayout.jsx";
import UserLayout from "./components/layout/UserLayout.jsx";
import MenuAdd from "./pages/dashboard/Menus/MenuAdd.jsx";
import MenuEdit from "./pages/dashboard/Menus/MenuEdit.jsx";
import MenuList from "./pages/dashboard/Menus/MenuList.jsx";
import UserEdit from "./pages/dashboard/Users/UserEdit.jsx";
import UserRegister from "./pages/register/UserRegister.jsx";
import UserLogin from "./pages/login/LoginForm.jsx";
import UserProfile from "./pages/profile/UserProfile.jsx";
import UserProfileEdit from "./pages/profile/UserProfileEdit.jsx";
import UserList from "./pages/dashboard/Users/UserList.jsx";
import MenuCatalog from "./pages/menu/MenuCatalog.jsx";
import MenuDetails from "./pages/menu/MenuDetails.jsx";
import UserCart from "./pages/transaction/UserCart.jsx";
import TransactionSummary from "./pages/transaction/TransactionSummary.jsx";
import AdminValidation from "./components/validation/AdminValidation.jsx";
import TransactionHistory from "./pages/transaction/TransactionHistory.jsx";
import TransactionDetail from "./pages/transaction/TransactionDetail.jsx";

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
              <Route
                path="/transactions/summary"
                element={<TransactionSummary />}
              />
              <Route
                path="/transactions/:transactionId"
                element={<TransactionDetail />}
              />
              <Route
                path="/transactions/history"
                element={<TransactionHistory />}
              />
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
