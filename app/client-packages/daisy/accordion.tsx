import { useState } from 'react';

type Accordion = {
  title: string;
  content: string;
  className?: string;
};
export default function Accordion({ title, content, className }: Accordion) {
  const [checked, setChecked] = useState(false);

  return (
    <div className={`${className}`} onClick={() => setChecked((old) => !old)}>
      <div className='bg-black-200 collapse collapse-arrow visible'>
        <input type='radio' name='my-accordion-2' checked={checked} />
        <div className='collapse-title visible select-none px-5 py-6 text-xl font-medium sm:px-8'>
          {title}
        </div>
        <div className='collapse-content select-none px-5 sm:px-8'>
          <div>{content}</div>
        </div>
      </div>
    </div>
  );
}
