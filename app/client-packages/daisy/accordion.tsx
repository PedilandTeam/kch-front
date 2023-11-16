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
      <div className="collapse collapse-arrow bg-black-200 visible">
        <input type="radio" name="my-accordion-2" checked={checked} />
        <div className="visible collapse-title text-xl font-medium select-none py-6 px-5 sm:px-8">
          {title}
        </div>
        <div className="collapse-content select-none px-5 sm:px-8">
          <div>{content}</div>
        </div>
      </div>
    </div>
  );
}
