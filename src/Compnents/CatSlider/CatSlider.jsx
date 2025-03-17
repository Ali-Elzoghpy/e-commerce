import axios from "axios";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";

export default function CatSlider() {
  const [catImg, setCatImg] = useState([]);
  function getCatApi() {
    axios
      .get("https://ecommerce.routemisr.com/api/v1/categories")
      .then((res) => {
        setCatImg(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  useEffect(() => {
    getCatApi();
  }, []);
  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6,
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
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
          dots: false


        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false
        }
      }
    ]
  };

  return (
    <div className="my-10">
      <h2 className="my-3 text-3xl font-light text-mainColor">Shop poupler Categoties</h2>
      <Slider {...settings}>
  {catImg.map((img) => {
    return (
      <div key={img._id} className="p-2">
        <img
          src={img.image}
          className="w-full h-48 object-cover object-top"
          alt={img.name}
        />
        <h3 className="text-center mt-2">{img.name}</h3>
      </div>
    );
  })}
</Slider>
    </div>
  );
}
