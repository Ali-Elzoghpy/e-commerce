import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

export default function Rigester() {
  let navigat = useNavigate()
  let [displayErro, setErr] = useState(false);
  let [loadingSpiner, setLoading] = useState(true);
  let validationSchema = yup.object({
    name: yup
      .string()
      .required("name is requied ya basha")
      .min(3, "min 3 chrcters")
      .max(10, "max 10 chrchters"),
    email: yup
      .string()
      .required("email is requird ")
      .email("email must be valid"),
    password: yup
      .string()
      .required("passowrd is req")
      .matches(/^[a-zA-Z0-9!@#$%^&*]{6,16}$/, "passowed must be valid"),
    rePassword: yup
      .string()
      .required("repassowrd is req")
      .oneOf([yup.ref("password")], "repassowrd not match the main password"),
    phone: yup
      .string()
      .required("number is requird")
      .matches(/^01[0125][0-9]{8}$/, " must be egyption Number"),
  });

  function apiCall(data) {
    setLoading(false)
    axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signup", data)
      .then((res) => {
        if (res.data.message == "success") {
          setLoading(true)
        navigat("/login")
          
        }
      })
      .catch((err) => {
        setLoading(true)
        setErr(err.response.data.message);
      });
  }
  let rigesterFormik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema,

    onSubmit: apiCall,
  });

  return (
    <>
    <div className="mt-10 h-[75vh] ">
      <div className="container mx-auto w-7/12  ">
       {!(rigesterFormik.isValid) && !rigesterFormik.dirty   ?  (
          <p className="text-center text-red-900">not vaalid</p>
        ) : (
          ""
        )}

        {displayErro ? (
          <div
            class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            {displayErro}
          </div>
        ) : (
          ""
        )}
        <h1 className="my-5">Rigester Now :</h1>
        <form action="" onSubmit={rigesterFormik.handleSubmit}>
          <div className="mb-3">
            <input
              value={rigesterFormik.values.name}
              onChange={rigesterFormik.handleChange}
              onBlur={rigesterFormik.handleBlur}
              name="name"
              type="text"
              className=" border-solid border p-1 w-full focus:outline-none    "
              placeholder="userName"
            />
            {rigesterFormik.errors.name && rigesterFormik.touched.name ? (
              <p className="text-red-700 mb-3 ">
                {" "}
                {rigesterFormik.errors.name}{" "}
              </p>
            ) : (
              ""
            )}
          </div>
          <div className="mb-3">
            <input
              value={rigesterFormik.values.email}
              onChange={rigesterFormik.handleChange}
              onBlur={rigesterFormik.handleBlur}
              name="email"
              type="email"
              className=" border w-full  p-1 focus:outline-none "
              placeholder="Email"
            />
            {rigesterFormik.errors.email && rigesterFormik.touched.email ? (
              <p className="text-red-700 mb-3 ">
                {" "}
                {rigesterFormik.errors.email}{" "}
              </p>
            ) : (
              ""
            )}
          </div>
          <div className="mb-3">
            <input
              value={rigesterFormik.values.password}
              onChange={rigesterFormik.handleChange}
              onBlur={rigesterFormik.handleBlur}
              name="password"
              type="password"
              className=" border w-full  p-1 focus:outline-none "
              placeholder="password"
            />
            {rigesterFormik.errors.password &&
            rigesterFormik.touched.password ? (
              <p className="text-red-700 mb-3 ">
                {" "}
                {rigesterFormik.errors.password}{" "}
              </p>
            ) : (
              ""
            )}
          </div>
          <div className="mb-3">
            <input
              value={rigesterFormik.values.rePassword}
              onChange={rigesterFormik.handleChange}
              onBlur={rigesterFormik.handleBlur}
              name="rePassword"
              type="password"
              className=" border w-full  p-1 focus:outline-none "
              placeholder="rePassword"
            />
            {rigesterFormik.errors.rePassword &&
            rigesterFormik.touched.rePassword ? (
              <p className="text-red-700 mb-3 ">
                {" "}
                {rigesterFormik.errors.rePassword}{" "}
              </p>
            ) : (
              ""
            )}
          </div>
          <div className="mb-3">
            <input
              value={rigesterFormik.values.phone}
              onChange={rigesterFormik.handleChange}
              onBlur={rigesterFormik.handleBlur}
              name="phone"
              type="phone"
              className=" border w-full  p-1 focus:outline-none "
              placeholder="phone"
            />
            {rigesterFormik.errors.phone && rigesterFormik.touched.phone ? (
              <p className="text-red-700 mb-3 ">
                {" "}
                {rigesterFormik.errors.phone}{" "}
              </p>
            ) : (
              ""
            )}
          </div>
          <div className="flex justify-end">
            <button
            disabled={!(rigesterFormik.isValid && rigesterFormik.dirty)}
              type="submit"
              className="bg-mainColor rounded p-1 text-white mt-3  disabled:bg-opacity-20  d-bl"
            >
             {loadingSpiner ? 'Submit'  :   <i class="fas fa-spinner fa-spin"></i> }  
            
            </button>
          
          </div>
        </form>
      </div>
      
</div>
    </>
  );
}
