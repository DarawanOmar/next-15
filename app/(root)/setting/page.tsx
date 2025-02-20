import TitlePage from "@/components/layout/title-page";
import React from "react";
import Card from "./_components/card";
import UserAvatar from "./_components/user-avatr";
import DollarChanger from "@/components/reusable/dollar-changer";

function SettingPage() {
  return (
    <div>
      <div className="flex justify-between items-center mb-5">
        <TitlePage text="رێکخستنەکان" />
        <div className="flex items-center gap-3">
          <UserAvatar />
          <DollarChanger />
        </div>{" "}
      </div>
      <div className="my-10">
        <Card />
      </div>
    </div>
  );
}

export default SettingPage;
