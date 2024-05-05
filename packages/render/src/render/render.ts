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
import { createCells } from "../utils/mergeCells";

export class Table {
  private canvas: Canvas;
  private cellWidth: number;
  private cellHeight: number;
  private row: number;
  private col: number;
  private cellGroups: Group[] = [];
  private mergeGroup: Group[] = [];
  private mergeCells: MergeCell[] = [];
  private startX: number = Number.MAX_SAFE_INTEGER;
  private startY: number = Number.MAX_SAFE_INTEGER;
  private endX: number = Number.MIN_SAFE_INTEGER;
  private endY: number = Number.MIN_SAFE_INTEGER;
  constructor(row: number, col: number, container: string,mergeCells: MergeCell[]) {
    this.canvas = createCanvas(container);
    this.cellWidth = 120;
    this.cellHeight = 40;
    this.row = row;
    this.col = col;
    this.mergeCells = mergeCells;
    this.canvas.selection = true;
    this.canvas.on("mouse:down", (e) => {
      this.resetBgc();
      this.startX = Number.MAX_SAFE_INTEGER;
      this.endX = Number.MIN_SAFE_INTEGER;
      this.startY = Number.MAX_SAFE_INTEGER;
      this.endY = Number.MIN_SAFE_INTEGER;
      this.canvas.on("mouse:move", this.mouseMove);
    });
    this.canvas.on("mouse:up", (e) => {
      this.canvas.off("mouse:move", this.mouseMove);
    });
  }

  private mouseMove = (e) => {
    let minX =
      Number(Math.floor(e.pointer.x / this.cellWidth)) * this.cellWidth;
    let maxX = Number(Math.ceil(e.pointer.x / this.cellWidth)) * this.cellWidth;
    let minY =
      Number(Math.floor(e.pointer.y / this.cellHeight)) * this.cellHeight;
    let maxY =
      Number(Math.ceil(e.pointer.y / this.cellHeight)) * this.cellHeight;
    console.log(minX, maxX, minY, maxY);

    this.startX = Math.min(minX, this.startX);
    this.endX = Math.max(maxX, this.endX);
    this.startY = Math.min(minY, this.startY);
    this.endY = Math.max(maxY, this.endY);

    this.cellGroups.forEach((group) => {
      const rect = group.getObjects()[0] as fabric.Rect;
      if (
        group.left >= this.startX &&
        group.left + this.cellWidth <= this.endX &&
        group.top >= this.startY &&
        group.top + this.cellHeight <= this.endY
      ) {
        rect.set("fill", "rgba(0,0,0,0.5)"); // 给矩形添加红色背景
      }
    });
    this.reRender(); 
  };

  private resetBgc() {
    this.cellGroups.forEach((group) => {
      const rect = group.getObjects()[0] as fabric.Rect;
      if (
        group.left >= this.startX &&
        group.left + this.cellWidth <= this.endX &&
        group.top >= this.startY &&
        group.top + this.cellHeight <= this.endY
      ) {
        rect.set("fill", "white"); // 给矩形添加红色背景
      }
    });
  }

  public initMaskTable() {
    const totalHeight = this.row * this.cellHeight;
    const totalWidth = this.col * this.cellWidth;

    for (let i = 0; i < this.row; i++) {
      for (let j = 0; j < this.col; j++) {
        const cellGroup = createCells(
          i,
          j,
          i,
          j,
          this.cellWidth,
          this.cellHeight
        );
        this.cellGroups.push(cellGroup);
      }
    }
    return this;
  }

  private merge(): Table {
    this.mergeCells.forEach((cell) => {
      const group = mergeCell(cell, this.cellWidth, this.cellHeight);
      this.mergeGroup.push(group);
    });
    return this;
  }

  public render() {
    this.merge();
    this.canvas.add.apply(this.canvas, [
      ...this.cellGroups,
      ...this.mergeGroup,
    ]);
   
    this.canvas.renderAll();
    this.canvas.getObjects().forEach((obj) => {
      obj.lockMovementX = true;
      obj.lockMovementY = true;
    });
    //! 创建一个覆盖层？
    //   const overlayCanvasContainer = document.createElement("canvas");
    //   overlayCanvasContainer.setAttribute("id", "overlay-cotnainer");
    //   let canvasContainer = document.getElementById("container")
    //     .parentNode as HTMLElement;
    //   canvasContainer.appendChild(overlayCanvasContainer);
    //   overlayCanvasContainer.style.position = "absolute";
    //   overlayCanvasContainer.style.top = canvasContainer.offsetTop + "px";
    //   overlayCanvasContainer.style.left = canvasContainer.offsetLeft + "px";
    //   // 创建一个 fabric.Canvas 实例，覆盖在已有的 canvas 上

    //   setTimeout(() => {
    //     let overlayCanvas = createCanvas("overlay-cotnainer",{
    //       selection: true,
    //       width: this.cellWidth * this.col,
    //       height: this.cellHeight * this.row,
    //     });

    //     overlayCanvas.setBackgroundColor("rgba(0,0,0,0)", function () {
    //       overlayCanvas.renderAll();
    //     });
    //   },100);
    // }
  }

  private reRender(){
    this.canvas.renderAll()
  }
}

type MergeCell = {
  startRow: number;
  startCol: number;
  endRow: number;
  endCol: number;
};
