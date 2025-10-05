import { cn } from "@/lib/utils";
import type { FC } from "react";
import sanitizeHtml from "sanitize-html";

interface RichText {
  html: string;
  className?: string;
}

export const RichText: FC<RichText> = ({ html, className }) => {
  const cleanHtml = sanitizeHtml(html, {
    allowedTags: ["p", "strong", "ol", "ul", "li"],
    allowedAttributes: {
      ol: ["class"],
      ul: ["class"],
    },
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
      className={cn(className, "list-inside list-disc")}
      dangerouslySetInnerHTML={{ __html: cleanHtml }}
    ></div>
  );
};
