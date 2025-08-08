import React from "react";

function SkeletonQuestionCard() {
  return (
    <div className="bg-blue-50 mb-4 rounded-lg w-full px-4 py-4">
      <div className="flex w-full flex-col gap-4 mb-4">
        <div className="flex items-center gap-4">
          <div className="skeleton h-14 w-16 shrink-0 rounded-full"></div>
          <div className="flex w-full justify-between items-center">
            <div className="flex flex-col gap-4">
              <div className="skeleton h-4 w-20"></div>
              <div className="skeleton h-4 w-28"></div>
            </div>
            <div className="skeleton h-4 w-20"></div>
          </div>
        </div>
        <div className="skeleton h-32 w-full"></div>
      </div>
    </div>
  );
}

export default SkeletonQuestionCard;
