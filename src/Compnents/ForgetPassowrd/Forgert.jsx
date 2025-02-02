import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

export default function Forgert() {
  let [loadingSpiner, setloading] = useState(true);
  let [displayErro, seterr] = useState(false);
  let [displayForm, setForm] = useState(true);
let navigate = useNavigate()
  function forgetApi(data) {
    setloading(false);
    axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords", data)
      .then((res) => {
        setloading(true);
      if(res.data.statusMsg == "success"){
        setForm(false)
      }
     
     
      })
      .catch((res) => {
        setloading(true);
        seterr(res.response.data.message);
      });
  }
  let validationSchema1 = yup.object({
    email: yup
      .string()
      .required("email is requird")
      .email("email must be valid one"),
  });

  let forgetFormik = useFormik({
    initialValues: { email: "" },
    validationSchema: validationSchema1,
    onSubmit: forgetApi,
  });
  let validationSchema2 = yup.object({
    resetCode: yup.string().required("verfy is requird").min(4,"min 4")
  });
  function verfyApi(data) {
    setloading(false);
    axios.post(
      "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
      data
    ).then((res)=>{
if(res.data.status == "Success"){
    setloading(true);
    navigate("/newPassword")

}

    }).catch((res)=>{
        setloading(true);
        seterr(res.response.data.message);
    })

}
  let verifyFormik = useFormik({
    initialValues: { resetCode: "" },
    validationSchema: validationSchema2,
    onSubmit: verfyApi,
  });

  return (
    <>
      {displayErro ? (
        <p className="bg-red-800 text-center ">{displayErro}</p>
      ) : (
        ""
      )}
      {  displayForm ?   <form action="" onSubmit={forgetFormik.handleSubmit}>
        <h1 className="my-5">Forget password :</h1>
        <div className="mb-3">
          <input
            value={forgetFormik.values.email}
            onChange={forgetFormik.handleChange}
            onBlur={forgetFormik.handleBlur}
            name="email"
            type="email"
            className=" border w-full  p-1 focus:outline-none "
            placeholder="Email"
          />
          {forgetFormik.errors.email && forgetFormik.touched.email ? (
            <p className="text-red-700 mb-3 "> {forgetFormik.errors.email} </p>
          ) : (
            ""
          )}
        </div>

        <div className="flex  flex flex-col items-start">
          <button
            disabled={!(forgetFormik.isValid && forgetFormik.dirty)}
            type="submit"
            className="bg-mainColor rounded p-1 text-white mt-3  disabled:bg-opacity-20  d-bl"
          >
            {loadingSpiner ? "Submit" : <i class="fas fa-spinner fa-spin"></i>}
          </button>
        </div>
      </form>  :  <form action="" onSubmit={verifyFormik.handleSubmit}>
        <h1 className="my-5">verfy Code :</h1>
        <div className="mb-3">
          <input
            value={verifyFormik.values.resetCode}
            onChange={verifyFormik.handleChange}
            onBlur={verifyFormik.handleBlur}
            name="resetCode"
            type="string"
            className=" border w-full  p-1 focus:outline-none "
            placeholder="verfy code "
          />
          {verifyFormik.errors.email && verifyFormik.touched.email ? (
            <p className="text-red-700 mb-3 "> {verifyFormik.errors.email} </p>
          ) : (
            ""
          )}
        </div>

        <div className="flex  flex flex-col items-start">
          <button
            disabled={!(verifyFormik.isValid && verifyFormik.dirty)}
            type="submit"
            className="bg-mainColor rounded p-1 text-white mt-3  disabled:bg-opacity-20  d-bl"
          >
            {loadingSpiner ? "Send" : <i class="fas fa-spinner fa-spin"></i>}
          </button>
        </div>
      </form>} 
    

     
    </>
  );
}
