import React from "react";
import { useGetOrderSummaryQuery } from "../orderSlice";
import FormWrapper from "../../components/FormWrapper";
import Header from "../../components/Header";
import { BeatLoader } from "react-spinners";

const formatCurrency = (amount, currency = "INR") => {
return new Intl.NumberFormat("en-IN", { style: "currency", currency }).format(
amount
);
};

const generateOrderId = () => {
  const randomNo = Math.floor(Math.random() * 1000000000);
  return randomNo.toString();
  };

const OrderSummary = () => {
  const {
    data: orders,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetOrderSummaryQuery();

  if (isLoading) {
    return  <div className="flex items-center justify-center min-h-55">
    <BeatLoader color={"green"} />
  </div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <FormWrapper>
      <Header category="Orders" title="Order Summary" />
      {isSuccess && orders.length > 0 ? (
        orders.map((order) => (
          <div
            key={order._id}
            className="bg-white rounded-lg p-6 shadow-md mb-6"
          >
            <h2 className="text-lg mb-4">#{generateOrderId()}</h2>
            <div className="flex flex-col space-y-4">
              {order.items && order.items.length > 0 ? (
                order.items.map((item) => (
                  <div
                    key={item._id}
                    className="flex items-center justify-between w-full"
                  >
                    <div className="flex items-center space-x-4">
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div>
                        <h3 className="text-lg font-semibold">{item.name}</h3>
                        <p className="text-gray-500">
                          Quantity: {item.quantity}
                        </p>
                      </div>
                    </div>
                    <p className="text-lg font-semibold">
                      {formatCurrency(item.price)}
                    </p>
                  </div>
                ))
              ) : (
                <p>No items in the order</p>
              )}
            </div>
            <div className="mt-8 flex flex-col" style={{ alignItems: "flex-end" }}>
              <p className="text-lg font-semibold">
                Total Amount:{formatCurrency(order.totalAmount)}
              </p>
              <p className="text-lg font-semibold">
                Delivery Address: {order.address}
              </p>
              <p className="text-lg font-semibold">
                Estimated Delivery Time: {order.estimatedTime}
              </p>
            </div>
          </div>
        ))
      ) : (
        <p>No orders found</p>
      )}
    </FormWrapper>
  );
};

export default OrderSummary;
