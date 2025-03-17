import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Slider from "react-slick";
import { cartContext } from "./../Context/CartContext";
import { useContext } from "react";
import { toast, ToastContainer } from "react-toastify";

export default function ProudectDeatls() {
  let [proudctDeatls, setProudctDeatls] = useState(null);
  const [Loader, setLoader] = useState(null);
  const [related, setRelated] = useState(null);
  let [imgSrc, setImgSrc] = useState("");
  let { addTocart, getcartNumber } = useContext(cartContext);
  const [cartLoad, setCartLoader] = useState(null);

  let { id, category } = useParams();
  console.log(category);

  function getProudectDeatls(id) {
    setLoader(true);
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then((res) => {
        setProudctDeatls(res?.data?.data);
        console.log(proudctDeatls);
      })
      .catch(() => {})
      .finally(() => {
        setLoader(false);
      });
  }

  function getAllProudct() {
    axios
      .get("https://ecommerce.routemisr.com/api/v1/products/")
      .then((res) => {
        let data = res.data.data;
        let related = data.filter((cat) => {
          return cat.category.name == category;
        });
        setRelated(related);
      })
      .catch(() => {})
      .finally(() => {});
  }

  useEffect(() => {
    getProudectDeatls(id);
    getAllProudct();
  }, [id]);
  function getImgSrc(e) {
    let imgSrc = e.target.getAttribute("src");
    console.log();
    document.getElementById("imgSrc").setAttribute("src", imgSrc);
    setImgSrc("rounded-lg");
  }
  function addData(id) {
    let load = document.getElementById(id);
    load.innerHTML = `                  <span class="loader1"></span>
`;

    // setCartLoader(true);
    addTocart(id)
      .then((res) => {
        setCartLoader(false);
        console.log(res);
        load.innerHTML = `                    Add To Cart <i class="fa-solid fa-cart-plus"></i>
`;
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
        <>
          <div className="row justify-between   mt-5">
            <div className="md:w-3/12 w-full  ">
              <img
                src={proudctDeatls?.imageCover}
                id="imgSrc"
                className={`mb-5 w-[300px]  block mx-auto h-[300px]   rounded-[20px]`}
                alt=""
              />
              <div className="flex gap-2 justify-center mt-3  w-[80%] mx-auto ">
                {proudctDeatls?.images.map((img, i) => {
                  return (
                    <img
                      onClick={getImgSrc}
                      className="w-[80px] h-[80px] object-cover rounded-lg cursor-pointer"
                      key={i}
                      src={img}
                      alt=""
                    />
                  );
                })}
              </div>

              {/* <Slider>


{proudctDeatls?.images.map((img)=>{
  return <img key={proudctDeatls?._id} src={img} alt="" /> 
})}

            </Slider> */}
            </div>
            <div className="md:w-8/12   w-full">
              <h2 className="my-5">{proudctDeatls?.title}</h2>
              <p className="font-light ">{proudctDeatls?.description}</p>
              <div className="row  justify-between   my-5">
                <div className="w-3/12">{proudctDeatls?.price} EGP</div>
                <div className="w-3/12  text-end">
                  <i className="fa-solid fa-star text-yellow-300"></i>
                  {proudctDeatls?.ratingsAverage}
                </div>
              </div>
              <button
                onClick={() => {
                  addData(proudctDeatls?.id);
                }}
                id={proudctDeatls?.id}
                className="w-full bg-mainColor text-white rounded-lg py-3  hover:bg-opacity-70 mt-3 duration-500 "
              >
                {cartLoad ? (
                  <span class="loader1"></span>
                ) : (
                  <span>
                    Add To Cart <i class="fa-solid fa-cart-plus"></i>
                  </span>
                )}{" "}
              </button>
            </div>
          </div>
          <div className="row  mt-5">
            {related?.map((el, i) => {
              return (
                <div
                  key={el._id}
                  className="lg:w-2/12 w-full  p-2 group  overflow-hidden   "
                >
                  <div className="hover:border rounded-lg  border border-transparent hover:border-mainColor p-1 duration-500  ">
                    <Link to={`/proudctDeatls/${el._id}/${el.category.name}`}>
                      <img
                        src={el.imageCover}
                        className="w-full h-52 object-center object-contain"
                        alt={el.category.name}
                      />
                      <div className="my-6">
                        {" "}
                        <h3 className="text-mainColor">{el.category.name}</h3>
                        <h2 className="text-lg">
                          {el.title.split(" ").slice(0, 1).join(" ")}
                        </h2>
                      </div>
                      <div className="row justify-between ">
                        <div className="w-5/12">{el.price}EGP</div>
                        <div className="w-3/12">
                          <i className="fa-solid fa-star text-yellow-500"> </i>
                          {el.ratingsAverage}
                        </div>
                      </div>
                    </Link>
                    <button
                      id={el._id}
                      onClick={() => {
                        addData(el._id);
                      }}
                      className="w-full bg-mainColor text-white rounded-lg py-3  hover:bg-opacity-70 mt-3 translate-y-20  group-hover:translate-y-0 duration-500"
                    >
                      {cartLoad ? (
                        <span class="loader1"></span>
                      ) : (
                        <span>
                          Add To Cart <i class="fa-solid fa-cart-plus"></i>
                        </span>
                      )}{" "}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </>
  );
}
