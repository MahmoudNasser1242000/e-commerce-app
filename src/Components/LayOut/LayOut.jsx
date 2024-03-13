import React from 'react'
import styles from "./LayOut.module.css"
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import { Outlet } from 'react-router-dom'
import { Toaster } from 'react-hot-toast';
import goUP from "../../Assets/images/up-arrow.png";

export default function LayOut() {
  return (
    <>
      <Navbar/>
      <Outlet/>
      <Toaster />
      <img src={goUP} alt="go to the top" onClick={() => {window.scroll({top: 0, behavior: "smooth"})}} className={`${styles.go_up}`}/>
      <Footer/>
    </>
  )
}
