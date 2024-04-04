"use client";
import { useEffect } from "react";
import { HiArrowUp } from "react-icons/hi";
import { HiArrowDown } from "react-icons/hi";
import { HiArrowRight } from "react-icons/hi";
import { HiArrowLeft } from "react-icons/hi";

import Maze from "@/controller/Maze";

export default function Game() {
  useEffect(() => {
    const canvas = document.querySelector("canvas");
    let c = canvas.getContext("2d");
    let current;

    let maze = new Maze(400, 10, 10, current, canvas, c);

    maze.setup();
    maze.draw();
    console.log(maze.grid);
  });

  return (
    <div
      id="container"
      className=" bg-[#222] grid grid-rows-2"
    >
      <div className="mbox">
        <div className="bg-[#222] flex items-center justify-center h-[100hv] overflow-hidden pt-2 pb-2">
          <canvas></canvas>
        </div>
      </div>
      <div id="controls" className="h-[50%] bg-[#222] grid">
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
