import axios from "axios";
import React, { createContext, useState } from "react";
export let wishListContext = createContext();
export default function WishLIstContextProvider({ children }) {
  const [wishList, setWishList] = useState(false);
  let [wishIcon, setWishIcon] = useState([{}]);
  const [getWishsNumber, setgetWishsNumber] = useState(null);

  const header = {
    token: localStorage.getItem("token"),
  };
  const baseUrl = `https://ecommerce.routemisr.com`;

  function wishListHandel() {
    setWishList(!wishList);
  }
  function addYourWish(id) {
    const data = {
      productId: id,
    };
    return axios.post(`${baseUrl}/api/v1/wishlist`, data, {
      headers: header,
    });
  }

  function clearYourWish(id) {
    return axios.delete(`${baseUrl}/api/v1/wishlist/${id}`, {
      headers: header,
    });
  }

  function getWishList() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
      headers: header,
    });
  }
  function getWishNumber() {
    getWishList()
      .then((res) => {
        setgetWishsNumber(res.data);
      })
      .catch((res) => {});
  }
  return (
    <>
      <wishListContext.Provider
        value={{
          wishListHandel,
          wishList,
          addYourWish,
          clearYourWish,
          getWishList,
          wishIcon,
          setWishIcon,
          getWishsNumber,
          getWishNumber,
        }}
      >
        {children}
      </wishListContext.Provider>
    </>
  );
}
