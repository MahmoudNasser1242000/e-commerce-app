import React, { useState } from "react";
import styles from "./Register.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function Register() {
  const navigate = useNavigate();

  const formValidation = () => {
    const validation = Yup.object({
      name: Yup.string()
        .min(3, "name must be at least 3 characters")
        .max(15, "name must be maximum 15 characters")
        .required("name required"),
      email: Yup.string().email("enter valid email").required("email required"),
      password: Yup.string()
        .matches(
          /^(?=.*\d{4,})(?=.*[a-zA-z]+)(?=.*[\W_]+).{6,}$/,
          "invalid password"
        )
        .required("password required"),
      rePassword: Yup.string()
        .oneOf([Yup.ref("password")], "password and repassword must be match")
        .required("repassword required"),
      phone: Yup.string()
        .matches(/^01([0-2]|5)[0-9]{8}$/, "invalid phone number")
        .required("phone required"),
    });

    return validation;
  };

  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const signUp = async (info) => {
    setIsLoading(true)
    const {data} = await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signup", info)
      .catch((error) => {
        setIsLoading(false)
        setErrorMessage(error.response.data.message);
      });

    if (data.message === "success") {
      setErrorMessage("");
      setIsLoading(false)
      navigate("/login");
    }
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema: formValidation(),
    onSubmit: signUp,
  });
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Register</title>
      </Helmet>

      <div className="w-100 h-100 mb-5 d-flex flex-column justify-content-center align-items-center">
        {errorMessage ? (
          <div className="alert alert-danger text-center">{errorMessage}</div>
        ) : (
          ""
        )}
        <h2 className="text-success">Register Now</h2>
        <form className={styles.register} onSubmit={formik.handleSubmit}>
          <div className={styles.input_field}>
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className={`form-control ${
                !formik.touched.name
                  ? ""
                  : formik.errors.name
                  ? "is-invalid"
                  : "is-valid"
              }`}
              id="neme"
              name="name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              placeholder="Enter Your Name"
            />
            <div className="invalid-feedback">
              {formik.touched.name && formik.errors.name
                ? formik.errors.name
                : ""}
            </div>
          </div>
      
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
              name="email"
              id="email"
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
      
          <div className={styles.input_field}>
            <label htmlFor="rePassword" className="form-label">
              Repassword
            </label>
            <input
              type="password"
              className={`form-control ${
                !formik.touched.rePassword
                  ? ""
                  : formik.errors.rePassword
                  ? "is-invalid"
                  : "is-valid"
              }`}
              name="rePassword"
              id="rePassword"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.rePassword}
              placeholder="Rewrite Password"
            />
            <div className="invalid-feedback">
              {formik.touched.rePassword && formik.errors.rePassword
                ? formik.errors.rePassword
                : ""}
            </div>
          </div>
      
          <div className={styles.input_field}>
            <label htmlFor="phone" className="form-label">
              Phone Number
            </label>
            <input
              type="tel"
              className={`form-control ${
                !formik.touched.phone
                  ? ""
                  : formik.errors.phone
                  ? "is-invalid"
                  : "is-valid"
              }`}
              name="phone"
              id="phone"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phone}
              placeholder="Enter Your Number"
            />
            <div className="invalid-feedback">
              {formik.touched.phone && formik.errors.phone
                ? formik.errors.phone
                : ""}
            </div>
          </div>
      
          <button
            type="submit"
            className="btn btn-success rounded-1 px-3 d-block ms-auto"
            disabled={!(formik.isValid && formik.dirty)}
          >
            {isLoading? <i className="fa fa-spinner fa-spin"></i> : "Register"}
          </button>
        </form>
      </div>
    </>
  );
}
