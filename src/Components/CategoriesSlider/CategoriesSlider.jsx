import React from "react";
import { useQuery } from "react-query";
import axios from "axios";
import MakeSlider from "../Slider/Slider";
import { PuffLoader } from "react-spinners";

export default function CategoriesSlider() {
  const getCategories = async () => {
    const { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/categories"
    );
    return data;
  };
  const { data, isLoading, isError } = useQuery("products-cart", getCategories);
  return (
    <>
      {isLoading ? (
        <div className="w-100 d-flex justify-content-center align-items-center">
          <PuffLoader color="#0AAD0A" />
        </div>
      ) : (
        <MakeSlider autoplay={false} slidesToShow={5} slidesToScroll={4}>
          {data?.data.map((catg, index) => (
            <div key={index}>
              <img
                src={catg.image}
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
