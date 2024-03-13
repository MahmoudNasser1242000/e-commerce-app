import React, { useEffect, useState } from "react";
import styles from "./Cart.module.css";
import { useCart } from "../Context/CartContext";
import CartItem from "../CartItem/CartItem";
import { PuffLoader } from "react-spinners";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function Cart() {
  const { getCartItems, cart } = useCart();
  const [loading, setLoading] = useState(true);
  console.log(cart);
  const getCart = async () => {
    await getCartItems();
    setLoading(false);
  }
  useEffect(() => {
    getCart()
  }, []);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Cart</title>
      </Helmet>

      <div className="container mx-auto my-4 p-3 bg-main-light rounded-1">
        <div className="d-flex justify-content-between align-items-center px-2 pt-2 mb-5">
          <h4>
            Total Price:{" "}
            <span className="badge text-bg-success rounded-1">
              {cart?.data?.totalCartPrice || 0} $
            </span>
          </h4>
          <button className="btn btn-success rounded-1" disabled={cart === "" || cart?.data?.products.length === 0? true : false}><Link className="text-white" to={"/online-payment"}>Check Out</Link></button>
        </div>
        {loading ? (
          <div className="w-100 d-flex justify-content-center align-items-center">
            <PuffLoader color="#0AAD0A" />
          </div>
        ) : cart === "" || cart?.data?.products.length === 0 ? (
          <div className="h-100">
            <h2 className="fw-bolfer">Cart Is Empty!</h2>
          </div>
        ) : (
          cart?.data?.products.map((prod) => (
            <CartItem key={prod._id} {...prod} />
          ))
        )}
      </div>
    </>
  );
}
