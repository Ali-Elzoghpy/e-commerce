import React from "react";
import Navbar from "./../Navbar/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "./../Footer/Footer";

export default function Layout1() {
  
  return (
    <>
      <div className="bg-[url(./assets/pattern.svg)] " >
        <Navbar />
        <div className="container w-11/12 md:w-10/12 mx-auto">
          <Outlet />
        </div>

      </div>
      <Footer />

    </>
  );
}
