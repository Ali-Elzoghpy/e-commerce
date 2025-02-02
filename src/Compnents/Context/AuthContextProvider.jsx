import React, { createContext, useEffect, useState } from "react";
  export let contextAuth = createContext();
export default function AuthContextProvider(props) {
  let [token, setToken] = useState(null);
useEffect(()=>{
let tokenStorege = localStorage.getItem("token")
  if(tokenStorege){
    setToken(tokenStorege)
  }
})
  return (
    <>
      <contextAuth.Provider value={{ token, setToken, }}>
        {props.children}
      </contextAuth.Provider>
    </>
  );
}
