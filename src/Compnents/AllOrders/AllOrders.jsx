import React, { useEffect, useState } from "react";
import "./Allorder.css";
import axios from "axios";
import { useContext } from "react";
import { contextAuth } from "./../Context/AuthContextProvider";
import { Link } from "react-router-dom";
import { Helmet } from 'react-helmet';
export default function AllOrders() {
  let [getAllorderList, setAllOrdersList] = useState(null);
  const [Loader, setLoader] = useState(null);

  function getUserAllOrders(id) {
    setLoader(true);
    if (id) {
      axios
        .get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`)
        .then((res) => {
          setAllOrdersList(res?.data);
          // console.log(res?.data)
        })
        .catch(() => {})
        .finally(() => {
          setLoader(false);
        });
    }
  }

  useEffect(() => {
    let userinfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userinfo.id) {
      console.log(userinfo.id);

      getUserAllOrders(userinfo.id);
    } else {
      console.log("eeerrr");
    }
  }, []);

  return (
    <>
      <Helmet>
                <meta charSet="utf-8" />
                <title>orders</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
      {Loader ? (
        <div className="justify-center flex  items-center h-screen">
          <span class="loader"></span>
        </div>
      ) : (
        <div
          className={` ${
            getAllorderList?.length >= 6 ? `my-10` : `my-10 h-screen`
          }   `}
        >
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-center rtl:text-right  ">
              <thead className="text-xs  border-b-[2px]  bg-gray-50 border-black">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 font-bold  text-center  text-[16px]"
                  >
                    #
                  </th>

                  <th
                    scope="col"
                    className="px-6 py-3 fontfamlia  font-[800px]  text-center text-[16px]"
                  >
                    Order Price
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 font-bold text-center text-[16px]"
                  >
                    Status
                  </th>

                  <th
                    scope="col"
                    className="px-6 py-3 font-bold  text-center text-[16px]"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {getAllorderList?.map((tr, i) => {
                  let { id, isDelivered, isPaid, totalOrderPrice, _id } = tr;
                  return (
                    <tr
                      key={i}
                      className="bg-white border-b  border-gray-200 hover:bg-gray-50 "
                    >
                      <th
                        scope="row"
                        className="px-6 py-4  bg-[
RGB(255, 255, 255)] text-lg font-[700px] text-center  whitespace-nowrap "
                      >
                        #{id}
                      </th>
                      <td
                        className="px-6 py-4 fontfamlia text-lg   font-[50px] bg-[
RGB(255, 255, 255)]  "
                      >
                        {totalOrderPrice} EGP
                      </td>
                      <td
                        className="px-6 py-4  fontfamlia text-white  font-[100px] bg-[
RGB(255, 255, 255)]"
                      >
                        <div className="flex flex-col">
                          <div className="mb-2">
                            <span
                              className={
                                isPaid
                                  ? ` bg-mainColor  p-1 px-2 rounded-lg `
                                  : "bg-red-600 p-1 px-2 rounded-lg"
                              }
                            >
                              isPaid
                            </span>{" "}
                          </div>
                          <div className="  ">
                            <span
                              className={
                                isDelivered
                                  ? ` bg-mainColor  p-1 px-2 rounded-lg `
                                  : `bg-red-600 p-1 px-2  rounded-lg`
                              }
                            >
                              isDelivered
                            </span>
                          </div>
                        </div>
                      </td>
                      <td
                        className="px-6 py-4  fontfamlia   font-[100px] bg-[
RGB(255, 255, 255)]"
                      >
                        {" "}
                        <Link
                          to={`/allorders/${_id}`}
                          className="py-2 px-5 font-[400px] text-[17px]  text-white rounded bg-mainColor"
                        >
                          {" "}
                          View{" "}
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
}
