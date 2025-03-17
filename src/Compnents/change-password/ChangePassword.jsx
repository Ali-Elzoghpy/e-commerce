import axios from "axios";
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import * as yup from "yup";
import { contextAuth } from "./../Context/AuthContextProvider";
import { Helmet } from 'react-helmet';
export default function ChangePassword() {
  let [loadingSpiner, setLoading] = useState(null);
  let { setToken } = useContext(contextAuth);

  let navigate = useNavigate();
  const baseUrl = "https://ecommerce.routemisr.com";
  let header = {
    token: localStorage.getItem("token"),
  };
  let validationSchema = yup.object({
    currentPassword: yup
      .string()
      .required("passowrd is req")
      .matches(/^[a-zA-Z0-9!@#$%^&*]{6,16}$/, "passowed must be valid"),

    password: yup
      .string()
      .required("new passowrd is req")
      .matches(/^[a-zA-Z0-9!@#$%^&*]{6,16}$/, "passowed must be valid"),
    rePassword: yup
      .string()
      .required("repassowrd is req")
      .oneOf([yup.ref("password")], "repassowrd not match the main password"),
  });

  let changeFormik = useFormik({
    initialValues: {
      currentPassword: "",
      password: "",
      rePassword: "",
    },
    validationSchema,
    onSubmit: changePassowrd,
  });

  function changePassowrd(data) {
    setLoading(true);
    console.log(data);
    axios
      .put(`${baseUrl}/api/v1/users/changeMyPassword`, data, {
        headers: header,
      })
      .then((res) => {
        console.log(res);
        localStorage.removeItem("token");

        setToken(null);
        navigate("/login");
      })
      .catch((res) => {
        console.log(res.response.data.message);
        toast.error(res.response.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }
  return (
    <>
  <Helmet>
                <meta charSet="utf-8" />
                <title>change Pass</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
      <div className="m-auto p-5 md:w-7/12 w-12/12   mt-12">
        <div className="bg-[#F8F9FA] p-12 shadow-2xl  rounded-3xl">
          <h1 className="text-mainColor text-3xl text-center">
            Change your password
          </h1>
          <form onSubmit={changeFormik.handleSubmit} action="">
            <div className="mb-4">
              <label htmlFor="userName" className="m">
                {" "}
                Current Password:
              </label>
              <br />
              <input
                value={changeFormik.values.currentPassword}
                onChange={changeFormik.handleChange}
                onBlur={changeFormik.handleBlur}
                name="currentPassword"
                type="password"
                className="w-full mt-2 rounded-lg p-1 px-2 border focus:outline-none"
                id="userName"
              />
              {changeFormik.errors.currentPassword &&
              changeFormik.touched.currentPassword ? (
                <small className="text-red-600">
                  {" "}
                  {changeFormik.errors.currentPassword}
                </small>
              ) : (
                ""
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="userName" className="m">
                {" "}
                New Password:
              </label>
              <br />
              <input
                value={changeFormik.values.password}
                onChange={changeFormik.handleChange}
                onBlur={changeFormik.handleBlur}
                name="password"
                type="password"
                className="w-full mt-2 px-2 rounded-lg p-1 border focus:outline-none"
                id="userName"
              />
              {changeFormik.errors.password && changeFormik.touched.password ? (
                <small className="text-red-600">
                  {" "}
                  {changeFormik.errors.password}
                </small>
              ) : (
                ""
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="userName" className="m">
                {" "}
                New RePassword:
              </label>
              <br />
              <input
                value={changeFormik.values.rePassword}
                onChange={changeFormik.handleChange}
                onBlur={changeFormik.handleBlur}
                name="rePassword"
                type="password"
                className="w-full mt-2  rounded-lg p-1 border focus:outline-none"
                id="userName"
              />
              {changeFormik.errors.rePassword &&
              changeFormik.touched.rePassword ? (
                <small className="text-red-600">
                  {" "}
                  {changeFormik.errors.rePassword}
                </small>
              ) : (
                ""
              )}
            </div>
            <div className="mb-5">
              <Link
                to="/forgetPassword"
                className="hover:underline   hover:text-mainColor"
              >
                {" "}
                Forget Pass ?{" "}
              </Link>{" "}
            </div>{" "}
            <div>
              <button
                disabled={!(changeFormik.isValid && changeFormik.dirty)}
                className="px-4 py-2 text-white bg-mainColor disabled:bg-opacity-20 rounded-md w-full"
              >
                {" "}
                {loadingSpiner ? (
                  <i class="fas fa-spinner fa-spin"></i>
                ) : (
                  "Update"
                )}{" "}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
