import React, { useEffect } from "react";
import styles from "./Navbar.module.css";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../Assets/images/freshcart-logo.svg";
import { useToken } from "../Context/TokenContext";
import { useCart } from "../Context/CartContext";
import { useWishList } from "../Context/WishListContext";

export default function Navbar() {
  const { token, removeToken } = useToken();
  const { wishList } = useWishList();

  const { cart } = useCart();

  const navigate = useNavigate()
  const signOut = () => {
    removeToken();
    navigate("/login")
  };

  // useEffect(() => {
  //   getCartItems()
  // }, [cart])
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary position-fixed z-3 start-0 end-0 top-0">
        <div className="container">
          <Link to={""} className="navbar-brand">
            <img src={logo} alt="logo image" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {token ? (
                <>
                  <li className="nav-item">
                    <Link
                      to={"home"}
                      className="nav-link active"
                      aria-current="page"
                    >
                      Home
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to={"cart"} className="nav-link" aria-current="page">
                      Cart
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to={"products"}
                      className="nav-link"
                      aria-current="page"
                    >
                      Products
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to={"categories"}
                      className="nav-link"
                      aria-current="page"
                    >
                      Categories
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to={"brands"}
                      className="nav-link"
                      aria-current="page"
                    >
                      Brands
                    </Link>
                  </li>
                </>
              ) : (
                ""
              )}
            </ul>

            <ul className="navbar-nav ms-auto d-flex align-items-center">
              {token ? (
                <>
                  <li className={`nav-item ${styles.social_media_icons}`}>
                    <Link to={"/profile"}>
                      <i className="fa-solid fa-user text-dark fs-4">
                      </i>
                    </Link>
                    <Link to={"/wishlist"}>
                      <i className="fa-solid fa-heart text-dark position-relative fs-4 mx-3">
                        <span className="position-absolute rounded-circle top-0 start-100 translate-middle badge rounded-pill bg-success">
                          {wishList?.count || 0}
                        </span>
                      </i>
                    </Link>
                    <Link to={"/cart"}>
                      <i className="fa-solid fa-cart-shopping position-relative fs-4 mt-1">
                        <span className="position-absolute rounded-circle top-0 start-100 translate-middle badge rounded-pill bg-success">
                          {cart?.numOfCartItems || 0}
                        </span>
                      </i>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <button type="button" className="btn border-0" onClick={signOut}>
                      SignOut
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link to={"login"} className="nav-link" aria-current="page">
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to={"register"}
                      className="nav-link"
                      aria-current="page"
                    >
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
