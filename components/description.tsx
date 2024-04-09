import { FC } from "react";
import sanitizeHtml from "sanitize-html";

type Description = {
  html: string;
  className: string;
};
const Description: FC<Description> = ({ html, className }) => {
  // Define the allowed tags and attributes
  const cleanHtml = sanitizeHtml(html, {
    allowedTags: ["p", "strong", "ol", "ul", "li"],
    allowedAttributes: {
        ol: ['class'],
        ul: ['class']
    }, // No attributes allowed for simplicity; customize as needed
    transformTags: {
      ul: (tagName, attribs) => {
        return {
          tagName: "ul",
          attribs: {
            class: "list-disc list-inside",
          },
        };
      },
      ol: (tagName, attribs) => {
        return {
          tagName: "ol",
          attribs: {
            class: "list-decimal list-inside",
          },
        };
      },
    },
  });

  return (
    <div
      className={`${className} list-disc list-inside`}
      dangerouslySetInnerHTML={{ __html: cleanHtml }}
    ></div>
  );
};

export default Description;
