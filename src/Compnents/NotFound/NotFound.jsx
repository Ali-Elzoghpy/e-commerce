import React from "react";
import not from "../../assets/error.svg";
import { Link } from "react-router-dom";
import { Helmet } from 'react-helmet';
export default function NotFound() {
  return (<>
    <Helmet>
    <meta charSet="utf-8" />
    <title>Not Found</title>
    <link rel="canonical" href="http://mysite.com/example" />
</Helmet>
    <div className="h-screen flex flex-col items-center justify-center ">
      {" "}
      <img src={not} className="w-6/12" alt="" />
      <div>
        {" "}
        <Link to="/"  className="text-mainColor" > back to home..? </Link>
      </div>
    </div>
    </>

  );
}
