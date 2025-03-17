import React from "react";
import { Navigate } from "react-router-dom";
import Login from './../Login/Login';

export default function ProutectedRoute(props) {


if(localStorage.getItem("token")){
    return props.children
}else{
     return <Navigate to="/Login" /> 
}

  return
   <></>
}
