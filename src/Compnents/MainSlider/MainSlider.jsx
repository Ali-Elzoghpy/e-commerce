import React from "react";
import Slider from "react-slick";
import img1 from "../../assets/slider-image-1.jpeg";
import img2 from "../../assets/slider-image-2.jpeg";
import img3 from "../../assets/slider-image-3.jpeg";
import img4 from "../../assets/grocery-banner-2.jpeg";
import img5 from "../../assets/grocery-banner.png";
import "./MainSlider.css";
export default function MainSlider() {
  // function NextArrow(props) {
  //     const { onClick } = props;
  //     return (
  //       <div className="custom-arrow next-arrow flex justify-end top-[-210px] -right-10 z-10  relative" onClick={onClick}>
  //         <span className="fa-stack ">
  //           <i className="fa-solid fa-circle fa-stack-2x text-green-700 "></i>
  //           <i className="fa-solid fa-chevron-right fa-stack-1x fa-inverse"></i>
  //         </span>
  //       </div>
  //     );
  //   }

  // function PrevArrow(props) {
  //     const { onClick } = props;
  //     return (
  //       <div className="custom-arrow next-arrow flex justify-start  top-[210px] right-10 z-10  relative" onClick={onClick}>
  //         <span className="fa-stack ">
  //           <i className="fa-solid fa-circle fa-stack-2x text-green-700 "></i>
  //           <i className="fa-solid fa-chevron-left   fa-stack-1x fa-inverse"></i>
  //         </span>
  //       </div>
  //     );
  //   }

  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    accessibility: false,
    autoplay: true,
    autoplaySpeed: 3000,

    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
          dots: false,

        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,

        },
      },
    ],
  };

let claass= "text-center"

  return (
    <>
      <div className={`flex  md:flex-row flex-col mt-5`}>
        <div className="md:w-9/12 w-full">
          {" "}
          <Slider {...settings}>
            <img src={img1} className="w-full h-96 object-cover " alt="" />
            <img src={img2} className="w-full h-96 object-cover" alt="" />
            <img src={img3} className="w-full h-96 object-cover" alt="" />
          </Slider>
        </div>
        <div className="md:w-3/12">
          <img
            src={img4}
            className="h-48 object-cover w-full object-right rounded-none"
            alt=""
          />
          <img
            src={img5}
            className="h-48 object-cover w-full object-right rounded-none"
            alt=""
          />
        </div>
      </div>
    </>
  );
}
