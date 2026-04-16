import React from "react";
import { useLocation, useNavigate, useOutletContext } from "react-router";
import BackButton from "../../components/common/BackButton";
import { Button } from "../../components/common/Button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { transactionAdd } from "../../lib/api/TransactionApi";
import { useLocalStorage } from "react-use";
import { alertConfirm, alertError } from "../../lib/alert";
import formatCurrency from "../../lib/formatCurrency";

const TransactionSummary = () => {
  const { state } = useLocation();
  const { cart, totalPrice } = state;
  const { user } = useOutletContext();
  const [accessToken, _] = useLocalStorage("access-token");
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const SHIPPING = {
    name: "Vinn Express",
    estimate: "1-2 hours",
    cost: 30000,
  };

  const mutation = useMutation({
    mutationFn: async () => {
      const response = await transactionAdd(
        cart,
        (totalPrice + SHIPPING.cost) * 0.1 + (totalPrice + SHIPPING.cost),
        accessToken,
      );
      const responseBody = await response.json();

      if (response.status !== 201) {
        throw new Error(Object.values(responseBody.errors).flat().join("\n"));
      }
      return responseBody.data;
    },
    onSuccess: (data) => {
      console.info("Transaction created successfully.");
      queryClient.invalidateQueries({ queryKey: ["transactions"] });

      window.snap.pay(data.snap_token, {
        onSuccess: () => {
          navigate(`/transactions/${data.id}`);
        },
        onClose: () => navigate("/transactions/history"),
        onPending: () => navigate("/transactions/history"),
        onError: () => console.log("error"),
      });
    },
    onError: (error) => {
      alertError(error.message);
      console.error(error.message);
    },
  });

  const handleSubmit = async () => {
    const confirmed = await alertConfirm(
      "Are you sure want to order these items ?",
    );
    if (confirmed) {
      if (!user.address) {
        alertError(
          "Please add your address to your profile first before create order.",
        );
      } else {
        mutation.mutate();
      }
    }
  };

  return (
    <>
      <section className="px-8 py-8 flex flex-col font-poppins gap-y-4 md:gap-y-8">
        <BackButton
          className={
            "self-start ml-2 md:ml-4 hover:text-primary transition duration-200 text-sm md:text-base"
          }
        />
        <h1 className="font-bold text-2xl md:text-3xl pb-2">Summary</h1>

        <div className="space-y-2 md:space-y-4">
          <h2 className="font-bold md:text-xl">Shipping</h2>
          <div className="bg-surface rounded-2xl p-2 md:p-4 text-sm space-y-2">
            <div>
              <h3 className="font-bold md:text-base">Address</h3>
              <p>{user.address}</p>
            </div>
            <div>
              <h3 className="font-bold md:text-base">Courier</h3>
              <p>
                {SHIPPING.name} ({SHIPPING.estimate} estimated arrival)
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-2 md:space-y-4">
          <h2 className="font-bold md:text-xl">Items</h2>
          <div className="flex flex-col gap-y-1 overflow-y-auto bg-surface rounded-2xl p-2 md:p-4 text-sm">
            {cart.map((item) => {
              return (
                <div
                  className="flex items-center gap-x-2 w-full"
                  key={item.menu_id}
                >
                  <p>{item.name}</p>
                  <p>{item.quantity}x</p>
                  <p>{formatCurrency(item.price)}</p>
                  <p className="ml-auto">
                    {formatCurrency(item.price * item.quantity)}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="text-sm md:text-base md:space-y-1">
          <div className="flex justify-between">
            <p>Subtotal: </p>
            <p>{formatCurrency(totalPrice)}</p>
          </div>
          <div className="flex justify-between">
            <p>Shipping cost: </p>
            <p>{formatCurrency(SHIPPING.cost)}</p>
          </div>
          <div className="flex justify-between">
            <p>Tax: </p>
            <p>10%</p>
          </div>
          <hr />
          <div className="font-bold flex justify-between text-xl md:text-2xl pt-4">
            <p>Total: </p>
            <p>{formatCurrency((totalPrice + SHIPPING.cost) * 1.1)}</p>
          </div>
        </div>
        <Button
          title="Check Out"
          className="ml-auto -mt-4"
          px={2}
          onClick={handleSubmit}
        />
      </section>
    </>
  );
};

export default TransactionSummary;
