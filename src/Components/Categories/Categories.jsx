import React, { useEffect, useState } from "react";
import styles from "./Categories.module.css";
import axios from "axios";
import { useQuery } from "react-query";
import { PuffLoader } from "react-spinners";
import CategoryOrBrand from "../CategoryOrBrand/CategoryOrBrand";
import { Helmet } from "react-helmet";

export default function Categories() {
  const [value, setValue] = useState("");
  const [category, setCategory] = useState([]);
  const [showImg, setShowImg] = useState("");

  const getCategories = async () => {
    return await axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  };
  const { data, isLoading } = useQuery("categories", getCategories);
  useEffect(() => {
    if (data !== undefined) {
      setCategory(data?.data?.data);
    }
  }, [data]);

  const searchCategory = (value) => {
    const categories = data?.data?.data.filter((catg) =>
      catg.name.toLowerCase().includes(value.toLowerCase())
    );
    setCategory(categories);
  };
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Categories</title>
      </Helmet>

      <div className="container mx-auto pt-5">
        <input
          type="search"
          name="search-category"
          className="rounded-1 mb-4 w-50 mx-auto form-control"
          placeholder="Search For Category..."
          onChange={(e) => {
            setValue(e.target.value);
          }}
          onKeyUp={() => {
            searchCategory(value);
          }}
        />

        <div className="row pt-4">
          {isLoading ? (
            <div className="w-100 d-flex justify-content-center align-items-center">
              <PuffLoader color="#0AAD0A" />
            </div>
          ) : category.length === 0 ? (
            <div className="h-100">
              <h2 className="fw-bolfer">There are no categories right now!</h2>
            </div>
          ) : (
            category.map((catg) => (
              <div
                className="col-lg-3 col-sm-6 text-center mb-5"
                onClick={() => {
                  setShowImg(catg.image);
                }}
              >
                <CategoryOrBrand key={catg._id} {...catg} />
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
        <img
          src={showImg}
          className="w-50 h-100 object-fit-contain"
          onClick={(e) => {
            e.stopPropagation();
          }}
          alt="category"
        />
      </div>
    </>
  );
}
