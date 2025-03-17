import React, { useContext, useEffect } from "react";
import { cartContext } from "./../Context/CartContext";
import { useState } from "react";
import img from "../../assets/hand-drawn-no-data-illustration_23-2150570252.jpg";
import { Link, useNavigate } from "react-router-dom";

export default function Cart() {
  let {
    getCartData,
    setNumberOfCart,
    numberOfCart,
    updateCart,
    deleteSpacificItem,
    deletAllCart,
    getcartNumber,

  } = useContext(cartContext);
  const [cartData, setCartData] = useState(null);
  const [Loader, setLoader] = useState(null);
  let navgite = useNavigate();

  function getAllCart() {
    setLoader(true);
    getCartData()
      .then((res) => {
        setNumberOfCart(res.data.numOfCartItems);
        setCartData(res.data);
        setLoader(false);
      })
      .catch((res) => {
        console.log(res.response.data);
        setLoader(false);
      });
  }
  function updateCartNumber(count, id) {
    setLoader(true);

    updateCart(count, id)
      .then((res) => {
        setLoader(false);

        setCartData(res.data);
      })
      .catch((res) => {
        setLoader(false);
      });
  }
  function deletOneItem(id) {
    setLoader(true);
    deleteSpacificItem(id)
      .then((res) => {
        setLoader(false);
        getcartNumber()
        getcartNumber()

        setCartData(res.data);
      })
      .catch((res) => {
        setLoader(false);
      });
  }
  function deleAll() {
    deletAllCart()
      .then((res) => {
        getcartNumber()
        navgite("/");
      })
      .catch(() => {});
  }

  useEffect(() => {
    getAllCart();
  }, []);
  console.log(cartData);
  return (
    <>
      {Loader ? (
        <div className="justify-center flex  items-center h-screen">
          <span class="loader"></span>
        </div>
      ) : cartData?.data?.products.length > 0 ? (
        <div className={` ${cartData?.data?.products.length < 2 ? `h-screen` : ""}    p-10 mt-4 rounded-lg relative`}>
          <h1 className="text-3xl font-light ">Shop Cart : </h1>
          <div className="row bg justify-between my-4 ">
            <div>
              {" "}
              <h2 className="text-mainColor text-sm md:text-lg">
                Total Cart Price : {cartData?.data.totalCartPrice}
              </h2>
            </div>
            <div>
              {" "}
              <h2 className="text-mainColor  md:text-lg">
                total number of items :{cartData?.numOfCartItems}
              </h2>
            </div>
          </div>
          {cartData?.data?.products.map((proudct) => {
            return (
              <div
                key={proudct._id}
                className="row mb-8   md:flex-row justify-around flex-col shadow-sm shadow-mainColor rounded-md p-5 my-10"
              >
                <div className="md:w-2/12 w-full    mb-3 md:mb-0 ">
                  <img
                    src={proudct.product.imageCover}
                    className=" w-[60%] rounded-lg block m-auto "
                    alt=""
                  />
                </div>
                <div className="row w-10/12  justify-between ">
                  <div className="w-7/12 ">
                    <h3 className="text-slate-800">
                     <span className=""> {proudct.product.title.split(" ").slice(0,15).join(" ")}</span>
                    </h3>
                    <h4 className="text-mainColor my-4">
                      {" "}
                      price : {proudct.price}{" "}
                    </h4>
                    <div
                      onClick={() => {
                        deletOneItem(proudct.product.id);
                      }}
                      className="cursor-pointer"
                    >
                      <i class="fa-solid fa-trash-can text-red-500  "> </i>
                      <span className="ms-2 ">Remove</span>
                    </div>
                  </div>
                  <div className="w-5/12 text-right">
                    <i
                      onClick={() =>
                        updateCartNumber(proudct.count + 1, proudct.product.id)
                      }
                      class="fa-solid fa-plus text-xs rounded-sm cursor-pointer border-mainColor p-2  border "
                    ></i>
                    <span className="mx-[3px]"> {proudct.count} </span>
                    <i
                      onClick={() =>
                        updateCartNumber(proudct.count - 1, proudct.product.id)
                      }
                      class="fa-solid fa-minus text-xs  rounded-sm cursor-pointer border-mainColor p-2 border"
                    ></i>{" "}
                  </div>
                </div>
              </div>
            );
          })}
          <div className="text-center">
            {" "}
            <button
              onClick={deleAll}
              className="border-mainColor border-2 py-3 px-5"
            >
              Clear Cart
            </button>
          </div>

          <Link
            to={`/shipingDeatls/${cartData?.cartId}`}
            className="absolute bg-mainColor text-white py-2 px-[23px]  top-10 right-10 rounded "
          >
            Chekouat <i class="fa-regular fa-credit-card"></i>{" "}
          </Link>
       
        </div>
      ) : (
        <div className="mx-auto h-screen w-[50%] mt-10">
          <img src={img} className="w-full rounded" alt="" />
        </div>
      )}
    </>
  );
}
