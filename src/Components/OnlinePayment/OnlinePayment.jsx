import React, { useState } from "react";
import styles from "./OnlinePayment.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useCart } from "../Context/CartContext";
import { Helmet } from "react-helmet";

export default function OnlinePayment() {
  const { onlinePayment, setCart } = useCart();
  const [loading, setLoading] = useState(false);

  const formValidation = () => {
    return Yup.object({
      details: Yup.string().required("datails required"),
      phone: Yup.string()
        .matches(/^01([0-2]|5)[0-9]{8}$/, "invalid phone number")
        .required("phone required"),
      city: Yup.string().required("city required"),
    });
  };

  const addOnlinePayment = async (info) => {
    setLoading(true);
    const res = await onlinePayment(info)

    if (res.status === "success") {
      setLoading(false);
      setCart("");
      window.location.href = res.session.url;
    }
  };

  const formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },

    validationSchema: formValidation(),
    onSubmit: addOnlinePayment,
  });
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Online Payment</title>
      </Helmet>

      <div className="h-100 mb-5 d-flex justify-content-center align-items-center">
        <div className="container mx-auto p-4 bg-main-light">
          <h2 className="text-success mb-4">Shipping Address</h2>
          <form className={styles.register} onSubmit={formik.handleSubmit}>
            <div className={"mb-4"}>
              <label htmlFor="datails" className="form-label">
                Details
              </label>
              <input
                type="text"
                className={`form-control ${
                  !formik.touched.details
                    ? ""
                    : formik.errors.details
                    ? "is-invalid"
                    : "is-valid"
                }`}
                id="details"
                name="details"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.details}
                placeholder="Enter Your Details"
              />
              <div className="invalid-feedback">
                {formik.touched.details && formik.errors.details
                  ? formik.errors.details
                  : ""}
              </div>
            </div>

            <div className={"mb-4"}>
              <label htmlFor="phone" className="form-label">
                Phone
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
                id="phone"
                name="phone"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.phone}
                placeholder="Enter Your Phone"
              />
              <div className="invalid-feedback">
                {formik.touched.phone && formik.errors.phone
                  ? formik.errors.phone
                  : ""}
              </div>
            </div>

            <div className={"mb-4"}>
              <label htmlFor="city" className="form-label">
                City
              </label>
              <input
                type="text"
                className={`form-control ${
                  !formik.touched.city
                    ? ""
                    : formik.errors.city
                    ? "is-invalid"
                    : "is-valid"
                }`}
                id="city"
                name="city"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.city}
                placeholder="Enter Your City"
              />
              <div className="invalid-feedback">
                {formik.touched.city && formik.errors.city
                  ? formik.errors.city
                  : ""}
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-success rounded-1 px-3 d-block ms-auto"
              disabled={!(formik.isValid && formik.dirty)}
            >
              {loading? <i className="fa fa-spinner fa-spin"></i> : "online payment"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
