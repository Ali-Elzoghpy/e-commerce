import axios from "axios";
import { jwtDecode } from "jwt-decode";
import React, { createContext,  useEffect, useState } from "react";
export let contextAuth = createContext();
export default function AuthContextProvider(props) {
  let [token, setToken] = useState(null);
  const [tokenDecode, setTokenDecode] = useState(null);

  useEffect(() => {
    let tokenStorege = localStorage.getItem("token");
    if (tokenStorege) {
      setToken(tokenStorege);
    }
  }, []);

  return (
    <>
      <contextAuth.Provider
        value={{ token, setToken, tokenDecode, setTokenDecode }}
      >
        {props.children}
      </contextAuth.Provider>
    </>
  );
}
