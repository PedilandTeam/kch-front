import { cn } from "@/lib/utils";
import type { FC } from "react";
import sanitizeHtml from "sanitize-html";

interface RichTextProps {
  html: string;
  className?: string;
}

export const RichText: FC<RichTextProps> = ({ html, className }) => {
  const cleanHtml = sanitizeHtml(html, {
    allowedTags: ["p", "strong", "ol", "ul", "li"],
    allowedAttributes: {
      ol: ["class"],
      ul: ["class"],
      p: ["class"],
      strong: ["class"],
    },
    transformTags: {
      ul: (_tagName, attribs) => ({
        tagName: "ul",
        attribs: {
          class: cn("list-disc list-inside", attribs.class),
        },
      }),
      ol: (_tagName, attribs) => ({
        tagName: "ol",
        attribs: {
          class: cn("list-decimal list-inside", attribs.class),
        },
      }),
      strong: (_tagName, attribs) => ({
        tagName: "strong",
        attribs: {
          class: cn("font-semibold", attribs.class),
        },
      }),
    },
  });

  return (
    <div
      className={cn("space-y-2 text-[15px]", className)}
      dangerouslySetInnerHTML={{ __html: cleanHtml }}
    />
  );
};
