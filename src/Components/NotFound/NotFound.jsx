import React from 'react'
import styles from "./NotFound.module.css"
import notFound from "../../Assets/images/error.svg";

export default function NotFound() {
  return (
    <>
      <img src={notFound} className='w-100 h-100' alt="not found" />
    </>
  )
}
