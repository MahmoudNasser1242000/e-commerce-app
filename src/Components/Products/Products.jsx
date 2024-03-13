import React, { useEffect, useState } from "react";
import styles from "./Products.module.css";
import { useQuery } from "react-query";
import axios from "axios";
import Product from "../Product/Product";
import { PuffLoader } from "react-spinners";
import { Helmet } from "react-helmet";

export default function Products() {
  const [value, setValue] = useState("");
  const [product, setProducts] = useState([]);

  const getProducts = async () => {
    return await axios.get("https://ecommerce.routemisr.com/api/v1/products");
  };
  const { data, isLoading } = useQuery("get-products", getProducts);
  
  useEffect(() => {
    if (data !== undefined) {
      setProducts(data?.data?.data)
    }
  }, [data])
  

  const searchProduct = (value) => {
    const products = data?.data?.data.filter((prod) => prod.title.toLowerCase().includes(value.toLowerCase()));
    setProducts(products)
  }
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Products</title>
      </Helmet>

      <div className="container mx-auto pt-5 mb-4">
        <input
          type="search"
          name="search-product"
          className="rounded-1 mb-4 w-50 mx-auto form-control"
          placeholder="Search For Product..."
          onChange={(e) => {setValue(e.target.value)}}
          onKeyUp={()=> {searchProduct(value)}}
        />

        <div className="row pt-4">
          {isLoading ? (
            <div className="w-100 d-flex justify-content-center align-items-center">
              <PuffLoader color="#0AAD0A" />
            </div>
          ) : product.length === 0 ? (
            <div className="h-100">
              <h2 className="fw-bolfer">There are no products right now!</h2>
            </div>
          ) : (
            product.map((prod) => <Product key={prod._id} {...prod} />)
          )}
        </div>
      </div>
    </>
  );
}
