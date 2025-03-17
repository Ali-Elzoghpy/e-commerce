import React, { useEffect, useState } from "react";
import axios from "axios";

import { Link, useParams } from "react-router-dom";
import DateObject from "react-date-object";
import { Helmet } from "react-helmet";

export default function OrderDeatls() {
  const [getOrderDeatls, setGetOrderDeatls] = useState([]);
  const [Loader, setLoader] = useState(null);

  let { id } = useParams();
  console.log(id);
  function getUserAllOrders(id1, id2) {
    setLoader(true);
    if (id1) {
      axios
        .get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id1}`)
        .then((res) => {
          let OneArr = res?.data.filter((part) => {
            return part._id == id2;
          });
          console.log(OneArr);
          setGetOrderDeatls(OneArr);
        })
        .catch(() => {})
        .finally(() => {
          setLoader(false);
        });
    }
  }
  useEffect(() => {
    let userinfo = JSON.parse(localStorage.getItem("userInfo"));
    console.log(userinfo);
    if (userinfo) {
      getUserAllOrders(userinfo.id, id);
    } else {
      console.log("eeerrr");
    }
  }, []);
  let date = new DateObject(getOrderDeatls[0]?.paidAt);
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>order info</title>
      </Helmet>
      {Loader ? (
        <div className="justify-center flex  items-center h-screen">
          <span class="loader"></span>
        </div>
      ) : (
        <div
          className={`bg-[#F8F9FA] ${
            getOrderDeatls?.length == 1 ? `h-screen` : ``
          } md:p-16 p-5 shadow-md rounded-3xl mt-10`}
        >
          <div className="row  flex-row justify-between ">
            <div className=" mb-10 md:mb-0 w-[48%]      md:w-3/12">
              <h6 className="fontfamlia  font-[800px]   text-[16px]">
                Order ID:{" "}
                <span className="text-mainColor">#{getOrderDeatls[0]?.id}</span>
              </h6>
              <h6 className="my-1">
                Total Payment Price:
                <span className="text-mainColor">
                  {" "}
                  {getOrderDeatls[0]?.totalOrderPrice} EGP
                </span>
              </h6>
              <h6 className="mb-1">
                Payment Method:{" "}
                <span className="bg-mainColor p-1  px-2 text-sm font-bold fontfamlia text-white  rounded-2xl">
                  {getOrderDeatls[0]?.paymentMethodType}
                </span>
              </h6>
              <h6 className="text-slate-500">
                {date.format("dddd DD MMMM YYYY")}
              </h6>
            </div>

            <div className=" mb-10 md:mb-0 w-[40%]     md:w-2/12   ">
              <h1 className="fontfamlia  font-semibold   text-[20px]">
                Address Info <i class="fa-solid fa-location-dot"></i>
              </h1>
              <h6 className="    overflow-x-auto   ">
                <span className="text-slate-500">Address Details:</span>
                {getOrderDeatls[0]?.shippingAddress?.details}
              </h6>
              <h6>
                <span className="text-slate-500 ">City:</span>{" "}
                {getOrderDeatls[0]?.shippingAddress?.city}
              </h6>
              <h6>
                <span className="text-slate-500">Phone:</span>{" "}
                {getOrderDeatls[0]?.shippingAddress?.phone}
              </h6>
            </div>
            <div className="w-7/12   md:w-3/12   mx-auto md:mx-0   ">
              <h1 className="flex items-center s">
                {" "}
                Customer Info{" "}
                <span class="fa-stack mx">
                  <i class="fa-solid fa-circle text-[23px] mt-1 fa-stack-2x"></i>
                  <i class="fa-solid fa-user fa-2xs fa-stack-1x text-md fa-inverse"></i>
                </span>
              </h1>
              <h6>
                <span className="text-slate-500">Name:</span>{" "}
                {getOrderDeatls[0]?.user?.name}
              </h6>
              <h6>
                <span className="text-slate-500">Email:</span>{" "}
                {getOrderDeatls[0]?.user?.email}
              </h6>
              <h6>
                <span className="text-slate-500">Phone:</span>{" "}
                {getOrderDeatls[0]?.user?.phone}
              </h6>
            </div>
          </div>
          <table className="w-full    rounded-xl text-sm mt-10 text-center rtl:text-right  ">
            <thead className="text-xs   border-b-[2px]  bg-white border-black">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 font-bold  text-center  text-[16px]"
                >
                  Product{" "}
                </th>

                <th
                  scope="col"
                  className="px-6 py-3 fontfamlia  font-[800px]  text-center text-[16px]"
                >
                  Price{" "}
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 font-bold text-center text-[16px]"
                >
                  Quantity{" "}
                </th>
              </tr>
            </thead>
            <tbody className="">
              {getOrderDeatls[0]?.cartItems?.map((item) => {
                return (
                  <tr className="bg-white border-b    border-gray-200 hover:bg-gray-50  ">
                    <th
                      scope="row"
                      className="px-6 py-4  bg-[
RGB(255, 255, 255)] text-lg font-[700px] text-center   whitespace-nowrap "
                    >
                      <Link to={`/proudct/${item?.product?._id}`}>
                        <div className="flex justify-center space-x-4  ">
                          <img
                            src={item?.product?.imageCover}
                            className="w-20  "
                            alt={item?.product?.title}
                          />
                          <span className=" md:block hidden  self-center text-sm ">
                            {item?.product?.title
                              .split(" ")
                              .slice(0, 1)
                              .join(" ")}
                          </span>
                        </div>
                      </Link>
                    </th>
                    <td
                      className="px-6 py-4 fontfamlia text-lg   font-[50px] bg-[
RGB(255, 255, 255)] "
                    >
                      {item?.price} EGP
                    </td>
                    <td
                      className="px-6 py-4  fontfamlia   font-[100px] bg-[
RGB(255, 255, 255)]"
                    >
                      {item?.count}{" "}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
