import React, { useEffect, useState } from 'react'
import styles from "./UserProfile.module.css"
import profile from "../../Assets/images/Profile-Avatar-PNG.png"
import { useQuery } from 'react-query'
import axios from 'axios'
import { useToken } from '../Context/TokenContext'
import { jwtDecode } from 'jwt-decode'
import { PuffLoader } from 'react-spinners'

export default function UserProfile() {
  const { user } = useToken();
  // const [user, setUser] = useState("");
  // const [userInfo, setUserInfo] = useState(undefined);
  // const getUsers = async () => {
  //   return await axios.get("https://ecommerce.routemisr.com/api/v1/users");
  // }
  // const { data, isLoading } = useQuery("profile", getUsers);

  // useEffect(() => {
  //   setUser(jwtDecode(token));
  //   if (data !== undefined) {
  //     const findUser = data?.data?.users?.find((profile) => profile._id === user.id);
  //     setUserInfo(findUser);
  //     console.log(findUser);
  //     console.log(data?.data?.users);
  //     console.log(user);
  //   }
  // }, [data])

  return (
    <>
      {/* {
        isLoading ? (
          <div className="w-100 h-100 d-flex justify-content-center align-items-center">
            <PuffLoader color="#0AAD0A" />
          </div>
        ) : ( */}
          <section className="bg-white pt-5 mt-5 d-flex justify-content-center align-items-center">
            <div className="container">
              <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col col-lg-6 mb-4 mb-lg-0">
                  <div className="card mb-3 rounded-1">
                    <div className="row g-0">
                      <div className={`col-md-4 ${styles.gradient_custom} text-center text-white`}>
                        <img src={profile} alt="Avatar" className="w-75 my-5" />
                        <h4>User Profile</h4>
                        <p>{user?.name}</p>
                        <i className="far fa-edit mb-5" />
                      </div>
                      <div className="col-md-8">
                        <div className="card-body p-4">
                          <h6>Information</h6>
                          <hr className='mt-0 mb-4' />
                          <div className="mt-0 mb-4">
                            <div className="row pt-1">
                              <div className="col-6 mb-3">
                                <h6>Email</h6>
                                <p className="text-muted">{user?.email}</p>
                              </div>
                              <div className="col-6 mb-3">
                                <h6>Phone</h6>
                                <p className="text-muted">123 456 789</p>
                              </div>
                            </div>
                            <h6>Projects</h6>
                            <hr className='mt-0 mb-4' />
                            <div className="mt-0 mb-4">
                              <div className="row pt-1">
                                <div className="col-6 mb-3">
                                  <h6>Recent</h6>
                                  <p className="text-muted">Lorem ipsum</p>
                                </div>
                                <div className="col-6 mb-3">
                                  <h6>Most Viewed</h6>
                                  <p className="text-muted">Dolor sit amet</p>
                                </div>
                              </div>
                              <div className="d-flex justify-content-start">
                                <a href="#"><i className="fab fa-facebook-f fa-lg me-3 text-dark" /></a>
                                <a href="#"><i className="fab fa-twitter fa-lg me-3 text-dark" /></a>
                                <a href="#"><i className="fab fa-instagram fa-lg text-dark" /></a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
      {/* )
    } */}

    </>
  )
}
