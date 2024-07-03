"use client";
import React from "react";
import BottomMenu from "./bottomMenu";
import CommunityHeader from "./communityHeader";

import QuestionBox from "./questionCard";

export default function Page() {
  return (
    <div className="h-auto min-h-[53vh] flex flex-col items-center ">
      <div className="fixed top-0 z-50 flex justify-center w-full">
        <CommunityHeader />
      </div>
      <div className="mt-[9rem]">
        {" "}
        <QuestionBox />
        <QuestionBox />
        <QuestionBox />
      </div>

      <BottomMenu />
    </div>
  );
}
