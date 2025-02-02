import React from "react";
import Navbar from './../Navbar/Navbar';
import { Outlet } from "react-router-dom";
import Footer from './../Footer/Footer';

export default function Layout1() {
  return <>
<Navbar/>
<div className="container w-9/12 mx-auto">
  <Outlet/>
  <Footer/>
  </div>  
  
  </>;
}
