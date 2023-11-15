import { useState } from "react"


type Accordion = {
    title: string;
    content: string;
    className?: string;
}
export default function Accordion({title, content, className}: Accordion) {


    const [checked, setChecked] = useState(false)

    return (
        <div className={`${className}`} onClick={() => setChecked(old => !old)}>
            <div className="collapse collapse-arrow bg-black-200 visible">
                <input type="radio" name="my-accordion-2" checked={checked} />
                <div className="visible collapse-title text-xl font-medium select-none">
                    {title}
                </div>
                <div className="collapse-content select-none">
                    <p>{content}</p>
                </div>
            </div>
        </div>
    )

}