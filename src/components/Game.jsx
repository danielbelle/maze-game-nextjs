import { HiArrowUp } from "react-icons/hi";
import { HiArrowDown } from "react-icons/hi";
import { HiArrowRight } from "react-icons/hi";
import { HiArrowLeft } from "react-icons/hi";

export default function Game() {
  return (
    <div
      id="container"
      className="absolute top-0 left-0 right-0 bottom-0 bg-[#222] grid grid-rows-2"
    >
      <div className="mbox">
        <div
          id="maze"
          className="absolute w-[340px] h-[240px] top-[30vh] left-[50%] translate-x-[-50%] translate-y-[-50%]"
        >
          <div id="thingie">
            <div
              className="absolute top-[4px] left-[1px] size-[13px] rounded-[20px] font-[15px] leading-[15px] text-left"
              id="emo"
            >
              🥺
            </div>
          </div>
          <div
            className="absolute top-[100px] left-[100px] size-[20px] rounded-[20px]"
            id="home"
          >
            <div className="emo">🏠</div>
          </div>
          <div
            className="absolute bg-white top-[20px] left-[20px] w-[300px] h-[2px]"
            id="top-barrier"
          ></div>
          <div
            className="absolute bg-white top-[220px] left-[20px] w-[302px] h-[2px]"
            id="bottom-barrier"
          ></div>
        </div>
      </div>
      <div id="controls" className="h-[100%] bg-[#222] grid">
        <div
          id="buttons"
          className="w-[210px] h-[140px] bg-[#222] self-center justify-self-center grid grid-rows-2 grid-cols-3"
        >
          <button
            className="size-[60px] border-solid rounded-[8px] border-white border-b self-center justify-self-center cursor-pointer border-[2px] grid items-center justify-center text-center col-span-3 active:scale-100 focus:outline-none"
            id="btn-bu"
          >
            <div
              className="self-center size-[20px]justify-self-center font-[20px] leading-5 text-center text-white"
              id="chevron"
            >
              <HiArrowUp />
            </div>
          </button>

          <button
            className="size-[60px] border-solid rounded-[8px] border-white border-b self-center justify-self-center cursor-pointer border-[2px] grid items-center justify-center text-center row-start-2 active:scale-100 focus:outline-none"
            id="btn-bd"
          >
            <div
              className="self-center size-[20px]justify-self-center font-[20px] leading-5 text-center text-white"
              id="chevron"
            >
              <HiArrowLeft />
            </div>
          </button>
          <button
            className="size-[60px] border-solid rounded-[8px] border-white border-b self-center justify-self-center cursor-pointer border-[2px] grid items-center justify-center text-center row-start-2 active:scale-100 focus:outline-none"
            id="btn-bl"
          >
            <div
              className="self-center size-[20px]justify-self-center font-[20px] leading-5 text-center text-white"
              id="chevron"
            >
              <HiArrowDown />
            </div>
          </button>
          <button
            className="size-[60px] border-solid rounded-[8px] border-white border-b self-center justify-self-center cursor-pointer border-[2px] grid items-center justify-center text-center row-start-2 active:scale-100 focus:outline-none"
            id="btn-br"
          >
            <div
              className="self-center size-[20px]justify-self-center font-[20px] leading-5 text-center text-white"
              id="chevron"
            >
              <HiArrowRight />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
