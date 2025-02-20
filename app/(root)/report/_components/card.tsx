import React from "react";

function Card() {
  return (
    <div className="flex flex-col justify-center items-center gap-10 bg-white dark:bg-white/5 dark:border rounded-3xl shadow-lg p-7">
      <div className="flex items-center gap-5">
        <p className="text-softGray">کۆی گشتی</p>
        <div className="rounded-full px-4 py-2 bg-blueSoft text-blue">کڕین</div>
      </div>
      <div className="flex gap-3 items-center ">
        <div className="flex flex-col items-center gap-2 ">
          <p className="text-softGray">کاش</p>
          <span>100,0000</span>
        </div>
        <div className="w-[1px] h-full bg-border rounded-full"></div>
        <div className="flex flex-col items-center gap-2 ">
          <p className="text-softGray">قەرز</p>
          <span>200,0000</span>
        </div>
        <div className="w-[1px] h-full bg-border rounded-full"></div>
        <div className="flex flex-col items-center gap-2 ">
          <p className="text-softGray"> گشتی</p>
          <span>400,0000</span>
        </div>
      </div>
    </div>
  );
}

export default Card;
