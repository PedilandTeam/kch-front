import React from "react";

interface SpinnerBtnProps {
  text: string;
}

const SpinnerBtn: React.FC<SpinnerBtnProps> = ({ text }) => {
  return (
    <div className="flex gap-1">
      <p>{text}</p>
      <span className="loading loading-dots loading-xs"></span>
    </div>
  );
};

export default SpinnerBtn;
