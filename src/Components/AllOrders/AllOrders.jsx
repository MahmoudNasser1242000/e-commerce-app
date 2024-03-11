import React from 'react'
import styles from "./AllOrders.module.css"
import payment1 from "../../Assets/images/Payment-success (text).png";
import payment2 from "../../Assets/images/payment-success.png";
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

export default function AllOrders() {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>All Orders</title>
      </Helmet>

      <div className='container mx-auto py-4'>
        <img src={payment1} className='w-100 object-fit-contain' height={200} alt="payment success" />
        <img src={payment2} className='w-100 object-fit-contain' height={500} alt="payment success" />
        <div className='d-flex justify-content-center pt-4'>
          <Link className='btn btn-success' to={"/home"}>Go Back Home</Link>
        </div>
      </div>
    </>
  )
}
