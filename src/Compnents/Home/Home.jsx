import React, { useEffect } from "react";
import MainSlider from "./../MainSlider/MainSlider";
import CatSlider from "./../CatSlider/CatSlider";
import ProudctDisplay from "./../ProudctDisplay/ProudctDisplay";
import { toast, ToastContainer } from "react-toastify";
import { useLocation } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { Helmet } from "react-helmet";

export default function Home() {
  let location = useLocation();
  // useEffect(() => {
  //   if (location.state?.message) {
  //     console.log(location.state?.message);
  //     toast.success(location.state.message, {
  //       autoClose: 3000,
  //     });
  //   }
  // }, [location.state]);
  return (
    <>
  <Helmet>
                <meta charSet="utf-8" />
                <title>Home</title>
            </Helmet>
      <MainSlider />
      <CatSlider />
      <ProudctDisplay />
    </>
  );
}
