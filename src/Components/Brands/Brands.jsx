import React, { useEffect, useState } from "react";
import styles from "./Brands.module.css";
import axios from "axios";
import { useQuery } from "react-query";
import { PuffLoader } from "react-spinners";
import CategoryOrBrand from "../CategoryOrBrand/CategoryOrBrand";
import { Helmet } from "react-helmet";

export default function Brands() {
  const [value, setValue] = useState("");
  const [brand, setBrand] = useState([]);
  const [showImg, setShowImg] = useState("");

  const getBrands = async () => {
    return await axios.get("https://ecommerce.routemisr.com/api/v1/brands");
  };
  const { data, isLoading } = useQuery("brands", getBrands);
  useEffect(() => {
    if (data !== undefined) {
      setBrand(data?.data?.data);
    }
  }, [data]);

  const searchBrand = (value) => {
    const brands = data?.data?.data.filter((brand) =>
      brand.name.toLowerCase().includes(value.toLowerCase())
    );
    setBrand(brands);
  };
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Brands</title>
      </Helmet>

      <div className="container mx-auto pt-5">
        <input
          type="search"
          name="search-brand"
          className="rounded-1 mb-4 w-50 mx-auto form-control"
          placeholder="Search For Brand..."
          onChange={(e) => {
            setValue(e.target.value);
          }}
          onKeyUp={() => {
            searchBrand(value);
          }}
        />

        <div className="row pt-4">
          {isLoading ? (
            <div className="w-100 d-flex justify-content-center align-items-center">
              <PuffLoader color="#0AAD0A" />
            </div>
          ) : brand.length === 0 ? (
            <div className="h-100">
              <h2 className="fw-bolfer">There are no brands right now!</h2>
            </div>
          ) : (
            brand.map((brand) => (
              <div
                className="col-lg-3 col-sm-6 text-center mb-5"
                onClick={() => {
                  setShowImg(brand.image);
                }}
              >
                <CategoryOrBrand key={brand._id} {...brand} brand={true} />
              </div>
            ))
          )}
        </div>
      </div>

      <div
        onClick={() => {
          setShowImg("");
        }}
        className={`position-fixed top-0 bottom-0 start-0 end-0 z-3 py-4 bg-dark bg-opacity-50 justify-content-center align-items-center ${
          showImg ? "d-flex" : "d-none"
        }`}
      >
        <img src={showImg} className="w-50 h-100 object-fit-contain" onClick={(e) => { e.stopPropagation() }} alt="brand" />
      </div>
    </>
  );
}
