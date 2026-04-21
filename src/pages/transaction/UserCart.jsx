import { useEffect, useState } from "react";
import { Button } from "../../components/common/Button";
import { Trash } from "lucide-react";
import { PuffLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import { remove } from "../../store/slices/cartSlice";
import { useLocalStorage } from "react-use";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { cartDetail, cartItemDelete } from "../../lib/api/CartApi";
import { useNavigate } from "react-router";
import formatCurrency from "../../lib/formatCurrency";

const UserCart = () => {
  const queryClient = useQueryClient();
  const serverURL = import.meta.env.VITE_API_BASE_URL;
  const [accessToken] = useLocalStorage("access-token", "");
  const [totalPrice, setTotalPrice] = useState(0);
  const guestCartItems = useSelector((state) => state.cartGuest.items);
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["carts"],
    queryFn: async () => {
      const response = await cartDetail(accessToken);
      const responseBody = await response.json();
      console.log(responseBody);

      if (response.status !== 200) {
        throw new Error(Object.values(responseBody.errors).flat().join("\n"));
      }

      return responseBody.data;
    },
    enabled: !!accessToken,
  });

  const mutation = useMutation({
    mutationFn: async (item) => {
      const response = await cartItemDelete(item.menu_id, accessToken);
      const responseBody = await response.json();

      if (response.status !== 200) {
        throw new Error(Object.values(responseBody.errors).flat().join("\n"));
      }

      return responseBody.data;
    },
    onMutate: async (data) => {
      await queryClient.cancelQueries({ queryKey: ["carts"] });
      const prevCart = queryClient.getQueryData(["carts"]);
      queryClient.setQueryData(["carts"], (old) => {
        if (!old) return old;

        return {
          ...old,
          items: old.items.filter((menu) => menu.menu_id !== data.menu_id),
        };
      });

      return { prevCart };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["carts"] });

      console.info("Cart item deleted successfully.");
    },
    onError: (error, context) => {
      queryClient.setQueryData(["carts"], context.prevCart);
      console.error(error.message);
    },
  });

  const handleRemove = (item) => {
    if (accessToken) {
      mutation.mutate(item);
    } else {
      dispatch(remove(item.menu_id));
    }
  };

  const handleCheckout = () => {
    if (accessToken) {
      navigate("/transactions/summary", { state: { cart, totalPrice } });
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    if (accessToken && data?.items) {
      setCart(data.items);
    } else {
      setCart(guestCartItems);
    }
  }, [accessToken, data?.items, guestCartItems]);

  useEffect(() => {
    setTotalPrice(
      cart.reduce((total, item) => total + item.price * item.quantity, 0),
    );
  }, [cart]);

  const RenderContent = () => {
    if (isLoading)
      return (
        <PuffLoader color="var(--primary)" className="self-center my-10" />
      );
    if (isError) return console.error(error.message);
    if (cart.length === 0)
      return <p className="text-center text-xl font-poppins">No item found.</p>;

    return (
      <>
        <div className="flex flex-col gap-y-8 overflow-y-auto sm:px-4">
          {cart.map((item) => {
            return (
              <div
                className="flex items-center gap-x-4 w-full font-poppins"
                key={item.menu_id}
              >
                <img
                  src={serverURL + item.image_src}
                  alt={`Picture of ${item.name}`}
                  className="h-16 rounded-2xl"
                />
                <p className="font-bold">{item.name}</p>
                <p>{item.quantity}x</p>
                <p>{formatCurrency(item.price)}</p>
                <p className="ml-auto font-bold">
                  {formatCurrency(item.price * item.quantity)}
                </p>
                <button onClick={() => handleRemove(item)}>
                  <Trash className="text-red-400 hover:text-red-600 transition duration-100" />
                </button>
              </div>
            );
          })}
        </div>

        <div className="flex flex-col mt-4">
          <hr className="w-full text-text" />
          <div className="flex justify-between p-2 font-bold font-poppins text-xl lg:text-2xl">
            <p>Total </p>
            <p>{formatCurrency(totalPrice)}</p>
          </div>
          <Button title="Check Out" className="mt-4" onClick={handleCheckout} />
        </div>
      </>
    );
  };

  return (
    <>
      <section className="h-[75vh] sm:px-8 py-8 flex flex-col justify-between">
        <RenderContent />
      </section>
    </>
  );
};

export default UserCart;
