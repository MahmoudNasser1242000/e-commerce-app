import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useToken } from "../Context/TokenContext";
import { Helmet } from "react-helmet";

export default function UpdatePassword() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const {addToken} = useToken()
  const navigate = useNavigate();
  const resetPassword = async (info) => {
    setLoading(true);
    await axios
      .put("https://ecommerce.routemisr.com/api/v1/auth/resetPassword", info)
      .then(({ data }) => {
        if (data.token) {
          navigate("/login");
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
      newPassword: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("enter valid email").required("email required"),
      newPassword: Yup.string()
        .matches(
          /^(?=.*\d{4,})(?=.*[a-zA-z]+)(?=.*[\W_]+).{6,}$/,
          "password must has at least 4 numbers, 1 charcater and 1 special charcater"
        )
        .required("password required"),
    }),
    onSubmit: resetPassword,
  });
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Update Password</title>
      </Helmet>

      <div className="h-100 d-flex flex-column justify-content-center align-items-center">
        {error ? (
          <div className="alert alert-danger rounded-1 mb-5">{error}</div>
        ) : (
          ""
        )}
        <div className="container mx-auto d-flex justify-content-center">
          <form className="w-75" onSubmit={formik.handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="form-label">User Email</label>
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
                placeholder="Enter The Reset Email"
              />
              <div className="invalid-feedback">
                {formik.touched.email && formik.errors.email
                  ? formik.errors.email
                  : ""}
              </div>
            </div>

            <div>
              <label htmlFor="newPassword" className="form-label">
                Reset Password
              </label>
              <input
                type="password"
                className={`form-control ${
                  !formik.touched.newPassword
                    ? ""
                    : formik.errors.newPassword
                    ? "is-invalid"
                    : "is-valid"
                }`}
                name="newPassword"
                id="newPassword"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter The new password"
              />
              <div className="invalid-feedback">
                {formik.touched.newPassword && formik.errors.newPassword
                  ? formik.errors.newPassword
                  : ""}
              </div>
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
