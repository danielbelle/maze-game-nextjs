import React, { Component } from "react";

export class Cell extends Component {
  constructor(parentSize, parentGrid, rows, cols, rowNum, colNum, c) {
    super();
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
    this.color = "#222";
    this.c = c;
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
    this.c.lineWidth = 2;
    this.c.strokeStyle = "white";
    this.c.beginPath();
    this.c.moveTo(fromX, fromY);
    this.c.lineTo(toX, toY);
    this.c.stroke();
  }

  highlight() {
    this.c.fillStyle = "red";
    this.c.fillRect(
      this.colNum * this.size + 1,
      this.rowNum * this.size + 1,
      this.size - 2,
      this.size - 2
    );
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
    if (this.visited) {
      this.c.fillStyle = this.color;
      this.c.fillRect(
        this.colNum * this.size + 1,
        this.rowNum * this.size + 1,
        this.size - 2,
        this.size - 2
      );
    }
  }

  render() {
    return <></>;
  }
}

export default Cell;
