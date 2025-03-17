import axios from "axios";
import React, { createContext, useState } from "react";
export let cartContext = createContext();
export default function CartContextProvider(props) {
  let [numberOfCart, setNumberOfCart] = useState(0);
  const [getCartNum, setCartNum] = useState(null);

  let header = {
    token: localStorage.getItem("token"),
  };
  const baseUrl = `https://ecommerce.routemisr.com/api/v1/cart`;

  function addTocart(id) {
    let data = {
      productId: id,
    };
    console.log(numberOfCart);
    return axios.post(baseUrl, data, {
      headers: header,
    });
  }
  function getCartData() {
    return axios.get(baseUrl, {
      headers: header,
    });
  }
  function updateCart(count, id) {
    return axios.put(
      `${baseUrl}/${id}`,
      {
        count: count,
      },
      { headers: header }
    );
  }
  function deleteSpacificItem(id) {
    return axios.delete(`${baseUrl}/${id}`, {
      headers: header,
    });
  }
  function deletAllCart() {
    return axios.delete(baseUrl, {
      headers: header,
    });
  }
  function getcartNumber() {
    getCartData()
      .then((res) => {
        setCartNum(res.data.numOfCartItems);
      })
      .catch((res) => {});
  }

  return (
    <>
      <cartContext.Provider
        value={{
          addTocart,
          getCartData,
          setNumberOfCart,
          numberOfCart,
          updateCart,
          deleteSpacificItem,
          deletAllCart,
          getcartNumber,
          getCartNum,
        }}
      >
        {props.children}
      </cartContext.Provider>
    </>
  );
}
