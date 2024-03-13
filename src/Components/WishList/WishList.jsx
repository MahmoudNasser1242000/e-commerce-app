import React, { useEffect, useState } from "react";
import styles from "./WishList.module.css";
import { useWishList } from "../Context/WishListContext";
import { PuffLoader } from "react-spinners";
import WishListItem from "../WishListItem/WishListItem";
import { Helmet } from "react-helmet";

export default function WishList() {
  const {getWishListItems, wishList} = useWishList();
  const [loading, setLoading] = useState(true);

  const getWishList = async () => {
    await getWishListItems();
    setLoading(false)
  }
  useEffect(() => {
    getWishList()
  }, [])
  console.log(wishList);
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Wish List</title>
      </Helmet>

      <div className="container mx-auto my-4 p-3 bg-main-light rounded-1">
        <div className="d-flex justify-content-between align-items-center px-2 pt-2 mb-5">
          <h3>
            My Wish List <i className="fa-solid fa-heart fs-3 text-danger"></i>
          </h3>
        </div>
        {
          loading? (
            <div className="w-100 d-flex justify-content-center align-items-center">
              <PuffLoader color="#0AAD0A" />
            </div>
          ) : wishList && wishList.data.length !== 0? wishList?.data?.map((prod) => <WishListItem key={prod._id} {...prod}/>) : (<div className="h-100 pb-1">
          <h2 className="fw-bolfer">Wish List Is Empty!</h2>
        </div>)
        }
      </div>
    </>
  );
}
