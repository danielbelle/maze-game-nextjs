import React, { Component } from "react";
import Cell from "./Cell";

export class Maze extends Component {
  constructor(size, rows, columns, current, canvas, c) {
    super();
    this.size = size;
    this.rows = rows;
    this.cols = columns;
    this.grid = [];
    this.stack = [];
    this.current = current;
    this.canvas = canvas;
    this.c = c;
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
          c,
          this.c
        );
        row.push(cell);
      }
      this.grid.push(row);
    }
    this.current = this.grid[0][0];
  }

  draw() {
    this.canvas.width = this.size;
    this.canvas.height = this.size;
    this.canvas.style.background = "#222";

    this.grid.forEach((row) => {
      row.forEach((cell) => cell.show());
    });

    this.DFSMaze();

    requestAnimationFrame(() => {
      this.draw();
    });
  }

  DFSMaze() {
    this.current.visited = true;
    let next = this.current.getRandNeighbours();
    if (next) {
      next.visited = true;
      this.stack.push(this.current);
      this.current.color = "green";
      this.current.highlight();
      this.current.removeWalls(this.current, next);
      this.current = next;
    } else if (this.stack.length > 0) {
      this.current.color = "#222";
      let cell = this.stack.pop();
      this.current.highlight();
      this.current = cell;
    }

    if (this.stack.length == 0) {
      return;
    }
  }

  render() {
    return <></>;
  }
}

export default Maze;
