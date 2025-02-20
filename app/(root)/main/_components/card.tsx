import { DownArrow } from "@/public/icons";
import React from "react";

function Card() {
  return Array.from({ length: 3 }).map((_, index) => (
    <div
      key={index}
      className="grid gap-3 bg-background p-5 rounded-3xl drop-shadow-xl border hover:scale-105 transition-all duration-500 cursor-pointer animate-pulse "
    >
      <div className="flex gap-3 items-center">
        <div className={`p-2 rounded-lg h-5 `}></div>
        <p className="text-softGray text-lg h-3"></p>
      </div>
      <div className="h-8 flex font-sirwan_meduim text-3xl gap-1"></div>
      <div className="flex gap-2 text-sm ">
        <DownArrow />
        <span className="h-10"></span>
        <p className="text-softGray">بەراورد بە دوێنێ</p>
      </div>
    </div>
  ));
}

export default Card;
