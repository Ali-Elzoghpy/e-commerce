import React, { useContext } from "react";
import imgLogo from "../../assets/freshcart-logo.svg";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "./Nav.css";
import { contextAuth } from "../Context/AuthContextProvider";
export default function Navbar() {
  let userInfo = useContext(contextAuth);
  let { token ,setToken } = userInfo;
    let nav= useNavigate()
  function logOut() {
    localStorage.removeItem("token")
    setToken(null)
    nav('/login')
  }

  return (
    <>
      <nav className="bg-white dark:bg-gray-900  w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
        <div className="max-w-screen-xl flex flex-wrap items-center mx-auto justify-between  p-4">
          <Link
            href="https://flowbite.com/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img src={imgLogo} className="h-8" alt="Flowbite Logo" />
          </Link>
          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <button
              data-collapse-toggle="navbar-sticky"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-sticky"
              aria-expanded="false"
            >
              <svg
                className="w-5 h-5"
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
          <div
            className="items-center  hidden w-full md:flex md:w-auto ms-auto "
            id="navbar-sticky"
          >
            {token ? (
              <ul className="flex flex-col font-medium mt-4 rounded-lg text-center  md:space-x-4 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 ">
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
                    className="block py-2 px-3 md:p-0 text-gray-900 rounded  md:hover:bg-transparent md:border-0 hover:text-green-700 dark:text-white md:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    Product
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="cart"
                    className="block py-2 px-3 md:p-0 text-gray-900 rounded  m md:border-0 hover:text-green-700 dark:text-white md:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    Cart
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="category"
                    className="block py-2 px-3 md:p-0 text-gray-900 rounded  md:hover:bg-transparent md:border-0 hover:text-green-700 dark:text-white md:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    Category
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="brands"
                    className="block py-2 px-3 md:p-0 text-gray-900 rounded  md:hover:bg-transparent md:border-0 hover:text-green-700 dark:text-white md:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    Brands
                  </NavLink>
                </li>
                <div className="flex gap-2  justify-center">
                  <li>
                    <i class="fa-brands fa-facebook "></i>
                  </li>
                  <li>
                    <i class="fa-brands fa-linkedin"></i>
                  </li>
                  <li>
                    <i class="fa-brands fa-facebook"></i>
                  </li>
                  <li>
                    <i class="fa-brands fa-facebook"></i>
                  </li>
                  <li>
                    <span className="cursor-pointer" onClick={logOut} >  logout</span>
                  </li>
                </div>
              </ul>
            ) : (
              <>
                <ul className="md:flex-row flex    flex-col space-x-3  self-center text-center">
                  <div className="flex gap-2  ">
                    <li>
                      <NavLink to="signup">Rigister</NavLink>
                    </li>
                    <li>
                      <NavLink to="login">Login</NavLink>
                    </li>
                  </div>
                </ul>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
