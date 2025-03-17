import axios from "axios";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { cartContext } from "./../Context/CartContext";
import { ToastContainer, toast } from "react-toastify";
import { wishListContext } from "./../Context/WishLIstContextProvider";

export default function ProudctDisplay() {
  let [pageNumber, setPageNumber] = useState();
  const [proudect, setProudect] = useState([]);
  const [Loader, setLoader] = useState(null);
  const [cartLoad, setCartLoader] = useState(null);
  let [CurntPage, setCurntPage] = useState(1);
  const [userValue, setUserValue] = useState("");
  let { addTocart, getcartNumber } = useContext(cartContext);
  let {
    addYourWish,
    clearYourWish,
    wishIcon,
    setWishIcon,
    getWishList,
    getWishNumber,
  } = useContext(wishListContext);
  function addData(id) {
    setCartLoader(true);
    addTocart(id)
      .then((res) => {
        setCartLoader(false);
        console.log(res);
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

  function chekList(id) {
    if (wishIcon[id]) {
      setWishIcon((copyState) => {
        const updatedState = { ...copyState };
        delete updatedState[id];
        localStorage.setItem("wishlist", JSON.stringify(updatedState));
        return updatedState;
      });

      clearYourWish(id)
        .then((res) => {
          console.log(res.data.message);
          getWishList();
          getWishNumber();

          toast.success(res.data.message);
        })
        .catch((res) => {
          toast.error(res.response.data.message);
        });
    } else {
      setWishIcon((copyState) => {
        console.log(copyState);
        const updatedState = { ...copyState, [id]: true };

        localStorage.setItem("wishlist", JSON.stringify(updatedState));
        return updatedState;
      });

      addYourWish(id)
        .then((res) => {
          getWishList();
          getWishNumber();
          toast.success(res.data.message);
        })
        .catch((res) => {
          toast.error(res.response.data.message);
        });
    }
  }

  function getData(pageNumber = 1) {
    console.log(pageNumber + "pageNumber");
    setLoader(true);
    axios
      .get(
        `https://ecommerce.routemisr.com/api/v1/products/?limit=10&page=${pageNumber}`
      )
      .then((res) => {
        setProudect(res.data.data);
        setPageNumber(res.data.metadata.numberOfPages);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoader(false);
      });
  }
  useEffect(() => {
    const savedWishlist = JSON.parse(localStorage.getItem("wishlist")) || {};
    setWishIcon(savedWishlist);
    getData();
  }, []);

  let num = [];

  for (let i = 1; i <= pageNumber; i++) {
    num.push(i);
  }
  function getNumber(e) {
    let pageSpcific = e.target.getAttribute("page");
    console.log(pageSpcific);
    getData(pageSpcific);
    setCurntPage(pageSpcific);
  }

  function handelUserSearsh(e) {
    const userWords = e.target.value;
    setUserValue(userWords);
  }
  function highlightText(text, query) {
    if (!query) return text;
    const parts = text.split(new RegExp(`(${query})`, "gi"));
    console.log(parts);
    return parts.map((part, i) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <span key={i} className="bg-mainColor text-white">
          {part}
        </span>
      ) : (
        part
      )
    );
  }

  function prevPage() {
    if (CurntPage <= pageNumber && CurntPage != 1) {
      let nextPageNumber = Number(CurntPage) - 1;
      console.log("in");
      setCurntPage(nextPageNumber);
      getData(nextPageNumber);
      console.log(nextPageNumber + "nextPageNumber");
    } else if (CurntPage == 1) {
      setCurntPage(pageNumber);

      getData(pageNumber);
    }
  }
  function nextPage() {
    if (CurntPage < pageNumber) {
      console.log(CurntPage);
      let nextPageNumber = Number(CurntPage) + 1;
      console.log("in");
      setCurntPage(nextPageNumber);
      getData(nextPageNumber);
      console.log(nextPageNumber + "nextPageNumber");
    } else if (CurntPage == pageNumber) {
      setCurntPage(1);

      getData(1);
    }
  }

  return (
    <>
      {Loader ? (
        <div className="justify-center flex  items-center h-screen">
          <span class="loader"></span>
        </div>
      ) : (
        <>
          <input
            value={userValue}
            onChange={handelUserSearsh}
            type="text"
            className=" mx-auto block w-[50%] rounded p-2 border focus:outline-none my-5 placeholder:text-mainColor focus:shadow focus:shadow-mainColor"
            placeholder="search by name"
          />
          <div className="row md:flex-row flex-col">
            {proudect.map((proudect) => {
              return (
                <>
                  {proudect.title
                    .toLowerCase()
                    .includes(userValue.toLowerCase()) == true ? (
                    <div
                      key={proudect._id}
                      className="lg:w-2/12 w-full p-2 group  overflow-hidden   "
                    >
                      <div className="hover:border rounded-md  border relative border-transparent hover:border-mainColor p-1 duration-500  ">
                        <span
                          id={proudect._id}
                          onClick={() => {
                            chekList(proudect._id);
                          }}
                          className="absolute  right-4 text-mainColor cursor-pointer  "
                        >
                          <i
                            className={
                              wishIcon[proudect._id]
                                ? "fa-solid fa-heart text-lg text-red-500"
                                : "fa-regular fa-heart text-lg "
                            }
                          ></i>{" "}
                        </span>
                        <Link
                          to={`/proudctDeatls/${proudect._id}/${proudect.category.name}`}
                        >
                          <img
                            src={proudect.imageCover}
                            className="w-full h-56 object-top object-contain"
                            alt=""
                          />
                          <div className="my-6">
                            {" "}
                            <h3 className="text-mainColor">
                              {proudect.category.name}
                            </h3>
                            <h2 className="text-lg" id="highLight">
                              {highlightText(
                                proudect.title.split(" ").slice(0, 2).join(" "),
                                userValue
                              )}
                            </h2>
                          </div>
                          <div className="row justify-between ">
                            <div className="w-5/12">{proudect.price}EGP</div>
                            <div className="w-3/12">
                              <i className="fa-solid fa-star text-yellow-500">
                                {" "}
                              </i>
                              {proudect.ratingsAverage}
                            </div>
                          </div>
                        </Link>
                        <button
                          onClick={() => addData(proudect._id)}
                          className="w-full bg-mainColor text-white rounded-lg py-3 hover:bg-opacity-70 mt-3 translate-y-20  group-hover:translate-y-0 duration-500"
                        >
                          {cartLoad ? (
                            <span class="loader1"></span>
                          ) : (
                            <span onClick={getcartNumber}>
                              Add To Cart <i class="fa-solid fa-cart-plus"></i>
                            </span>
                          )}
                        </button>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </>
              );
            })}
          </div>
          <nav aria-label="Page navigation example">
            <ul
              className={`flex items-center justify-center -space-x-px h-8 text-sm  ${
                userValue.length > 0 ? `mt-8` : ""
              } `}
            >
              <li onClick={prevPage}>
                <a
                  className={`flex  cursor-pointer items-center justify-center px-3 h-8 ms-0 leading-tight     text-mainColor bg-white border border-e-0 bo rounded-s-lg hover:bg-gray-100 hover:text-opacity-50 `}
                >
                  <span class="sr-only">Previous</span>
                  <svg
                    class="w-2.5 h-2.5 rtl:rotate-180"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 6 10"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 1 1 5l4 4"
                    />
                  </svg>
                </a>
              </li>

              {num.map((el) => {
                return (
                  <li key={el} className="cursor-pointer">
                    <a
                      page={el}
                      onClick={getNumber}
                      className={`  ${
                        CurntPage == el ? `bg-mainColor text-white` : `bg-white`
                      }  flex items-center justify-center px-3 h-8 leading-tight text-mainColor border border-gray-300 hover:bg-mainColor hover:text-white  `}
                    >
                      {el}
                    </a>
                  </li>
                );
              })}

              <li onClick={nextPage}>
                <a
                  className={`flex items-center justify-center px-3 h-8 leading-tight cursor-pointer  text-mainColor bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-opacity-50 `}
                >
                  <span className="sr-only">Next</span>
                  <svg
                    class="w-2.5 h-2.5 rtl:rotate-180"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 6 10"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m1 9 4-4-4-4"
                    />
                  </svg>
                </a>
              </li>
            </ul>
          </nav>
        </>
      )}
    </>
  );
}
