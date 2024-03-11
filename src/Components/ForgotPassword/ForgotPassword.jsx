import React, { useState } from "react";
import styles from "./ForgotPassword.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function ForgotPassword() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const checkEmail = async (email) => {
    setLoading(true);
    await axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
        email
      )
      .then(({ data }) => {
        if (data.statusMsg === "success") {
          navigate("/reset-code");
          setError("");
        }
      })
      .catch((err) => {
        setError(err.response.data.message);
      });
    setLoading(false);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("enter valid email").required("email required"),
    }),
    onSubmit: checkEmail,
  });
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Forget Password</title>
      </Helmet>

      <div className="h-100 d-flex flex-column justify-content-center align-items-center">
        {
          error ? (<div className="alert alert-danger rounded-1 mb-5">{error}</div>) : ""
        }
        <div className="container mx-auto d-flex justify-content-center">
          <form className="w-75" onSubmit={formik.handleSubmit}>
            <label htmlFor="email" className="form-label">
              User Email
            </label>
            <input
              type="email"
              className={`form-control ${!formik.touched.email
                ? ""
                : formik.errors.email
                  ? "is-invalid"
                  : "is-valid"
                }`}
              name="email"
              id="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter Your Email"
            />
            <div className="invalid-feedback">
              {formik.touched.email && formik.errors.email
                ? formik.errors.email
                : ""}
            </div>
            <button
              className="btn btn-success mt-3 rounded-1 ms-auto d-block"
              disabled={!(formik.isValid && formik.dirty)}
            >
              {loading ? (
                <i className="fa fa-spinner fa-spin"></i>
              ) : (
                "update password"
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
