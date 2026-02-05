import React, { useState } from "react";
import { menuDetail } from "../lib/api/MenuApi";
import { useParams } from "react-router";
import { useLocalStorageState } from "../hooks/useLocalStorageState";
import { CircleMinus, CirclePlus } from "lucide-react";
import { Button } from "../components/common/Button";
import BackButton from "../components/common/BackButton";
import NavBar from "../components/common/Navbar";
import FooterInfo from "../components/common/FooterInfo";
import { useDispatch } from "react-redux";
import { add } from "../store/slices/cartSlice";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { cartItemAdd } from "../lib/api/CartApi";
import { PuffLoader } from "react-spinners";

const MenuDetails = () => {
  const menuId = useParams();
  const queryClient = useQueryClient();
  const [quantity, setQuantity] = useState(1);
  const serverURL = import.meta.env.VITE_API_BASE_URL;
  const [accessToken] = useLocalStorageState("access-token", "");
  const dispatch = useDispatch();

  const mutation = useMutation({
    mutationFn: async () => {
      const response = await cartItemAdd(
        { menuId: menu.id, quantity },
        accessToken,
      );
      const responseBody = await response.json();

      if (response.status !== 201) {
        throw new Error(Object.values(responseBody.errors).flat().join("\n"));
      }

      return responseBody.data;
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["carts"] });
      const prevCart = queryClient.getQueryData(["carts"]);
      queryClient.setQueryData(["carts"], (old) => {
        if (!old) return old;

        const isExist = old.items.find((item) => item.menu_id === menu.id);

        if (isExist) {
          return {
            ...old,
            items: old.items.map((item) =>
              item.menu_id === menu.id
                ? { ...item, quantity: item.quantity + quantity }
                : item,
            ),
          };
        }

        return {
          ...old,
          items: [...old.items, { menu_id: menu.id, quantity: quantity }],
        };
      });

      return { prevCart };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["carts"] });

      console.info("Cart item added successfully.");
    },
    onError: (error, context) => {
      queryClient.setQueryData(["carts"], context.prevCart);
      console.error(error.message);
    },
  });

  const {
    data: menu,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: [`menu ${menuId.menuId}`],
    queryFn: async () => {
      const response = await menuDetail(menuId.menuId);
      const responseBody = await response.json();
      console.log(responseBody);

      if (response.status !== 200) {
        console.error(Object.values(responseBody.errors).flat().join("\n"));
      }

      return responseBody.data;
    },
  });

  const handleQuantity = (operation = "-") => {
    if (operation === "-") {
      setQuantity((prev) => prev - 1);
    }
    if (operation === "+") {
      setQuantity((prev) => prev + 1);
    }
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    if (!accessToken) {
      dispatch(
        add({
          menu_id: menu.id,
          name: menu.name,
          image_src: menu.image_src,
          price: menu.price,
          quantity: quantity,
        }),
      );
    } else {
      mutation.mutate();
    }
  };

  const RenderContent = () => {
    if (isLoading)
      return (
        <PuffLoader color="var(--primary)" className="self-center my-10" />
      );
    if (isError) return console.error(error.message);

    return (
      <section className="flex-center flex-col lg:flex-row gap-y-4 lg:gap-y-0 md:gap-x-12 lg:gap-x-32">
        <img
          className="w-full md:w-[30rem] md:h-[30rem] rounded-3xl"
          src={`${serverURL}${menu.image_src}`}
          alt={`${menu.name}`}
        />
        <div className="flex flex-col gap-y-4 font-poppins">
          <h1 className="font-fraunces text-4xl lg:text-6xl font-bold">
            {menu.name}
          </h1>
          <p className="text-lg md:text-base lg:text-lg">{menu.description}</p>
          <div className="flex flex-col gap-1 text-text-muted font-bold text-base">
            <p>Stock: {menu.stock}</p>
            <p>{menu.calories} Kcal/serving</p>
          </div>

          <div className="flex gap-x-4 py-4 font-bold ">
            <p>Quantity: </p>
            <div className="flex gap-x-2">
              <button
                onClick={() => handleQuantity("-")}
                disabled={quantity === 1}
              >
                <CircleMinus
                  size={22}
                  color={quantity === 1 ? "var(--text-muted)" : "var(--text)"}
                  className={quantity === 1 ? "opacity-80" : "opacity-100"}
                />
              </button>
              <p className="border-b-2 px-2">{quantity}</p>
              <button
                onClick={() => handleQuantity("+")}
                disabled={quantity === menu.stock}
              >
                <CirclePlus
                  size={22}
                  color={
                    quantity === menu.stock
                      ? "var(--text-muted)"
                      : "var(--text)"
                  }
                  className={
                    quantity === menu.stock ? "opacity-80" : "opacity-100"
                  }
                />
              </button>
            </div>
          </div>

          <p className="font-bold text-xl">
            Total price: {menu.price * quantity}$
          </p>

          <div className="-ml-2">
            <Button
              title="Add to cart"
              type="submit"
              px={1.5}
              onClick={handleAddToCart}
            />
          </div>
        </div>
      </section>
    );
  };

  return (
    <div className="flex flex-col justify-between min-h-screen">
      <header>
        <NavBar />
      </header>
      <main className="flex flex-col justify-center gap-y-8 mt-10 px-8 py-8 sm:paddingx-tablet lg:paddingx">
        <BackButton className="self-start lg:-mt-12 hover:text-primary transition duration-200" />
        <RenderContent />
      </main>
      <footer className="px-10">
        <FooterInfo />
      </footer>
    </div>
  );
};

export default MenuDetails;
