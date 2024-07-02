"use client";
import React from "react";
import BottomMenu from "./bottomMenu";
import CommunityHeader from "./communityHeader";

import QuestionBox from "./questionBox";

export default function Page() {
  return (
    <div className="h-auto min-h-[53vh] flex flex-col items-center pb-[5rem]">
      <div className="fixed top-0 z-50 flex justify-center w-full">
        <CommunityHeader />
      </div>
      <QuestionBox />
      <BottomMenu />
    </div>
  );
}
