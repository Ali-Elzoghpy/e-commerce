import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { wishListContext } from "../Context/WishLIstContextProvider";
import { toast, ToastContainer } from "react-toastify";
import { cartContext } from "./../Context/CartContext";

export default function OrderInfo() {
  let [getOneProudct, setGetOneProudct] = useState(null);
  const [Loader, setLoader] = useState(null);

  const [cartLoad, setCartLoader] = useState(null);

  let {
    clearYourWish,
    addYourWish,
    wishIcon,
    setWishIcon,
    getWishList,
    getWishNumber,
  } = useContext(wishListContext);
  let { addTocart, getcartNumber } = useContext(cartContext);

  let { id } = useParams();
  console.log(id);
  function getProudct(id) {
    setLoader(true);
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then((res) => {
        console.log(res.data.data);
        setGetOneProudct(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoader(false);
      });
  }
  function chekList(id) {
    if (wishIcon[id]) {
      setWishIcon((copyState) => {
        const updatedState = { ...copyState };
        delete updatedState[id];
        localStorage.setItem("wishlist", JSON.stringify(updatedState));
        return updatedState;
      });

      clearYourWish(id)
        .then((res) => {
          console.log(res.data.message);
          getWishList();
          getWishNumber();
          toast.success(res.data.message);
        })
        .catch((res) => {
          toast.error(res);
        });
    } else {
      setWishIcon((copyState) => {
        console.log(copyState);
        const updatedState = { ...copyState, [id]: true };

        localStorage.setItem("wishlist", JSON.stringify(updatedState));
        return updatedState;
      });

      addYourWish(id)
        .then((res) => {
          getWishList();
          getWishNumber();

          toast.success(res.data.message);
        })
        .catch((res) => {
          toast.error(res.data.message);
        });
    }
  }
  useEffect(() => {
    getProudct(id);
    const savedWishlist = JSON.parse(localStorage.getItem("wishlist")) || {};
    setWishIcon(savedWishlist);
  }, []);

  function getImgSrc(e) {
    let setImgSrc = document.getElementById("imgSrc");
    let getIMgSrc = e.target.getAttribute("src");
    setImgSrc.setAttribute("src", getIMgSrc);
  }
  function addData(id) {
    setCartLoader(true);
    addTocart(id)
      .then((res) => {
        setCartLoader(false);
        console.log(res);
        getcartNumber();

        toast.success(res.data.message);
      })
      .catch((res) => {
        setCartLoader(false);
        console.log(res.response.data.message);
        // toast.error(res.data.message);
        toast.error(res.response.data.message);
      });
  }

  return (
    <>
      {Loader ? (
        <div className="justify-center flex  items-center h-screen">
          <span class="loader"></span>
        </div>
      ) : (
        <div className="mt-10">
          <ToastContainer />

          <div className=" flex md:flex-row flex-col shadow-2xl  rounded-e-xl  ">
            <div className="w-full md:w-6/12 border-t-[0.5px] md:border-s-[0.5px]  md:border-e-[0.5px]">
              <div className="inner bg-white relative   ">
                <img
                  id="imgSrc"
                  src={getOneProudct?.imageCover}
                  className="w-full h-[450px]  object-topconsole.log() object-contain"
                  alt=""
                />

                <div className="icon absolute right-5 top-5 cursor-pointer">
                  {" "}
                  <i
                    onClick={() => {
                      chekList(id);
                    }}
                    className={
                      wishIcon[id]
                        ? "fa-solid fa-heart  text-lg text-red-500"
                        : "fa-regular fa-heart text-mainColor text-lg "
                    }
                  ></i>
                </div>
                <div className="imges  flex flex-row border-t-[0.5px] pt-[14px] flex-nowrap   justify-center">
                  {getOneProudct?.images?.map((img, i) => {
                    return (
                      <img
                        key={i}
                        onClick={getImgSrc}
                        src={img}
                        className="  w-[50px] md:w-[60px] hover:border-2 duration-500 border-2 border-transparent object-top hover:border-mainColor h-[50px]  md:h-[60px] object-cover  m-1 cursor-pointer"
                        alt=""
                      />
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="w-full md:w-6/12  bg-[#FCFCFD]  border-t-[0.5px] md:rounded-ee-xl       md:rounded-e-xl  ">
              <div className="inner p-5    ">
                <h1 className="text-3xl font-light">{getOneProudct?.title}</h1>
                <p className="my-4 font-light text-[16px]">
                  {getOneProudct?.description}
                </p>
                <div className="row mb-5 justify-between">
                  <div className="w-5/12 ">{getOneProudct?.price} EGP</div>{" "}
                  <div className="w-5/12  text-right">
                    {getOneProudct?.ratingsAverage}
                    <i className="fa-solid fa-star text-yellow-500 "> </i>
                  </div>{" "}
                </div>{" "}
                <button
                  onClick={() => {
                    addData(id);
                  }}
                  className="bg-mainColor text-white rounded-lg py-3 hover:bg-opacity-70 mt-3    duration-500"
                >
                  {" "}
                  {cartLoad ? (
                    <>
                      <div className="p-1">
                        {" "}
                        <span>
                          {" "}
                          Add To Cart <i class="fa-solid fa-cart-plus"></i>
                        </span>{" "}
                        <span class="loader1 "></span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="p-1 px-2">
                        {" "}
                        <span>
                          {" "}
                          Add To Cart <i class="fa-solid fa-cart-plus"></i>
                        </span>{" "}
                      </div>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
