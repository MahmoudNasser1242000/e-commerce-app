import React from 'react'
import styles from "./LayOut.module.css"
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import { Outlet } from 'react-router-dom'
import { Toaster } from 'react-hot-toast';

export default function LayOut() {
  return (
    <>
      <Navbar/>
      <Outlet/>
      <Toaster />
      <Footer/>
    </>
  )
}
