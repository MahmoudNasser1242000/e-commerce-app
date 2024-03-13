import React, { useEffect } from 'react'
import styles from "./Home.module.css"
import MakeSlider from '../Slider/Slider'
import slider1 from "../../Assets/images/slider-2.jpeg"
import slider2 from "../../Assets/images/slider-image-2.jpeg"
import slider3 from "../../Assets/images/slider-image-3.jpeg"
import grocery_banner1 from "../../Assets/images/grocery-banner.png"
import grocery_banner2 from "../../Assets/images/grocery-banner-2.jpeg"
import { useQuery } from 'react-query'
import axios from 'axios'
import Product from '../Product/Product'
import { PuffLoader } from 'react-spinners'
import CategoriesSlider from '../CategoriesSlider/CategoriesSlider'
import { Helmet } from 'react-helmet'

export default function Home() {
  const getProducts = async () => {
    const { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/products"
    );
    return data;
  };
  const { data, isLoading, isError } = useQuery("all-products", getProducts);
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Home</title>
      </Helmet>

      <div className='container mx-auto'>
        <div className='my-4 pt-4 row g-0'>
          <div className='col-md-8 col-6'>
            <MakeSlider>
              <img src={slider1} className='w-100 object-fit-cover' height={300} alt="image slider" />
              <img src={slider2} className='w-100 object-fit-cover' height={300} alt="image slider" />
              <img src={slider3} className='w-100 object-fit-cover' height={300} alt="image slider" />
            </MakeSlider>
          </div>
          <div className='col-md-4 col-6'>
            <img src={grocery_banner1} className='w-100 h-50' alt="grocery banner" />
            <img src={grocery_banner2} className='w-100 h-50' alt="grocery banner" />
          </div>
        </div>

        <div className='my-5 py-5'>
          <h2 className='pb-2'>Categories</h2>
          <CategoriesSlider />
        </div>

        <div className='mb-5'>
          <h2>Products</h2>
          <div className='row g-3'>
            {
              isLoading ? (
                <div className="w-100 d-flex justify-content-center align-items-center">
                  <PuffLoader color="#0AAD0A" />
                </div>
              ) :
                data?.data.map((product) => <Product {...product} key={product.id} />)
            }
          </div>
        </div>
      </div>
    </>
  )
}
