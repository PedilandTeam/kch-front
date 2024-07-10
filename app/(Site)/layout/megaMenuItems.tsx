import React from 'react';

export default function MegaMenuItems({ showMegaMenu }: { showMegaMenu: boolean }) {
  return (
    <>
      {showMegaMenu && (
        <div className="bg-blue-50 py-4 px-4 gap-4 rounded-md h-[50%] z-50 w-[42%] absolute top-20 flex">
          <div className="flex-1 bg-blue-100 break-words p-2">
            This is some text that might be too long for the width of this column. It should wrap to the next line if it exceeds the width.
          </div>
          <div className="flex-1 bg-blue-100 break-words p-2">
            This is some more text that could potentially be very long and should also wrap to the next line as needed.
          </div>
          <div className="flex-1 flex items-end break-words ">
            <div className="bg-blue-100 h-3/5 w-full p-2">
              This is the third column. Any text here will also wrap to the next line if it is too long to fit within the column's width.
            </div>
          </div>
        </div>
      )}
    </>
  );
}
