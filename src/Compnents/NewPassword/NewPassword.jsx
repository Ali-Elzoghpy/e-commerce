import React, { useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";

export default function NewPassword() {
  let [loadingSpiner, setLoading] = useState(true);
  let navigat = useNavigate();
  let [displayErro, setErr] = useState(false);
  let [frechCode, setFresh] = useState(false);
  let validationSchema = yup.object({
    email: yup
      .string()
      .required("email is required")
      .email("email must be vaalid"),
      newPassword: yup
      .string()
      .required("newPassword is required")
      .matches(/^[a-zA-Z0-9!@#$%^&*]{6,16}$/, "newPassword must be valid"),
  });
  function restPassApi(data) {
    setLoading(false);
    axios
      .put("https://ecommerce.routemisr.com/api/v1/auth/resetPassword", data)
      .then((res) => {
        
        console.log()
        if (res.data.token) {
          setLoading(true);
          navigat("/login");
        }
      })
      .catch((res) => {
        setLoading(true);
setFresh(true)
        setErr(res.response.data.message);
      });
  }

  let newPass= useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    validationSchema,
    onSubmit: restPassApi,
  });

  return (
    <>
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
<div className="h-[77.9vh]">
      <h1 className="my-5">NewPassword :</h1>
      <form action="" onSubmit={newPass.handleSubmit}>
        <div className="mb-3">
          <input
            value={newPass.values.email}
            onChange={newPass.handleChange}
            onBlur={newPass.handleBlur}
            name="email"
            type="email"
            className=" border w-full  p-1 focus:outline-none "
            placeholder="Email"
          />
          {newPass.errors.email && newPass.touched.email ? (
            <p className="text-red-700 mb-3 "> {newPass.errors.email} </p>
          ) : (
            ""
          )}
        </div>
        <div className="mb-3">
          <input
            value={newPass.values.newPassword}
            onChange={newPass.handleChange}
            onBlur={newPass.handleBlur}
            name="newPassword"
            type="password"
            className=" border w-full  p-1 focus:outline-none "
            placeholder="newPassword"
          />
          {newPass.errors.newPassword && newPass.touched.newPassword ? (
            <p className="text-red-700 mb-3 ">
              {" "}
              {newPass.errors.newPassword}{" "}
            </p>
          ) : (
            ""
          )}
        </div>

        <div className="flex  flex flex-col items-start">
          <button
            disabled={!(newPass.isValid && newPass.dirty)}
            type="submit"
            className="bg-mainColor rounded p-1 text-white mt-3  disabled:bg-opacity-20  d-bl"
          >
            {loadingSpiner ? "Submit" : <i class="fas fa-spinner fa-spin"></i>}
          </button>
     {frechCode ?      <Link to="/forgetPassword" className="text-green-900"> get new fresh code !  </Link> : ""}

       
        </div>
      </form>
      </div>
    </>
  );
}
