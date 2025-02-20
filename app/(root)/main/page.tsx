import TitlePage from "@/components/layout/title-page";
import React, { Suspense } from "react";
import FeedCard from "./_components/feed-card";
import DollarChanger from "@/components/reusable/dollar-changer";
import Card from "./_components/card";

async function MainPage() {
  return (
    <div className="">
      <div className="flex justify-between items-center mb-5">
        <TitlePage text="سەرەکی" />
        <DollarChanger />
      </div>
      <Suspense
        fallback={
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-10">
            <Card />
          </div>
        }
      >
        <FeedCard />
      </Suspense>
    </div>
  );
}

export default MainPage;
