"use client";
import React from "react";
import BottomMenu from "./bottomMenu";
import CommunityHeader from "./communityHeader";

import QuestionCard from "./questionCard";

export default function Page({ params }: { params: { countryOrSlug: string }}) {
  
  return (
    <div className="h-auto min-h-[53vh] flex flex-col items-center ">
      <div className="fixed top-0 z-50 flex justify-center w-full">
        <CommunityHeader />
      </div>
      <div className="mt-[9rem]">
        <QuestionCard  params={params}/>
        <QuestionCard params={params} />
        <QuestionCard  params={params}/>
      </div>

      <BottomMenu />
    </div>
  );
}
