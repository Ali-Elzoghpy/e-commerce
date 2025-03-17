import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { wishListContext } from "../Context/WishLIstContextProvider";
import { Link } from "react-router-dom";
import { cartContext } from "../Context/CartContext";
import { toast, ToastContainer } from "react-toastify";

export default function Proudcts() {
  let [proudct, setProudct] = useState(null);
  const [cartLoad, setCartLoader] = useState(null);
  const [Loader, setLoader] = useState(null);
    const [userValue, setUserValue] = useState("");
  

  let { addTocart  ,getcartNumber } = useContext(cartContext);

  let { wishIcon, setWishIcon, clearYourWish, addYourWish ,getWishNumber } =
    useContext(wishListContext);
  function apiCall() {
    setLoader(true);
    axios
      .get("https://ecommerce.routemisr.com/api/v1/products")
      .then((res) => {
        console.log(res.data.data);
        setProudct(res.data.data);
        getcartNumber()
        getWishNumber()
      })
      .catch((err) => {})
      .finally(() => {
        setLoader(false);
      });
  }
  function addData(id) {
    setCartLoader(true);
    addTocart(id)
      .then((res) => {
        setCartLoader(false);
        getcartNumber()

        toast.success(res.data.message);
      })
      .catch((res) => {
        setCartLoader(false);

        toast.error(res.data.message);
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
          toast.success(res.data.message);
          getWishNumber()

        })
        .catch((res) => {
          toast.error(res);
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
          toast.success(res.data.message);
          getWishNumber()

        })
        .catch((res) => {
          toast.error(res.data.message);
        });
    }
  }
  useEffect(() => {
    const savedWishlist = JSON.parse(localStorage.getItem("wishlist")) || {};
    setWishIcon(savedWishlist);
    apiCall();
  }, []);
  function handelUserSearsh(e) {
    const userWords = e.target.value;
    setUserValue(userWords);

  }
    function highlightText(text, query) {
      if (!query) return text;
      const parts = text.split(new RegExp(`(${query})`, "gi"));
      console.log(parts)
      return parts.map((part, i) =>
        part.toLowerCase() === query.toLowerCase() ? (
          <span key={i} className="bg-mainColor text-white">{part}</span>
        ) : (
          part
        )
      );
    }

  return (
     <>
       <ToastContainer />
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
             {proudct?.map((proudect) => {
 
               return (<>
             {proudect.title.toLowerCase().includes(userValue.toLowerCase()) == true ? <div
                   key={proudect._id}
                   className="lg:w-2/12 w-full p-2 group  overflow-hidden   "
                 >
                   <div className="hover:border rounded-md  border relative border-transparent hover:border-mainColor p-1 duration-500  ">
                     <span
                       id={proudect._id}
                       onClick={() => {
                         chekList(proudect._id);
                       }}
                       className="absolute right-4 text-mainColor cursor-pointer  "
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
                         className="w-full h-52 object-top object-contain"
                         alt=""
                       />
                       <div className="my-6">
                         {" "}
                         <h3 className="text-mainColor">
                           {proudect.category.name}
                         </h3>
                         <h2 className="text-lg" id="highLight">
                           {highlightText(proudect.title.split(" ").slice(0,2).join(" "), userValue)} 
                         </h2>
                       </div>
                       <div className="row justify-between ">
                         <div className="w-5/12">{proudect.price}EGP</div>
                         <div className="w-3/12">
                           <i className="fa-solid fa-star text-yellow-500"> </i>
                           {proudect.ratingsAverage}
                         </div>
                       </div>
                     </Link>
                     <button
                       onClick={() => addData(proudect._id)}
                       className="w-full bg-mainColor text-white rounded-lg py-3 hover:bg-opacity-70 mt-3 translate-y-20  group-hover:translate-y-0 duration-500"
                     >
                       {cartLoad ? (
                         <span class="loader1 "></span>
                       ) : (
                         <span>
                           Add To Cart <i class="fa-solid fa-cart-plus"></i>
                         </span>
                       )}
                     </button>
                   </div>
                 </div> : "" }
                
                 </> );
             })}
           </div>
    
         </>
       )}
     </>
   );
 }

