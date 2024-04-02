"use client";
import { useEffect } from "react";
import { HiArrowUp } from "react-icons/hi";
import { HiArrowDown } from "react-icons/hi";
import { HiArrowRight } from "react-icons/hi";
import { HiArrowLeft } from "react-icons/hi";

export default function Game() {
  useEffect(() => {
    const canvas = document.querySelector("canvas");
    let c = canvas.getContext("2d");

    let current;

    class Maze {
      constructor(size, rows, columns) {
        this.size = size;
        this.rows = rows;
        this.cols = columns;
        this.grid = [];
        this.stack = [];
      }

      setup() {
        for (let r = 0; r < this.rows; r++) {
          let row = [];
          for (let c = 0; c < this.cols; c++) {
            let cell = new Cell(
              this.size,
              this.grid,
              this.rows,
              this.cols,
              r,
              c
            );
            row.push(cell);
          }
          this.grid.push(row);
        }
        current = this.grid[0][0];
      }

      draw() {
        canvas.width = this.size;
        canvas.height = this.size;
        canvas.style.background = "black";

        this.grid.forEach((row) => {
          row.forEach((cell) => cell.show());
        });

        this.DFSMaze();

        requestAnimationFrame(() => {
          this.draw();
        });
      }

      DFSMaze() {
        current.visited = true;
        let next = current.getRandNeighbours();
        if (next) {
          next.visited = true;
          this.stack.push(current);
          current.removeWalls(current, next);
          current = next;
        } else if (this.stack.length > 0) {
          let cell = this.stack.pop();
          current = cell;
        }

        if (this.stack.length == 0) {
          return;
        }
      }
    }

    class Cell {
      constructor(parentSize, parentGrid, rows, cols, rowNum, colNum) {
        this.parentSize = parentSize;
        this.parentGrid = parentGrid;
        this.rows = rows;
        this.cols = cols;
        this.rowNum = rowNum;
        this.colNum = colNum;
        this.size = parentSize / rows;
        this.walls = {
          topWall: true,
          bottomWall: true,
          leftWall: true,
          rightWall: true,
        };
        this.visited = false;
        this.neighbours = [];
      }

      setNeighbours() {
        this.neighbours = [];
        let x = this.colNum;
        let y = this.rowNum;
        let left = this.colNum !== 0 ? this.parentGrid[y][x - 1] : undefined;
        let right =
          this.colNum !== this.cols - 1 ? this.parentGrid[y][x + 1] : undefined;
        let top = this.rowNum !== 0 ? this.parentGrid[y - 1][x] : undefined;
        let bottom =
          this.rowNum !== this.rows - 1 ? this.parentGrid[y + 1][x] : undefined;

        if (left && !left.visited) this.neighbours.push(left);
        if (right && !right.visited) this.neighbours.push(right);
        if (top && !top.visited) this.neighbours.push(top);
        if (bottom && !bottom.visited) this.neighbours.push(bottom);
      }

      getRandNeighbours() {
        this.setNeighbours();
        if (this.neighbours.length == 0) return;
        let rand = Math.floor(Math.random() * this.neighbours.length);
        return this.neighbours[rand];
      }

      drawLine(fromX, fromY, toX, toY) {
        c.lineWidth = 2;
        c.strokeStyle = "white";
        c.beginPath();
        c.moveTo(fromX, fromY);
        c.lineTo(toX, toY);
        c.stroke();
      }

      removeWalls(cell1, cell2) {
        let XDiff = cell2.colNum - cell1.colNum;
        if (XDiff == 1) {
          cell1.walls.rightWall = false;
          cell2.walls.leftWall = false;
        } else if (XDiff == -1) {
          cell2.walls.rightWall = false;
          cell1.walls.leftWall = false;
        }

        let YDiff = cell2.rowNum - cell1.rowNum;
        if (YDiff == 1) {
          cell1.walls.bottomWall = false;
          cell2.walls.topWall = false;
        } else if (YDiff == -1) {
          cell2.walls.bottomWall = false;
          cell1.walls.topWall = false;
        }
      }

      drawWalls() {
        let fromX = 0;
        let fromY = 0;
        let toX = 0;
        let toY = 0;

        if (this.walls.topWall) {
          fromX = this.colNum * this.size;
          fromY = this.rowNum * this.size;
          toX = fromX + this.size;
          toY = fromY;
          this.drawLine(fromX, fromY, toX, toY);
        }

        if (this.walls.bottomWall) {
          fromX = this.colNum * this.size;
          fromY = this.rowNum * this.size + this.size;
          toX = fromX + this.size;
          toY = fromY;
          this.drawLine(fromX, fromY, toX, toY);
        }

        if (this.walls.leftWall) {
          fromX = this.colNum * this.size;
          fromY = this.rowNum * this.size;
          toX = fromX;
          toY = fromY + this.size;
          this.drawLine(fromX, fromY, toX, toY);
        }

        if (this.walls.rightWall) {
          fromX = this.colNum * this.size + this.size;
          fromY = this.rowNum * this.size;
          toX = fromX;
          toY = fromY + this.size;
          this.drawLine(fromX, fromY, toX, toY);
        }
      }

      show() {
        this.drawWalls();
      }
    }

    let maze = new Maze(500, 10, 10);
    maze.setup();
    maze.draw();
    console.log(maze.grid);
  });

  return (
    <div className="bg-black flex items-center justify-center h-[100hv] overflow-hidden pt-10 pb-10">
      <canvas></canvas>
    </div>

    /**
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
    </div> */
  );
}
