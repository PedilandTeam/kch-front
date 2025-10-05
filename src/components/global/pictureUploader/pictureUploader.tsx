"use client";
import useAdPicture from "@/store/useAdPicture";
import { PlusIcon } from "@phosphor-icons/react";

export default function PictureUploader() {
  const { addPicture } = useAdPicture();

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const files = Array.from(e.target.files); // Accept multiple files
    if (files.length === 0) return;

    files.forEach((file) => {
      const fileReader = new FileReader();
      fileReader.readAsBinaryString(file);
      fileReader.onload = (event: ProgressEvent<FileReader>) => {
        const blob = new Blob([event.target?.result as BlobPart], {
          type: file.type,
        });
        addPicture(blob, file);
      };
    });

    e.target.value = ""; // Clear input value after processing files
  };

  return (
    <>
      <label
        htmlFor="newpic"
        className="flex h-28 w-28 items-center justify-center rounded-xl border-2 border-dotted"
      >
        <PlusIcon className="text-primary h-12 w-12" />
      </label>
      <input
        onChange={onFileChange}
        accept=".jpg, .jpeg, .png, .webp"
        id="newpic"
        type="file"
        className="hidden"
        multiple
        max={process.env.NEXT_PUBLIC_MAX_FILE_ACCEPT}
      />
    </>
  );
}
