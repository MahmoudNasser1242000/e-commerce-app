import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PriceAndRate from "../PriceAndRate/PriceAndRate";
import MakeSlider from "../Slider/Slider";
import { PuffLoader } from "react-spinners";
import { useCart } from "../Context/CartContext";
import toast from "react-hot-toast";
import { useWishList } from "../Context/WishListContext";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setproduct] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const getProductDetails = async () => {
    setIsLoading(true);
    await axios
      .get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then((data) => {
        setproduct(data.data.data);
        setIsLoading(false);
      })
      .catch((err) => {
        if (err) {
          setproduct(null);
        }
      });
    setIsLoading(false);
  };

  useEffect(() => {
    getProductDetails();
  }, []);

  const { addToCart, getCartItems, cart } = useCart();
  const { addToWishList, getWishListItems, removeWishListItem, wishList } = useWishList();
  let notify;

  const addProduct = async () => {
    const data = await addToCart(id);
    if (data.status === "success") {
      if (wishList?.data?.find((prod) => prod._id === id) !== undefined) {
        removeWishListItem(id);
        getWishListItems();
      }
      notify = () =>
        toast.success("Product added successfully", {
          icon: "👏",
          duration: 3000,
        });
      getCartItems();
      console.log(data, "success");
    } else {
      notify = () =>
        toast.error("Can't add product!", { icon: "🔥", duration: 3000 });
    }
    return notify();
  };

  const addWishListProduct = async () => {
    if (cart?.data?.products.find((prod) => prod.product._id === id) === undefined) {
      const res = await addToWishList(id);
      if (res.status === "success") {
        notify = () =>
          toast.success("Product added successfully", {
            icon: "👏",
            duration: 3000,
          });
        getWishListItems();
        console.log(res, "success");
      } else {
        notify = () =>
          toast.error("Can't add product!", { icon: "🔥", duration: 3000 });
      }
    } else {
      notify = () =>
        toast.success("Product allready exist in cart", {
          icon: "❌",
          duration: 3000,
        });
    }
    return notify();
  };

  return isLoading ? (
    <div className="w-100 h-100 d-flex justify-content-center align-items-center">
      <PuffLoader color="#0AAD0A" />
    </div>
  ) : product ? (
    <>
      <div className="d-flex py-5 justify-content-center align-items-center">
        <div className="container mx-auto row d-flex align-items-center">
          <div className="col-md-4 col-sm-6 mb-5 mb-sm-0">
            <MakeSlider responsive={false}>
              {product.images?.map((img, index) => (
                <img src={img} key={index} alt={product.title} />
              ))}
            </MakeSlider>
          </div>
          <div className="col-md-8 col-sm-6">
            <div>
              <h3 className="fs-2">{product.title}</h3>
              <p>{product.description}</p>
              <PriceAndRate
                price={product.price}
                ratingsAverage={product.ratingsAverage}
              />
              <div className="d-flex justify-content-between align-items-center py-4">
                <button
                  className="btn btn-success rounded-1 w-75"
                  onClick={addProduct}
                >
                  Add To Cart +
                </button>
                <span>
                  <button
                    className="btn p-0 border-0"
                    onClick={addWishListProduct}
                  >
                    <i
                      className={`fa-solid fa-heart fs-3 ${wishList?.data?.find((prod) => prod._id === id) !==
                          undefined
                          ? "text-danger"
                          : "text-dark"
                        }`}
                    ></i>
                  </button>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  ) : (
    ""
  );
}
