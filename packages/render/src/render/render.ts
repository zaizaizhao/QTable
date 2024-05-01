import { fabric } from "fabric";
import {
  createStaticCanvas,
  createCanvas,
  createGroup,
  createRect,
  createLine,
  createText,
  createTextbox,
} from "../shared/draw"

export class Table {
  private canvas: fabric.StaticCanvas;
  private cellWidth: number;
  private cellHeight: number;
  private row: number;
  private col: number;
  private cellLines = [];
  private mergeCellRects = [];
  private cellTexts = [];
  constructor(row: number, col: number, container: string) {
    this.canvas = createStaticCanvas(container);
    this.cellWidth = 120;
    this.cellHeight = 40;
    this.row = row;
    this.col = col;
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

    // 使用另一个for循环创建列线条
    for (let j = 0; j <= this.col; j++) {
      var verticalLine = createLine(
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

  public mergeCells(
    startRow: number,
    startCol: number,
    endRow: number,
    endCol: number
  ) :Table{
    // 计算矩形的位置和大小
    const left = startCol * this.cellWidth;
    const top = startRow * this.cellHeight;
    const width = (endCol - startCol + 1) * this.cellWidth;
    const height = (endRow - startRow + 1) * this.cellHeight;

    // 创建一个矩形
    const rect = createRect({
      left: left,
      top: top,
      width: width,
      height: height,
      fill: "white",
      stroke: "black",
      strokeWidth: 1,
    });
    var text = createTextbox("Hello", {
      left: rect.left,
      top: rect.top,
      width: rect.width,
      height: rect.height,
      fill: "black",
      lockMovementX: true,
      lockMovementY: true,
    });
    this.cellTexts.push(text);
    this.mergeCellRects.push(rect);
    return this;
  }

  public render() {
    this.canvas.add.apply(this.canvas, [...this.cellLines,...this.mergeCellRects,...this.cellTexts]);
  }
}


