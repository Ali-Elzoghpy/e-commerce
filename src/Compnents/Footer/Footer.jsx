import React from "react";

export default function Footer() {
  return (
    <div className="bg-[#F6F7F7] border-t-2 mt-5   shadow-lg p-3">
    <div className="container mx-auto  w-[70%] md:w-[50%]">
      <div className="flex justify-between">
        {" "}
        <h1>Made by <span className="text-mainColor">Ali Elzoghpy</span></h1>
        <p>
          <i class="fa-brands cursor-pointer fa-github "></i>
          <i class="fa-brands cursor-pointer fa-facebook  mx-3"></i>
          <i class="fa-brands cursor-pointer fa-instagram me-3"></i>
          <i class="fa-solid cursor-pointer fa-envelope"></i>
        </p>{" "}
      </div>{" "}
    </div>
    </div>
  );
}
