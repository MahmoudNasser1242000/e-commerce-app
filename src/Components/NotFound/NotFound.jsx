import React from 'react'
import styles from "./NotFound.module.css"
import notFound from "../../Assets/images/error.svg";
import { Helmet } from 'react-helmet';

export default function NotFound() {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Not Found Page</title>
      </Helmet>
      <img src={notFound} className='w-100 h-100' alt="not found" />
    </>
  )
}
