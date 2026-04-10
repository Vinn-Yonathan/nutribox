import { useQuery } from "@tanstack/react-query";
import React from "react";
import { userTransactionList } from "../../lib/api/TransactionApi";
import { useLocalStorage } from "react-use";
import { PuffLoader } from "react-spinners";
import { useNavigate } from "react-router";
import formatCurrency from "../../lib/formatCurrency";

const TransactionHistory = () => {
  const [accessToken, _] = useLocalStorage("access-token");
  const navigate = useNavigate();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["transactions"],
    queryFn: async () => {
      const response = await userTransactionList(accessToken);
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

  const RenderContent = () => {
    if (isLoading)
      return <PuffLoader color="var(--primary)" className="self-center" />;
    if (isError) {
      if (error.status === 404) {
        return (
          <p className="text-center text-xl font-poppins mx-auto my-auto">
            No transaction found.
          </p>
        );
      }
      return console.error(error.message);
    }

    return (
      <>
        {data.map((transaction) => {
          const transactionDate = new Date(transaction.created_at)
            .toLocaleDateString("id-ID", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })
            .replaceAll("/", "");
          return (
            <div
              key={transaction.id}
              className="rounded-xl border-2 p-4 md:p-5 xl:p-6 space-y-2 xl:space-y-3"
              onClick={() => navigate(`/transactions/${transaction.id}`)}
            >
              <h2 className="font-bold md:text-lg xl:text-2xl">
                TRX-{transactionDate}-{transaction.id}
              </h2>
              <div className="flex justify-between items-center">
                <div
                  className={`${transaction.status === "paid" ? "bg-green-200" : "bg-amber-100"} rounded-lg border-2 px-2 py-1 w-fit`}
                >
                  <p className="text-xs md:text-sm xl:text-base">
                    Status: {transaction.status}
                  </p>
                </div>
                <p className="font-semibold md:text-lg xl:text-2xl">
                  {formatCurrency(transaction.total_price)}
                </p>
              </div>
            </div>
          );
        })}
      </>
    );
  };
  return (
    <>
      <section className="h-[75vh] px-8 py-8 flex flex-col font-poppins gap-y-4 md:gap-y-8 overflow-y-scroll">
        <RenderContent />
      </section>
    </>
  );
};

export default TransactionHistory;
