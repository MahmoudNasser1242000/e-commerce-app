import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import MakeSlider from "../Slider/Slider";
import { PuffLoader } from "react-spinners";

export default function CategoriesSlider() {
  const [category, setCategory] = useState([]);
  const getCategories = async () => {
    const { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/categories"
    );
    return data;
  };
  const { data, isLoading, isError } = useQuery("products-cart", getCategories);

  useEffect(() => {
    if (data !== undefined) {
      setCategory(data?.data?.filter((catg) => catg._id !== "6439d58a0049ad0b52b9003f"));
    }
  }, [data])
  return (
    <>
      {isLoading ? (
        <div className="w-100 d-flex justify-content-center align-items-center">
          <PuffLoader color="#0AAD0A" />
        </div>
      ) : (
        <MakeSlider autoplay={false} slidesToShow={5} slidesToScroll={4}>
          {category?.map((catg, index) => (
            <div key={index}>
              <img
                src={catg?.image}
                className="w-100"
                height={200}
                alt={`${catg.name} category`}
              />
            </div>
          ))}
        </MakeSlider>
      )}
    </>
  );
}
