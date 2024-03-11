import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function ResetCode() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const resetCode = async (resetCode) => {
    console.log(resetCode);
    setLoading(true);
    await axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
        resetCode
      )
      .then(({ data }) => {
        if (data.status === "Success") {
          navigate("/updata-password");
          setError("");
          console.log(data);
        }
      })
      .catch((err) => {
        setError(err.response.data.message);
      });
    setLoading(false);
  };

  const formik = useFormik({
    initialValues: {
      resetCode: "",
    },
    validationSchema: Yup.object({
      resetCode: Yup.string().max(6, "must be 6 numbers").required("Reset code required"),
    }),
    onSubmit: resetCode,
  });
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Reset Code</title>
      </Helmet>

      <div className="h-100 d-flex flex-column justify-content-center align-items-center">
        {
          error ? (<div className="alert alert-danger rounded-1 mb-5">{error}</div>) : ""
        }
        <div className="container mx-auto d-flex justify-content-center">
          <form className="w-75" onSubmit={formik.handleSubmit}>
            <label htmlFor="email" className="form-label">
              Reset Code
            </label>
            <input
              type="text"
              className={`form-control ${!formik.touched.resetCode
                ? ""
                : formik.errors.resetCode
                  ? "is-invalid"
                  : "is-valid"
                }`}
              name="resetCode"
              id="resetCode"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter The Reset Code"
            />
            <div className="invalid-feedback">
              {formik.touched.resetCode && formik.errors.resetCode
                ? formik.errors.resetCode
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
