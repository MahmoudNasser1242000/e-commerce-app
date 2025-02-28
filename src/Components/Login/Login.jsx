import React, { useState } from "react";
import styles from "./Login.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useToken } from "../Context/TokenContext";
import { Helmet } from "react-helmet";

export default function Register() {
  const navigate = useNavigate();

  const formValidation = () => {
    const validation = Yup.object({
      email: Yup.string().email("enter valid email").required("email required"),
      password: Yup.string()
        .matches(
          /^(?=.*\d{4,})(?=.*[a-zA-z]+)(?=.*[\W_]+).{6,}$/,
          "password must has at least 4 numbers, 1 charcater and 1 special charcater"
        )
        .required("password required"),
    });

    return validation;
  };

  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const {addToken, setUser} = useToken()

  const Login = async (info) => {
    setIsLoading(true)
    const {data}= await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signin", info)
      .catch((error) => {
        setErrorMessage(error.response.data.message);
        setIsLoading(false)
      });

    if (data.message === "success") {
      // localStorage.setItem("userToken", data.token);
      addToken(data.token);  
      setUser(data.user)   
      setErrorMessage("");
      navigate("/home");
    }
    setIsLoading(false)
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: formValidation(),
    onSubmit: Login,
  });
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Login</title>
      </Helmet>

      <div className="w-100 h-100 d-flex flex-column justify-content-center align-items-center">
        {errorMessage ? (
          <div className="alert alert-danger text-center">{errorMessage}</div>
        ) : (
          ""
        )}
        <h2 className="text-success">Signin Now</h2>
        <form className={styles.login} onSubmit={formik.handleSubmit}>
          <div className={styles.input_field}>
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className={`form-control ${
                !formik.touched.email
                  ? ""
                  : formik.errors.email
                  ? "is-invalid"
                  : "is-valid"
              }`}
              id="email"
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              placeholder="Enter Your Email"
            />
            <div className="invalid-feedback">
              {formik.touched.email && formik.errors.email
                ? formik.errors.email
                : ""}
            </div>
          </div>
      
          <div className={styles.input_field}>
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className={`form-control ${
                !formik.touched.password
                  ? ""
                  : formik.errors.password
                  ? "is-invalid"
                  : "is-valid"
              }`}
              name="password"
              id="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              placeholder="Enter Your Password"
            />
            <div className="invalid-feedback">
              {formik.touched.password && formik.errors.password
                ? formik.errors.password
                : ""}
            </div>
          </div>
      
          <button
            type="submit"
            className="btn btn-success rounded-1 px-3 d-block ms-auto"
            disabled={!(formik.isValid && formik.dirty)}
          >
            {isLoading? <i className="fa fa-spinner fa-spin"></i> : "Signin"}
          </button>
        </form>
        <p className={`text-center mt-4`}>if you forget password <Link to="/forgot-password" className={styles.forget_pass}>Go Here</Link></p>
      </div>
    </>
  );
}
