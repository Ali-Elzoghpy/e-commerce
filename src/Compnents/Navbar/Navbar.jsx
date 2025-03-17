import React, { useContext, useEffect, useState } from "react";
import imgLogo from "../../assets/freshcart-logo.svg";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import "./Nav.css";
import { contextAuth } from "../Context/AuthContextProvider";
import { cartContext } from "./../Context/CartContext";
import { wishListContext } from "./../Context/WishLIstContextProvider";
import { initFlowbite } from "flowbite";

export default function Navbar() {
  let userInfo = useContext(contextAuth);
  let { getcartNumber, getCartNum } = useContext(cartContext);
  let { token, setToken } = userInfo;
  let { getWishNumber, getWishsNumber } = useContext(wishListContext);
  const [list, setList] = useState(false);
  const [getUser, setgetUser] = useState({});
  let nav = useNavigate();
  // console.log("ss ")
  useEffect(() => {
    let userInfo = JSON.parse(localStorage.getItem("userInfo"));
    setgetUser(userInfo);
    console.log(userInfo);
    initFlowbite();
    getcartNumber();
    getWishNumber();
  }, []);
  const location = useLocation();
  useEffect(() => {
    if (location?.state) {
      initFlowbite();
    }
  }, [location?.state]);

  console.log("render");


  function mouseEnter() {
    initFlowbite();
  }

  function logOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("userInfo");
    setToken(null);
    nav("/login");
  }

  return (
    <>
      <nav className="bg-white shadow-md border-gray-200 ">
        <div className=" md:w-10/12 w-11/12 py-4 flex flex-wrap items-center justify-between mx-auto ">
          <Link
            href="https://flowbite.com/"
            className="flex items-center space-x-3  rtl:space-x-reverse"
          >
            <img src={imgLogo} className="h-8" alt="Flowbite Logo" />
          </Link>
          <div className="flex items-center md:order-2   md:space-x-0 rtl:space-x-reverse">
            <div className=" hidden md:block">
              {token ? (
                <ul className="flex list-none  p-1   ">
                  <div className=" border-r-2 border-mainColor py-2">
                    <li>
                      <NavLink
                        to="cart"
                        className="block py-2 relative  px-3 md:p-0 text-gray-900 rounded  pe-5 md:border-0 hover:text-mainColor "
                      >
                        Cart
                        <i
                          className={`fa-solid fa-cart-shopping  ${
                            getCartNum == 0 ? `me-2` : `me-6`
                          }`}
                        ></i>
                        {getCartNum == 0 ? (
                          ""
                        ) : (
                          <span className="absolute text-white md:left-11 md:bottom-3 left-[361px] bottom-5 bg-mainColor inline-flex justify-center items-center p-3   w-[13px]  h-[13px] rounded-2xl ">
                            {getCartNum}
                          </span>
                        )}
                      </NavLink>
                    </li>
                  </div>
                  <li className="ps-3 self-center hover:text-mainColor">
                    <NavLink
                      to="wishList"
                      className="block py-2 relative  hover:text-green-700  px-3 md:p-0  rounded  pe-5 md:border-0     "
                    >
                      wishList{" "}
                      <i
                        className={`fa-solid fa-heart  ${
                          getWishsNumber?.count == 0 ? `me-1` : `me-3`
                        }`}
                      ></i>
                      {getWishsNumber?.count == 0 ? (
                        " "
                      ) : (
                        <span className="absolute text-white md:left-[65px] md:bottom-3 left-[360px] bottom-5 bg-mainColor inline-flex justify-center items-center p-3   w-[13px]  h-[13px] rounded-2xl ">
                          {getWishsNumber?.count}
                        </span>
                      )}
                    </NavLink>
                  </li>
                </ul>
              ) : (
                ""
              )}
            </div>
            {/* collaps btn */}
            <div className=" ">
              {" "}
              <button
                                     onClick={mouseEnter}

                data-collapse-toggle="navbar-user"
                type="button"
                className="inline-flex   items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200  "
                aria-controls="navbar-user"
                aria-expanded="false"
              >
                <span className="sr-only ">Open main menu</span>
                <svg
                  className="w-5 h-5  "
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 17 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M1 1h15M1 7h15M1 13h15"
                  />
                </svg>
              </button>
            </div>
            {token ? (
              <>
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto ">
                  <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                    <button
                      // onFocus={mouseEnter}
                      type="button"
                      className="focus:shadow-inner me-3 focus:shadow-green-200 text-sm  hidden  md:block   border-[4px] border-mainColor   bg-white  rounded-full md:me-0  "
                      id="user-menu-button"
                      aria-expanded="false"
                      data-dropdown-toggle="user-dropdown"
                      data-dropdown-placement="bottom"
                    >
                      <span className="sr-only"></span>
                      <span className="text-lg font-bold inline-flex justify-center items-center p-4   w-[20px]  h-[20px]">
                        {" "}
                        {getUser?.name.split("").slice(0, 2)}
                      </span>
                    </button>
                    {/* Dropdown menu */}
                    <div className="md:block hidden">
                      <div
                        className={`z-50 hidden  my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow-sm `}
                        id="user-dropdown"
                      >
                        <div className="px-6 py-3 ">
                          <span className="block text-sm text-gray-900 hover:text-mainColor">
                            {getUser?.name}
                          </span>
                        </div>
                        <ul className="py-2" aria-labelledby="user-menu-button">
                          <li>
                            <Link
                              to="Profile"
                              className="block px-6 py-2 text-sm text-gray-700 hover:bg-gray-100  "
                            >
                              Profile{" "}
                              <i class="fa-solid text-mainColor fa-user"></i>
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="allorders"
                              className="block px-6 py-2 text-sm text-gray-700 hover:bg-gray-100  "
                            >
                              allorders{" "}
                              <i class="fa-solid text-mainColor fa-truck-front"></i>
                            </Link>
                          </li>

                          <li className="cursor-pointer" onClick={logOut}>
                            <span className="block px-6 py-2 text-sm text-gray-700 hover:bg-gray-100  ">
                              Sign out{" "}
                              <i class="fa-solid fa-right-from-bracket text-mainColor"></i>
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className=" hidden md:flex">
                {" "}
                <div className="pe-4 ">
                  <Link className="" to="login">
                    {" "}
                    login{" "}
                    <i class="fa-solid fa-right-to-bracket text-mainColor "></i>{" "}
                  </Link>
                </div>
                <Link to="signup" className="p">
                  {" "}
                  Rigester{" "}
                </Link>
              </div>
            )}
          </div>
          <div
            className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
            id="navbar-user"
          >
            {token ? (
              <ul className="flex flex-col   font-medium mt-4 rounded-lg text-center  md:space-x-4 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 ">
                <li>
                  <NavLink
                    to=""
                    className="inline py-2 px-3 md:p-0 hover:text-green-700   rounded md:bg-transparent  "
                    aria-current="page"
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="proudct"
                    className="block py-2 px-3 md:p-0 text-gray-900 rounded  md:hover:bg-transparent md:border-0 hover:text-green-700 "
                  >
                    Product
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="category"
                    className="block py-2 px-3 md:p-0 text-gray-900 rounded  md:hover:bg-transparent md:border-0 hover:text-green-700"
                  >
                    Category
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="brands"
                    className="block py-2 px-3 md:p-0 text-gray-900 rounded  md:hover:bg-transparent md:border-0 hover:text-green-700 "
                  >
                    Brands
                  </NavLink>
                </li>
                <li className=" block  md:hidden self-center my-2 ">
                  <NavLink
                    to="wishList"
                    className=" py-2 relative  inline  px-3 md:p-0 text-gray-900 rounded  pe-5 md:border-0 hover:text-green-700 "
                  >
                    wishList <i class="fa-solid fa-heart  me-1"></i>
                    <span className="absolute text-white md:left-[65px] md:bottom-3 left-[80px]  bottom-5 bg-mainColor inline-flex justify-center items-center p-3   w-[13px]  h-[13px] rounded-2xl ">
                      {getWishsNumber?.count}
                    </span>
                  </NavLink>
                </li>
                <li className="block md:hidden my-2   ">
                  <NavLink
                    to="cart"
                    className=" py-2 relative  inline px-3 md:p-0 text-gray-900 rounded pe-5 md:border-0 hover:text-green-700 "
                  >
                    Cart <i className="fa-solid fa-cart-shopping  relative"></i>
                    <span className="absolute text-white   -top-2 right-1   bg-mainColor inline-flex justify-center items-center p-3 w-[13px] h-[13px] rounded-2xl">
                      {getCartNum}
                    </span>
                  </NavLink>
                </li>

                <li className=" md:hidden block   ">
                  <div className=" flex  justify-center  ">
                    <div className="flex items-center justify-center    ">
                      <button
                        type="button"
                        className="focus:shadow-inner  focus:shadow-green-200 text-sm        border-[4px] border-mainColor   bg-white  rounded-full   "
                        id="user-menu-button"
                        aria-expanded="false"
                        data-dropdown-toggle="user-dropdown2"
                        data-dropdown-placement="bottom"
                      >
                        <span className="sr-only"></span>
                        <span className="text-lg font-bold inline-flex justify-center items-center p-4   w-[20px]  h-[20px]">
                          {" "}
                          {getUser?.name?.split("").slice(0, 2)}
                        </span>
                      </button>
                      {/* Dropdown menu */}
                      <div className="md:hidden block">
                        <div
                          className={`z-50 hidden  my-4 text-base list-none text-left bg-white divide-y divide-gray-100 rounded-lg shadow-sm `}
                          id="user-dropdown2"
                        >
                          <div className="px-6 py-3 ">
                            <span className="block text-sm text-gray-900 hover:text-mainColor">
                              {getUser?.name}
                            </span>
                          </div>
                          <ul
                            className="py-2"
                            aria-labelledby="user-menu-button"
                          >
                            <li>
                              <Link
                                to="Profile"
                                className="block px-6 py-2 text-sm text-gray-700 hover:bg-gray-100  "
                              >
                                Profile{" "}
                                <i class="fa-solid text-mainColor fa-user"></i>
                              </Link>
                            </li>
                            <li>
                              <Link
                                to="allorders"
                                className="block px-6 py-2 text-sm text-gray-700 hover:bg-gray-100  "
                              >
                                allorders{" "}
                                <i class="fa-solid text-mainColor fa-truck-front"></i>
                              </Link>
                            </li>

                            <li className="cursor-pointer" onClick={logOut}>
                              <span className="block px-6 py-2 text-sm text-gray-700 hover:bg-gray-100  ">
                                Sign out{" "}
                                <i class="fa-solid fa-right-from-bracket text-mainColor"></i>
                              </span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            ) : (
              <div className="md:hidden ">
                {" "}
                <div className="pe-4 ">
                  <Link
                    className="hover:text-mainColor duration-200"
                    to="login"
                  >
                    {" "}
                    login{" "}
                    <i class="fa-solid fa-right-to-bracket text-mainColor "></i>{" "}
                  </Link>
                </div>
                <Link to="signup" className="hover:text-mainColor duration-200">
                  {" "}
                  Rigester{" "}
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
