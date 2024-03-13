import React from "react";
import styles from "./WishListItem.module.css";
import { useCart } from "../Context/CartContext";
import toast from "react-hot-toast";
import PriceAndRate from "../PriceAndRate/PriceAndRate";
import { useWishList } from "../Context/WishListContext";

export default function WishListItem({
  imageCover,
  price,
  ratingsAverage,
  title,
  description,
  _id,
}) {
  const { addToCart, getCartItems } = useCart();
  const { removeWishListItem, getWishListItems } = useWishList();
  let notify;
  const addProduct = async () => {
    const data = await addToCart(_id);
    if (data.status === "success") {
      notify = () =>
        toast.success("Product added to cart successfully", {
          icon: "👏",
          duration: 3000,
          style: { maxWidth: "1000px" },
        });
      getCartItems();
      removeProduct();
      console.log(data, "success");
    } else {
      notify = () =>
        toast.error("Can't add product to cart!", {
          icon: "🔥",
          duration: 3000,
          style: { maxWidth: "1000px" },
        });
    }
    return notify();
  };

  const removeProduct = async () => {
    const res = await removeWishListItem(_id);

    if (res.status === "success") {
      notify = () =>
        toast.success("Product removed from wish list successfully", {
          icon: "👏",
          duration: 3000,
        });
      getWishListItems();
    } else {
      notify = () =>
        toast.error("Can't remove product from wish list!", {
          icon: "🔥",
          duration: 3000,
        });
    }
    return notify();
  };
  return (
    <>
      <div className="d-flex pb-5 justify-content-center align-items-center">
        <div className="container mx-auto row d-flex align-items-center">
          <div className="col-md-3 col-sm-6 mb-5 mb-sm-0">
            <img
              src={imageCover}
              className="w-100 object-fit-cover"
              height={300}
              alt={title}
            />
          </div>
          <div className="col-md-9 col-sm-6">
            <div>
              <h3 className="fs-2">{title}</h3>
              <p>{description}</p>
              <PriceAndRate price={price} ratingsAverage={ratingsAverage} />
              <div className="d-flex justify-content-between align-items-center py-4">
                <button
                  className="btn btn-success rounded-1 w-75"
                  onClick={addProduct}
                >
                  Add To Cart +
                </button>
                <button
                  className="btn btn-outline-danger rounded-1"
                  onClick={removeProduct}
                >
                  <i className="fa fa-trash"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
