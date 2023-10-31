import React, { useRef } from "react";
import { BiCheck } from "react-icons/bi";

const Preview = ({ imageUrl }) => {
  const aniRef = useRef(null);
  return (
    <div className="flex flex-col gap-3 rounded-xl shadow-[0px_4px_12px_rgba(0,0,0,0.1)] items-center px-6 py-8 font-medium max-w-[400px]">
      <div className="flex flex-col justify-center items-center gap-3">
        <div className="rounded-full bg-green-600">
          <BiCheck color="white" size={28} />
        </div>
        <h2>Uploaded Successfully!</h2>
      </div>
      <div className="rounded-xl overflow-hidden">
        <img
          src={imageUrl}
          alt={imageUrl}
          height={208}
          width={338}
          className="object-contain max-h-[208px] max-w-[338px]"
        />
      </div>

      <div className="flex text-[10px] gap-3 rounded-lg bg-[#F6F8FB] border border-[#E0E0E0] p-px items-center max-w-[338px]">
        <p className="flex-grow px-1 text-[#4F4F4F] truncate">{imageUrl}</p>
        <div className="relative ">
          
          <button
            className="w-fit bg-blue-500 border h-full px-3 py-1.5 rounded-lg border-none text-white cursor-pointer whitespace-nowrap relative"
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(imageUrl);
                aniRef.current.classList.add("show");
                setTimeout(() => {
                  aniRef.current.classList.remove("show");
                }, 1000);
              } catch (error) {
                console.log("error in copy url", error);
              }
            }}
          >
            Copy Link
          </button>
          <div
            className=" absolute w-fit bg-green-600 border h-full px-3 py-1.5 rounded-full text-white left-1/2 -top-1 -translate-x-1/2 -translate-y-full opacity-0 "
            ref={aniRef}
          >
            Copied
          </div>
        </div>
      </div>
    </div>
  );
};
//
export default Preview;
