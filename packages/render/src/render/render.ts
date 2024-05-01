import { fabric } from "fabric";
import {
  createStaticCanvas,
  createCanvas,
  createGroup,
  createRect,
  createLine,
  createText,
  createTextbox,
} from "../shared";

import type {
  StaticCanvas,
  Canvas,
  Group,
  Rect,
  Line,
  Text,
  Textbox,
} from "../shared";
import { mergeCell } from "../utils";

export class Table {
  private canvas: Canvas;
  private cellWidth: number;
  private cellHeight: number;
  private row: number;
  private col: number;
  private cellLines: Line[] = [];
  private mergeGroup: Group[] = [];
  constructor(row: number, col: number, container: string) {
    this.canvas = createCanvas(container);
    this.cellWidth = 120;
    this.cellHeight = 40;
    this.row = row;
    this.col = col;
    this.canvas.selection = true;
    // 监听 'selection:created' 和 'selection:updated' 事件
    this.canvas.on("selection:created", (e) => {
      console.log(e);
      
      //@ts-ignore
      e.target.set({ fill: "#f00" }); // 设置选中颜色
      this.canvas.renderAll();
    });

    this.canvas.on("selection:updated", (e) => {
      console.log(e.target);
      //@ts-ignore
      e.target.set({ fill: "#f00" }); // 设置选中颜色
      this.canvas.renderAll();
    });

    // 监听 'selection:cleared' 事件
    this.canvas.on("selection:cleared", (e) => {
      //@ts-ignore
      e.target.set({ fill: "#fff" }); // 设置未选中颜色
      this.canvas.renderAll();
    });
  }

  public initMaskTable() {
    const totalHeight = this.row * this.cellHeight;
    const totalWidth = this.col * this.cellWidth;
    for (let i = 0; i <= this.row; i++) {
      let horizontalLine = createLine(
        [0, i * this.cellHeight, totalWidth, i * this.cellHeight],
        {
          stroke: "black",
          strokeWidth: 1,
        }
      );
      this.cellLines.push(horizontalLine);
    }

    for (let j = 0; j <= this.col; j++) {
      var verticalLine = new fabric.Line(
        [j * this.cellWidth, 0, j * this.cellWidth, totalHeight],
        {
          stroke: "black",
          strokeWidth: 1,
        }
      );
      this.cellLines.push(verticalLine);
    }
    return this;
  }

  public mergeCells(mergeCells: MergeCell[]): Table {
    mergeCells.forEach((cell) => {
      const group = mergeCell(cell, this.cellWidth, this.cellHeight);
      this.mergeGroup.push(group);
    });
    return this;
  }

  public render() {
    this.canvas.add.apply(this.canvas, [...this.cellLines, ...this.mergeGroup]);
    this.canvas.renderAll();
  }
}

type MergeCell = {
  startRow: number;
  startCol: number;
  endRow: number;
  endCol: number;
};
