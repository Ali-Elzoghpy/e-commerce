import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Proudcts() {
  let [proudct, setProudct] = useState(null);
  function apiCall() {
    axios
      .get("https://ecommerce.routemisr.com/api/v1/products")
      .then((res) => {
        console.log(res.data.data)
        setProudct(res.data.data);
      })
      .catch((err) => {});
  }
  useEffect(() => {
    apiCall();
  }, []);

//   return (
//     <div className="container mx-auto w-11/12">
//       <div className="flex flex-wrap"> 
//       {proudct?.map((proudct) => {
        
//         return     <div className="w-6/12">
       
// <img src={proudct.imageCover} alt="" className="w-full" />
// <h3> title </h3>
// <button> Add to cart </button>


//         </div>
//       })}
//               </div>;

//     </div>
//   );
}
