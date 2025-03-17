import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { Helmet } from 'react-helmet';

export default function Category() {
  const [getCategory, setGetCategory] = useState(null);
  const [getCategoryID, setGetCategoryID] = useState(null);
  const [Loader, setLoader] = useState(null);
  const [Loader2, setLoader2] = useState(null);
  let [openModal, setOpenModal] = useState(false);

  function getAllCat() {
    setLoader(true);

    axios
      .get("https://ecommerce.routemisr.com/api/v1/categories")
      .then((res) => {
        console.log(res.data.data);
        setGetCategory(res?.data?.data);
      })
      .catch((res) => {})
      .finally(() => {
        setLoader(false);
      });
  }

  function getSpacificCategory(id) {
    setLoader2(true);
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/categories/${id}`)
      .then((res) => {
        setGetCategoryID(res?.data?.data);
        console.log(res?.data?.data);
      })
      .catch(() => {})
      .finally(() => {
        setLoader2(false);
        console.log("ss");
      });
  }

  useEffect(() => {
    getAllCat();
    initFlowbite();
  }, []);
  function getCatId(e) {
    let clickOn = e.target;
    console.log(clickOn);
    let getIds = e.target.getAttribute("get-id");
    setOpenModal(true);

    getSpacificCategory(getIds);
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
      <Helmet >
                <meta charSet="utf-8" />
                <title>Category</title>
            </Helmet>
      {Loader ? (
        <div className="justify-center flex  items-center h-screen">
          <span class="loader"></span>
        </div>
      ) : (
        <>
          {" "}
          <div className="row md:flex-row flex-col p-7  justify-center">
            {getCategory?.map((cat) => {
              return (
                <>
                  <div
                    key={cat._id}
                    onClick={getCatId}
                    className="md:w-3/12 w-full m-3 rounded-xl shadow hover:shadow-md   duration-500 hover:shadow-mainColor"
                  >
                    <img
                      src={cat.image}
                      className="w-full h-[350px] cursor-pointer rounded-t-xl object-cover object-center"
                      alt={cat.slug}
                      get-id={cat?._id}
                    />
                    <h3 className="text-center p-4  bg-white rounded-b-xl text-3xl text-mainColor">
                      {cat.name}
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
                        src={getCategoryID?.image}
                        className="w-full h-[400px] rounded-t-md  object-contain  "
                        alt={getCategoryID?.name}
                      />
                      <h3 className="text-center p-4  bg-white rounded-b-xl text-3xl text-mainColor">
                        {getCategoryID?.name}
                      </h3>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            ""
          )}
        </>
      )}
    </>
  );
}
