import React, { useRef } from "react";
import { useNavigate, useParams } from "react-router";
import {
  deleteUserTransaction,
  generateToken,
  userTransactionDetails,
} from "../../lib/api/TransactionApi";
import { useLocalStorage } from "react-use";
import { PuffLoader } from "react-spinners";
import { Button } from "../../components/common/Button";
import { useOutletContext } from "react-router";
import formatCurrency from "../../lib/formatCurrency";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import BackButton from "../../components/common/BackButton";
import { alertConfirm, alertError } from "../../lib/alert";

const TransactionDetail = () => {
  const { user } = useOutletContext();
  const SHIPPING = {
    name: "Vinn Express",
    estimate: "1-2 hours",
    cost: 30000,
  };
  const snapToken = useRef("");
  const { transactionId } = useParams();
  const [accessToken, _] = useLocalStorage("access-token");
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: [`transactions ${transactionId}`],
    queryFn: async () => {
      const response = await userTransactionDetails(accessToken, transactionId);
      const responseBody = await response.json();

      if (response.status !== 200) {
        const error = new Error(
          Object.values(responseBody.errors).flat().join("\n"),
        );
        error.status = response.status;
        throw error;
      }

      return responseBody.data;
    },
  });

  const mutation = useMutation({
    mutationFn: async () => {
      const response = await deleteUserTransaction(accessToken, data.id);
      const responseBody = await response.json();

      if (response.status !== 200) {
        throw new Error(Object.values(responseBody.errors).flat().join("\n"));
      }
      return responseBody.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      console.log("Transaction cancelled successfully");
      navigate("/transactions/history");
    },
    onError: (error) => {
      alertError(error.message);
    },
  });

  const getSnapToken = async () => {
    const response = await generateToken(accessToken, data.id);
    const responseBody = await response.json();

    if (response.status === 200) {
      snapToken.current = responseBody.data.snap_token;
    } else {
      console.error(responseBody.errors);
    }
  };

  const handleRetry = async () => {
    console.log(snapToken.current);
    if (snapToken.current === "") {
      await getSnapToken();
    }
    window.snap.pay(snapToken.current, {
      onSuccess: () => navigate(`/transactions/history`),
      onError: () => console.log("error"),
    });
  };

  const handleCancel = async () => {
    const confirmed = await alertConfirm(
      "Are you sure want to cancel this order ?",
    );
    if (confirmed) {
      mutation.mutate();
    }
  };

  const RenderContent = () => {
    if (isLoading)
      return <PuffLoader color="var(--primary)" className="self-center" />;
    if (isError) {
      if (error.status === 404) {
        return (
          <p className="text-center text-xl font-poppins mx-auto my-auto">
            404 - Data not found.
          </p>
        );
      }
      return console.error(error.message);
    }

    const date = new Date(data.created_at);
    const transactionDate = date.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    const transactionTime = date.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    return (
      <>
        <div>
          <BackButton className={"hover:text-primary mb-2"} />
          <h1 className="font-bold text-2xl md:text-3xl">
            TRX-{transactionDate.replaceAll("/", "")}-{data.id}
          </h1>
          <p
            className={`rounded-lg border-2 px-2 py-0.5 w-fit ${data.status === "paid" ? "bg-green-200" : "bg-amber-100"} text-xs mb-2`}
          >
            Status: {data.status}
          </p>
          <p className="text-sm text-text-muted">
            Created at: {transactionDate} {transactionTime}
          </p>
          <hr />
        </div>

        <div className="bg-surface p-2 md:p-4 space-y-2 md:space-y-4">
          <div className="text-sm space-y-2">
            <h2 className="font-bold text-base md:text-xl">
              Order Information
            </h2>
            <hr />
            <div>
              <h3 className="font-bold md:text-base">Recipient: </h3>
              <p className="text-text-muted">
                {user.first_name} {user.last_name}
              </p>
            </div>
            <div>
              <h3 className="font-bold md:text-base">Address</h3>
              <p className="text-text-muted">{user.address}</p>
            </div>
            <div>
              <h3 className="font-bold md:text-base">Courier</h3>
              <p className="text-text-muted">
                {SHIPPING.name} ({SHIPPING.estimate} estimated arrival)
              </p>
            </div>
            <div>
              <h3 className="font-bold md:text-base">Shipping Cost</h3>
              <p className="text-text-muted">{formatCurrency(SHIPPING.cost)}</p>
            </div>
            <div>
              <h3 className="font-bold md:text-base">Payment method</h3>
              <p className="text-text-muted">
                {data.payment_method ? data.payment_method : "-"}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-y-1 overflow-y-auto text-sm">
            <h2 className="font-bold text-base md:text-xl">Items</h2>
            <hr />
            {data.menus.map((item) => {
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

          <div className="text-sm md:text-base space-y-2 pt-2">
            <h2 className="font-bold text-base md:text-xl">Price Breakdown</h2>
            <hr />
            <div className="flex justify-between">
              <p>Subtotal: </p>
              <p>{formatCurrency(data.total_price / 1.1 - SHIPPING.cost)}</p>
            </div>
            <div className="flex justify-between">
              <p>Shipping cost: </p>
              <p>{formatCurrency(SHIPPING.cost)}</p>
            </div>
            <div className="flex justify-between">
              <p>Tax: </p>
              <p>10%</p>
            </div>
            <div className="font-bold flex justify-between text-xl md:text-2xl">
              <p>Total: </p>
              <p>{formatCurrency(data.total_price)}</p>
            </div>
          </div>
        </div>

        {data.status !== "paid" && (
          <div className="flex gap-x-4 w-fit">
            <Button
              title="Retry payment"
              className="mr-auto"
              px={2}
              onClick={handleRetry}
            />
            <Button
              title="Cancel order"
              className="bg-red-400"
              colorHover="transparent"
              px={2}
              onClick={handleCancel}
            />
          </div>
        )}
      </>
    );
  };
  return (
    <>
      <section className="px-8 py-8 flex flex-col font-poppins gap-y-4 md:gap-y-8">
        <RenderContent />
      </section>
    </>
  );
};

export default TransactionDetail;
