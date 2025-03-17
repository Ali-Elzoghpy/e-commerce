import React, { useContext, useEffect } from "react";
import { wishListContext } from "../Context/WishLIstContextProvider";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import { cartContext } from "./../Context/CartContext";
import { Helmet } from 'react-helmet';

export default function WishList() {
  const [wishData, setwishData] = useState(null);
  const [Loader, setLoader] = useState(null);

  let { getWishList, clearYourWish, setWishIcon, getWishNumber } =
    useContext(wishListContext);
  let { addTocart, getcartNumber } = useContext(cartContext);

  function getWishes() {
    setLoader(true);
    getWishList()
      .then((res) => {
        setLoader(false);
        console.log(res);

        setwishData(res.data.data);
      })
      .catch((res) => {
        setLoader(false);

        console.log(res);
      });
  }
  function clearSpacificWish(id) {
    setWishIcon((copyState) => {
      const updatedState = { ...copyState };
      delete updatedState[id];
      localStorage.setItem("wishlist", JSON.stringify(updatedState));
      return updatedState;
    });

    clearYourWish(id)
      .then((res) => {
        toast.success(res.data.message);
        getWishes();
        getWishNumber();
      })
      .catch((res) => {
        toast.error(res.data.message);
      });
  }

  function addData(id) {
    let load = document.getElementById(id);
    load.innerHTML = `                  <span class="loader1"></span>
  `;

    addTocart(id)
      .then((res) => {
        load.innerHTML = `                    Add To Cart <i class="fa-solid fa-cart-plus"></i>
  `;
        getcartNumber();
        console.log(res);
        toast.success(res.data.message);
      })
      .catch((res) => {
        console.log(res.response.data.message);
        toast.error(res.data.message);
        toast.error(res.response.data.message);
      });
  }

  useEffect(() => {
    getWishes();
  }, []);
  return (
    <>
      <Helmet>
                <meta charSet="utf-8" />
                <title>WishLIst</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
      {Loader ? (
        <div className="justify-center flex  items-center h-screen">
          <span class="loader"></span>
        </div>
      ) : (
        <>
          {wishData?.length > 0 ? (
            <div
              className={
                wishData?.length > 1
                  ? `mb-7`
                  : `mb-7 h-screen
          `
              }
            >
              <h1 className="text-3xl font-light py-10  ">My Wishlist</h1>
              {wishData?.map((wish) => {
                return (
                  <>
                    <div
                      key={wish._id}
                      className="row md:flex-row  mb-10 shadow-sm shadow-mainColor rounded-md p-5 flex-col  justify-between"
                    >
                      <div className="  md:w-5/12 w-full ">
                        <div className="row justify-start">
                          <div className="w-6/12 ">
                            <img
                              src={wish.imageCover}
                              className="w-44"
                              alt=""
                            />
                          </div>
                          <div className="w-6/12  ">
                            <h2>
                              {wish.title.split(" ").slice(0, 2).join(" ")}
                            </h2>
                            <h5 className="text-mainColor my-2">
                              {wish.price} EGP
                            </h5>
                            <div
                              onClick={() => {
                                clearSpacificWish(wish._id);
                              }}
                              className="cursor-pointer hover:text-red-600 duration-300"
                            >
                              <i class="fa-solid fa-heart-crack text-red-500"></i>{" "}
                              <span className="ms-2 ">Remove</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className=" md:w-3/12 w-full  ">
                        <button
                          id={wish._id}
                          onClick={() => {
                            addData(wish._id);
                          }}
                          className="w-full bg-mainColor py-3 text-white rounded-lg  hover:bg-opacity-70   duration-500"
                        >
                          <span>
                            Add To Cart <i class="fa-solid fa-cart-plus"></i>
                          </span>
                        </button>
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
          ) : (
            <div className="h-screen mx-auto w-[70%] text-xl mt-10 text-center">
              {" "}
              <h1>
                {" "}
                Your wishList is Empty{" "}
                <i class="fa-solid fa-face-frown text-mainColor"></i>
              </h1>{" "}
            </div>
          )}
        </>
      )}
    </>
  );
}
