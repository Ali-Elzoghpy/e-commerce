import axios from "axios";
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import * as yup from "yup";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { cartContext } from "../Context/CartContext";

export default function ShipingDealts() {
  let [loadingSpiner, setLoading] = useState(true);
  const [clikedOption, setclikedOption] = useState("");
  let { id } = useParams();
  let nav = useNavigate();
  let location = window.location.origin;
  console.log(window.location.origin);
  let { getcartNumber } = useContext(cartContext);
  let header = {
    token: localStorage.getItem("token"),
  };
  function postShipingVisa(data) {
    setLoading(false);
    console.log(data);
    let userData = {
      shippingAddress: data,
    };
    axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=${location}`,
        userData,
        { headers: header }
      )
      .then((res) => {
        console.log(res);
        getcartNumber();
        window.open(
          res.data.session.url,
          "_self",
          "width=600,height=600 ,top=500 , left=500 "
        );
      })
      .catch((res) => {})
      .finally(() => {
        setLoading(true);
      });
  }
  function postShipingCash(data) {
    setLoading(false);
    console.log(data);
    let userData = {
      shippingAddress: data,
    };
    axios
      .post(`https://ecommerce.routemisr.com/api/v1/orders/${id}`, userData, {
        headers: header,
      })
      .then((res) => {
        console.log(res);
        getcartNumber();

        nav("/allorders");
      })
      .catch((res) => {})
      .finally(() => {
        setLoading(true);
      });
  }

  let validationSchema = yup.object({
    details: yup.string().required("deatls is rquird"),
    phone: yup
      .string()
      .required("number is requird")
      .matches(/^01[0125][0-9]{8}$/, " must be egyption Number"),
    city: yup
      .string()
      .required("city name is requird")
      .matches(/^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/, "must be real city name"),
  });
  let shipingFormick = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    validationSchema,
    onSubmit: () => {
      if (clikedOption === "visa") {
        console.log("visa");
        postShipingVisa();
      } else {
        console.log("cash");
        postShipingCash();
      }
    },
  });
  function getChekedRadio(e) {
    let selectValue = e.target.getAttribute("value");
    console.log(selectValue + " ely 25tarto");
    setclikedOption(selectValue);
  }

  return (
    <div className="my-7 h-[73vh]">
      <h1 className="mb-5">ShipingDealts</h1>

      <form onSubmit={shipingFormick.handleSubmit}>
        <div className="mb-3">
          <input
            value={shipingFormick.values.details}
            onChange={shipingFormick.handleChange}
            onBlur={shipingFormick.handleBlur}
            name="details"
            type="text"
            className=" border w-full  p-1 focus:outline-none "
            placeholder="your deatls"
          />
          {shipingFormick.errors.details && shipingFormick.touched.details ? (
            <p className="text-red-700 mb-3 ">
              {shipingFormick.errors.details}{" "}
            </p>
          ) : (
            ""
          )}
        </div>
        <div className="my-5">
          <input
            value={shipingFormick.values.phone}
            onChange={shipingFormick.handleChange}
            onBlur={shipingFormick.handleBlur}
            name="phone"
            type="tel"
            className=" border w-full  p-1 focus:outline-none "
            placeholder="phone num"
          />
          {shipingFormick.errors.phone && shipingFormick.touched.phone ? (
            <p className="text-red-700 mb-3 ">
              {" "}
              {shipingFormick.errors.phone}{" "}
            </p>
          ) : (
            ""
          )}
        </div>
        <div className="mb-3">
          <input
            value={shipingFormick.values.city}
            onChange={shipingFormick.handleChange}
            onBlur={shipingFormick.handleBlur}
            name="city"
            type="text"
            className=" border w-full  p-1 focus:outline-none "
            placeholder="city"
          />
          {shipingFormick.errors.city && shipingFormick.touched.city ? (
            <p className="text-red-700 mb-3 "> {shipingFormick.errors.city} </p>
          ) : (
            ""
          )}
        </div>
        <div className="my-4 flex space-x-2 items-center">
          <label htmlFor="visaPay" className="text-lg font-light">
            pay with visa{" "}
          </label>
          <input
            className="ms-3"
            type="radio"
            onClick={getChekedRadio}
            id="visaPay"
            name="radios"
            value="visa"
          />

          <label htmlFor="cashPay" className="text-lg font-light">
            pay cash{" "}
          </label>
          <input
            className="ms-3"
            onClick={getChekedRadio}
            type="radio"
            id="cashPay"
            name="radios"
            value="cash"
          />
        </div>
        <button
          disabled={
            !(
              shipingFormick.isValid &&
              shipingFormick.dirty &&
              clikedOption !== ""
            )
          }
          type="submit"
          className="bg-mainColor rounded p-1 text-white mt-3  disabled:bg-opacity-20  d-bl"
        >
          {loadingSpiner ? "Submit" : <i class="fas fa-spinner fa-spin"></i>}
        </button>
      </form>
    </div>
  );
}
