import React from 'react'
import styles from "./Footer.module.css"

export default function Footer() {
  return (
    <>
      {/* <footer className='bg-main-light text-center py-2 fs-4 mt-5'>
        Footer
      </footer> */}

        <footer className={`${styles.footer} bg-main-light`}>
          <div className='py-3'>
            <a href="#"><i className="fa-brands fa-facebook"></i></a>
            <a href="#"><i className="fa-brands fa-instagram"></i></a>
            <a href="#"><i className="fa-brands fa-youtube"></i></a>
            <a href="#"><i className="fa-brands fa-twitter"></i></a>
          </div>

          <div className='py-3'>
            <ul>
              <li><a href="#">Contact Us</a></li>
              <li><a href="#">Our Services</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms & Conditions</a></li>
              <li><a href="#">About Us</a></li>
            </ul>
          </div>

          <div className={styles.copyright}>
            INFERNO Copyright © 2024 Inferno - All rights reserved || Designed By: <span>Mahmoud Nasser</span>
          </div>
        </footer>
    </>
  )
}
