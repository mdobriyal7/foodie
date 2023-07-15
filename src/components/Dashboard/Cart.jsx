import React from "react";
import { MdOutlineCancel } from "react-icons/md";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { useScreenState } from "../../features/stateSlice";
import {
  useGetCartItemsQuery,
  useIncrementCartItemMutation,
  useDecrementCartItemMutation,
  useGetSubtotalQuery,
} from "../../features/cartSlice";
import { useCreateOrderSummaryMutation } from "../../features/orderSlice";
import Button from "../Button";
import { BeatLoader } from "react-spinners";

const Cart = () => {
  const { currentColor } = useScreenState();

  const {
    data: cartData,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetCartItemsQuery("cartData", {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });
  const { data: totalAmount } = useGetSubtotalQuery("subtotal", {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  const [incrementCartItem] = useIncrementCartItemMutation();
  const [decrementCartItem] = useDecrementCartItemMutation();
  const [createOrder] = useCreateOrderSummaryMutation();

  return (
    <div className="bg-half-transparent w-full fixed nav-item top-0 right-0">
      <div className="float-right h-screen duration-1000 ease-in-out dark:text-gray-200 transition-all dark:bg-[#484B52] bg-white md:w-400 p-8">
        <div className="flex justify-between items-center">
          <p className="font-semibold text-lg">Food Cart</p>
          <Button
            icon={<MdOutlineCancel />}
            color="rgb(153, 171, 180)"
            bgHoverColor="light-gray"
            size="2xl"
            borderRadius="50%"
          />
        </div>
        {cartData?.length > 0 ? (
          <>
            {cartData.map((item, index) => (
              <div key={index}>
                <div>
                  <div className="flex items-center leading-8 gap-5 border-b-1 border-color dark:border-gray-600 p-4">
                    <img
                      className="rounded-lg h-80 w-24"
                      src={item.imageUrl}
                      alt={item.name}
                    />
                    <div>
                      <p className="font-semibold ">{item.name}</p>
                      <div className="flex gap-4 mt-2 items-center">
                        <p className="font-semibold text-lg">{item.price}</p>
                        <div className="flex items-center border-1 border-r-0 border-color rounded">
                          <p
                            className="p-2 border-r-1 dark:border-gray-600 border-color text-red-600"
                            onClick={() => decrementCartItem(item._id)}
                          >
                            <AiOutlineMinus />
                          </p>
                          <p className="p-2 border-r-1 border-color dark:border-gray-600 text-green-600">
                            {item.quantity}
                          </p>
                          <p
                            className="p-2 border-r-1 border-color dark:border-gray-600 text-green-600"
                            onClick={() => incrementCartItem(item._id)}
                          >
                            <AiOutlinePlus />
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div className="mt-3 mb-3">
              <div className="flex justify-between items-center">
                <p className="text-gray-500 dark:text-gray-200">Sub Total</p>
                <p className="font-semibold">
                  {totalAmount && totalAmount.subtotal}
                </p>
              </div>
              <div className="flex justify-between items-center mt-3">
                <p className="text-gray-500 dark:text-gray-200">Total</p>
                <p className="font-semibold">
                  {totalAmount && totalAmount.subtotal}
                </p>
              </div>
              {isLoading ? (
                <div className="h-80 flex items-center justify-center">
                  <BeatLoader color="green" />
                </div>
              ) : (
                <div className="mt-6">
                  <button
                    className="rounded w-full text-xl py-2 text-white"
                    style={{ backgroundColor: currentColor }}
                    onClick={createOrder}
                  >
                    Place Order
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-full">
            <h4>Cart Empty</h4>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
