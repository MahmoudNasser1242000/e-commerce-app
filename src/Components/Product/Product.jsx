import React from "react";
import styles from "./Products.module.css";
import { Link } from "react-router-dom";
import PriceAndRate from "../PriceAndRate/PriceAndRate";
import { useCart } from "../Context/CartContext";
import toast from "react-hot-toast";
import { useWishList } from "../Context/WishListContext";

export default function Product({
  title,
  price,
  imageCover,
  ratingsAverage,
  id,
}) {
  const { addToCart, getCartItems, cart } = useCart();
  const { addToWishList, getWishListItems, removeWishListItem, wishList } =
    useWishList();
  let notify;

  const addProduct = async () => {
    const data = await addToCart(id);
    if (data.status === "success") {
      if (wishList?.data?.find((prod) => prod._id === id) !== undefined) {
        removeWishListItem(id);
        getWishListItems();
      }
      notify = () =>
        toast.success("Product added to cart successfully", {
          icon: "👏",
          duration: 3000,
        });
      getCartItems();
      console.log(data, "success");
    } else {
      notify = () =>
        toast.error("Can't add product to cart!", { icon: "🔥", duration: 3000 });
    }
    return notify();
  };

  const addWishListProduct = async () => {
    if (
      cart?.data?.products.find((prod) => prod.product._id === id) === undefined
    ) {
      const res = await addToWishList(id);
      if (res.status === "success") {
        notify = () =>
          toast.success("Product added to wish list successfully", {
            icon: "👏",
            duration: 3000,
          });
        getWishListItems();
        console.log(res, "success");
      } else {
        notify = () =>
          toast.error("Can't add product to wish list!", { icon: "🔥", duration: 3000 });
      }
    } else {
      notify = () =>
        toast.success("Product allready exists in cart", {
          icon: "❌",
          duration: 3000,
        });
    }
    return notify();
  };

  return (
    <div className="col-lg-3 col-md-4 col-sm-6">
      <div className={`${styles.product} p-3`}>
        <Link to={`/productDetails/${id}`}>
          <img
            src={imageCover}
            className="w-100 object-fit-cover"
            height={350}
            alt={title}
          />
        </Link>
        <div className="d-flex justify-content-between align-items-center pt-3">
          <h4
            className="fs-5 fw-bold text-dark"
            title={title}
          >
            {title?.length > 16
              ? title.split(" ").slice(0, 2).join(" ")
              : title}
          </h4>
          <span>
            <button className="btn p-0 border-0" onClick={addWishListProduct}>
              <i
                className={`fa-solid fa-heart fs-3 ${
                  wishList?.data?.find((prod) => prod._id === id) !== undefined
                    ? "text-danger"
                    : "text-dark"
                } ${styles.heart}`}
              ></i>
            </button>
          </span>
        </div>
        <PriceAndRate price={price} ratingsAverage={ratingsAverage} />
        <button
          className={`btn btn-success rounded-1 text-white w-100 ${styles.cart}`}
          onClick={addProduct}
        >
          Add To Cart
        </button>
      </div>
    </div>
  );
}
