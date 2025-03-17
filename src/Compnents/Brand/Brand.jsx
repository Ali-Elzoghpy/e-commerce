import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { initFlowbite } from "flowbite";

export default function Brand() {
  const [getBrand, setgetBrand] = useState(null);
  const [Loader2, setLoader2] = useState(null);
  const [getBrandID, setGetBrandID] = useState(null);
  const [Loader, setLoader] = useState(null);
  let [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    initFlowbite()
    getBrands();
  }, []);
  

  function getBrands() {
    setLoader(true);
    axios
      .get("https://ecommerce.routemisr.com/api/v1/brands")
      .then((res) => {
        console.log(res.data.data);
        setgetBrand(res?.data?.data);
      })
      .catch(() => {})
      .finally(() => {
        setLoader(false);
      });
  }
  function getSpacificBrand(id) {
    setLoader2(true);
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`)
      .then((res) => {
        console.log(res.data.data);

        setGetBrandID(res?.data?.data);
      })
      .catch(() => {})
      .finally(() => {
        setLoader2(false);
      });
  }

  function getbrandId(e) {
    let getIds = e.target.getAttribute("get-id");
    setOpenModal(true);

    getSpacificBrand(getIds);
  }
  function closeModal(e) {
    let parntModal = document.getElementById("parntModal");
    console.log(parntModal);
    console.log(e.target.getAttribute("id"));
    if (e.target.getAttribute("id") == "parntModal") {
      setOpenModal(false);
    }
  }

  return (
    <>
      {Loader ? (
        <div className="justify-center flex  items-center h-screen">
          <span class="loader"></span>
        </div>
      ) : (
        <div>
          <h1 className="font-light text-3xl text-center mt-4 text-mainColor">
            {" "}
            All Brands
          </h1>
          <div className="row md:flex-row flex-col p-7  justify-center">
            {getBrand?.map((brand) => {
              return (
                <>
                  <div
                    key={brand._id}
                    onClick={getbrandId}
                    className="md:w-3/12 w-full m-3 rounded-xl shadow hover:shadow-md   duration-500 hover:shadow-mainColor"
                  >
                    <img
                
                      src={brand.image}
                      className="w-full h-[300px] cursor-pointer rounded-t-xl object-contain bg-white "
                      alt={brand.slug}
                      get-id={brand?._id}
                    />
                    <h3 className="text-center p-4  bg-white rounded-b-xl text-3xl text-mainColor">
                      {brand.name}
                    </h3>
                  </div>
                </>
              );
            })}
          </div>
          {openModal ? (
            <div
              className=" flex
            
              overflow-y-auto bg-[rgba(0,0,0,0.5)] overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-screen max-h-full"
              onClick={closeModal}
              id="parntModal"
            >
              {Loader2 ? (
                <div className="justify-center flex  items-center h-screen">
                  <span class="loader"></span>
                </div>
              ) : (
                <div className="relative rounded   max-h-full">
                  <div className="relative  rounded-lg shadow-sm ">
                    <div>
                      <img
                        src={getBrandID?.image}
                        className="w-full h-[400px] rounded-t-md  object-contain  "
                        alt={getBrandID?.name}
                      />
                      <h3 className="text-center p-4  bg-white rounded-b-xl text-3xl text-mainColor">
                        {getBrandID?.name}
                      </h3>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            ""
          )}
        </div>
      )}
    </>
  );
}
