import React from "react";
import FormWrapper from "../../components/FormWrapper";
import Header from "../../components/Header";
import "./Menu.css";
import { useGetAllFoodsQuery } from "../foodSlice";
import { useAddToCartMutation } from "../cartSlice";
import { BeatLoader } from "react-spinners";
import { toast } from "react-toastify";

const Menu = () => {
  const [item, selectedItem] = React.useState(null);
  const { data: products, isLoading: isLoadingProducts } = useGetAllFoodsQuery(
    "products",
    {
      pollingInterval: 15000,
      refetchOnFocus: true,
      refetchOnMountOrArgChange: true,
    }
  );

  const [addToCart, { isLoading: isLoadingToCart, isUninitialized }] =
    useAddToCartMutation();

  let content;

  if (isLoadingProducts) {
    return (content = (
      <div className="flex items-center justify-center min-h-55">
        <BeatLoader color={"green"} />
      </div>
    ));
  }

  content = (
    <table className="table w-full border-collapse">
      <thead>
        <tr>
          <th className="py-2 border">Food Name</th>
          <th className="py-2 border">Price (net)</th>
          <th className="py-2 border">Description</th>
          <th className="py-2 border">Image</th>
          <th className="py-2 border">Action</th>
        </tr>
      </thead>
      <tbody>
        {products &&
          products.length > 0 &&
          products.map((product, index) => (
            <tr
              key={product._id}
              className={index % 2 === 0 ? "bg-gray-100" : ""}
            >
              <td className="py-2 border">{product.name}</td>
              <td className="py-2 border">{product.price}</td>
              <td className="py-2 border">{product.description}</td>
              <td className="py-2 border">
                {product.imageUrl ? (
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-24 mx-auto"
                  />
                ) : (
                  <span>No image</span>
                )}
              </td>
              <td className="py-2 border">
                <div className="flex gap-2">
                  <button
                    className="btn-buy mx-auto text-green-700 font-bold"
                    onClick={() => {
                      selectedItem(product._id);
                      addToCart({ menuItemId: product._id, quantity: 1 }).then(
                        () =>
                          toast.info("Food Added Sucessfully!", {
                            autoClose: 1500,
                          })
                      );
                    }}
                  >
                    {isLoadingToCart && product._id === item ? (
                      <BeatLoader />
                    ) : (
                      "Add to Cart"
                    )}
                  </button>
                </div>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );

  return (
    <FormWrapper>
      <Header category="Menu" title="Menu" />
      {content}
    </FormWrapper>
  );
};

export default Menu;
