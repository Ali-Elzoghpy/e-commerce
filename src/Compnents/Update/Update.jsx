import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import * as yup from "yup";

export default function Update() {
  let [loadingSpiner, setLoading] = useState(null);

  let navigate = useNavigate();
  const baseUrl = "https://ecommerce.routemisr.com";
  let header = {
    token: localStorage.getItem("token"),
  };
  let validationSchema = yup.object({
    name: yup
      .string()
      .required("name is requird")
      .min(3, "min 3 chrcters")
      .max(10, "max 10 chrchters"),
    email: yup.string().required("email is req").email("email must be valid"),
    phone: yup
      .string()
      .required("number is req")
      .matches(/^01[0125][0-9]{8}$/, "must be egyption number"),
  });

  let updateFormik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
    },
    validationSchema,
    onSubmit: updateUserData,
  });

  function updateUserData(data) {
    setLoading(true);
    console.log(data);
    axios
      .put(`${baseUrl}/api/v1/users/updateMe/`, data, {
        headers: header,
      })
      .then((res) => {
        console.log(res.data.message);
        toast.success(res.data.message);
        navigate("/");
      })
      .catch((res) => {
        toast.error("make sure to enter new data");
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <>
      <ToastContainer></ToastContainer>
      <div className="p-5 ">
        <div className=" mx-auto mt-11 md:w-7/12 w-12/12 m-12    ">
          <div className="bg-[#F8F9FA] p-12 shadow-2xl  rounded-3xl">
            <h1 className="text-mainColor text-3xl text-center">
              Update your data{" "}
            </h1>
            <form onSubmit={updateFormik.handleSubmit}>
              <div className="mb-4">
                <label htmlFor="userName" className="m">
                  {" "}
                  Name:
                </label>
                <br />
                <input
                  name="name"
                  value={updateFormik.values.name}
                  onChange={updateFormik.handleChange}
                  onBlur={updateFormik.handleBlur}
                  type="text"
                  className="w-full mt-2 rounded-lg p-1 px-2 border focus:outline-none"
                  id="userName"
                />
                {updateFormik.errors.name && updateFormik.touched.name ? (
                  <small className="text-red-600">
                    {" "}
                    {updateFormik.errors.name}
                  </small>
                ) : (
                  ""
                )}{" "}
              </div>
              <div className="mb-4">
                <label htmlFor="userName" className="m">
                  {" "}
                  Email:
                </label>
                <br />
                <input
                  name="email"
                  value={updateFormik.values.email}
                  onChange={updateFormik.handleChange}
                  onBlur={updateFormik.handleBlur}
                  type="email"
                  className="w-full mt-2 px-2 rounded-lg p-1 border focus:outline-none"
                  id="userName"
                />
                {updateFormik.errors.email && updateFormik.touched.email ? (
                  <small className="text-red-600">
                    {" "}
                    {updateFormik.errors.email}
                  </small>
                ) : (
                  ""
                )}{" "}
              </div>
              <div className="mb-4">
                <label htmlFor="userName" className="m">
                  {" "}
                  Phone:
                </label>
                <br />
                <input
                  name="phone"
                  value={updateFormik.values.phone}
                  onChange={updateFormik.handleChange}
                  onBlur={updateFormik.handleBlur}
                  type="tel"
                  className="w-full mt-2  rounded-lg p-1 border focus:outline-none"
                  id="userName"
                />
                {updateFormik.errors.phone && updateFormik.touched.phone ? (
                  <small className="text-red-600">
                    {" "}
                    {updateFormik.errors.phone}
                  </small>
                ) : (
                  ""
                )}{" "}
              </div>
              <button
                disabled={!(updateFormik.isValid && updateFormik.dirty)}
                className="px-4 py-2 text-white bg-mainColor w-full disabled:bg-opacity-20 text-center rounded-md"
                type="submit"
              >
                {loadingSpiner ? (
                  <i class="fas fa-spinner fa-spin"></i>
                ) : (
                  "Update"
                )}{" "}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
