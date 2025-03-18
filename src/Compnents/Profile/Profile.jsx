import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { contextAuth } from "./../Context/AuthContextProvider";
import { Helmet } from "react-helmet";

export default function Profile() {
  const [getUserInfo, setgetUserInfo] = useState(null);
  const [Loader, setLoader] = useState(null);

  let curruntLocation = useLocation();
  curruntLocation =
    curruntLocation.pathname.includes("/Profile/update") ||
    curruntLocation.pathname.includes("/Profile/change-password");

  function getUserData(ids) {
    setLoader(true);
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/users/${ids}`)
      .then((res) => {
        console.log(res.data.data);
        setgetUserInfo(res?.data?.data);
      })
      .catch((res) => {
        console.log(res);
      })
      .finally(() => {
        setLoader(false);
      });
  }
  useEffect(() => {
    let userId = JSON.parse(localStorage.getItem("userInfo"));
    console.log(userId.id);
    if (userId.id) {
      getUserData(userId.id);
    }
  }, []);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Profile</title>
      </Helmet>
      {Loader ? (
        <div className="justify-center flex  items-center h-screen">
          <span class="loader"></span>
        </div>
      ) : (
        <>
          {curruntLocation ? (
            <Outlet />
          ) : (
            <div id="hide" className="m-auto p-10   md:w-7/12 w-12/12   mt-12">
              <div className="bg-[#F8F9FA]   p-12 shadow-2xl  rounded-3xl">
                <h1 className="text-mainColor text-3xl mb-6 text-center">
                  My Profile{" "}
                </h1>
                <div className="mb-4">
                  <label htmlFor="userName"> User Name:</label>
                  <br />
                  <input
                    disabled
                    value={`${getUserInfo?.name}`}
                    type="text"
                    className="w-full mt-2 rounded-lg p-1 px-2 border focus:outline-none"
                    id="userName"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="userName">User Email:</label>
                  <br />
                  <input
                    disabled
                    value={`${getUserInfo?.email}`}
                    type="email"
                    className="w-full mt-2 px-2 rounded-lg p-1 border focus:outline-none"
                    id="userName"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="userName"> User Phone:</label>
                  <br />
                  <input
                    disabled
                    value={`${getUserInfo?.phone}`}
                    type="tel"
                    className="w-full mt-2  rounded-lg p-1 border focus:outline-none"
                    id="userName"
                  />
                </div>
                <div className=" flex justify-center space-x-6">
                  <Link
                    to="update"
                    className="px-4 py-2 text-white bg-mainColor rounded-md"
                  >
                    {" "}
                    Update Date 
                  </Link>
                  <Link
                    to="change-password"
                    className="px-4 py-2 text-white bg-mainColor rounded-md"
                  >
                    {" "}
                    Change Password{" "}
                  </Link>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}
