"use client";
import React from "react";
import BottomMenu from "./bottomMenu";
import CommunityHeader from "../communityHeader";

import QuestionBox from "./questionBox";

export default function Page() {
  return (
    <div className="h-auto min-h-[53vh] flex flex-col items-center pb-[5rem]">
      <div className="fixed flex justify-center top-0 w-full z-50">
        <CommunityHeader />
      </div>
      <QuestionBox />
      <BottomMenu />
    </div>
  );
}
