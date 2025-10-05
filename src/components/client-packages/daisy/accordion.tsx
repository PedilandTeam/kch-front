"use client";

import { useState } from "react";

type Accordion = {
  title: string;
  content: string;
  className?: string;
};
export default function Accordion({ title, content, className }: Accordion) {
  const [checked, setChecked] = useState(false);

  return (
    <div className={`${className}`} onClick={() => setChecked((old) => !old)}>
      <div className="collapse-arrow bg-black-200 collapse visible">
        <input type="radio" name="my-accordion-2" checked={checked} />
        <div className="collapse-title visible px-5 py-6 text-xl font-medium select-none sm:px-8">
          {title}
        </div>
        <div className="collapse-content px-5 select-none sm:px-8">
          <div>{content}</div>
        </div>
      </div>
    </div>
  );
}
