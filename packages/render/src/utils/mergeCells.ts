import { createGroup, createRect, createTextbox } from "../shared";

export function mergeCell(cell:MergeCell, cellWidth, cellHeight) {
    //! 合并单元格格式待完善
    const { startRow, startCol, endRow, endCol } = cell;
    const left = startCol * cellWidth;
    const top = startRow * cellHeight;
    const width = (endCol - startCol + 1) * cellWidth;
    const height = (endRow - startRow + 1) * cellHeight;

    const rect = createRect({
      left: left,
      top: top,
      width: width,
      height: height,
      fill: "white",
      stroke: "black",
      strokeWidth: 1,
    });

    const text = createTextbox("Hello", {
      left: rect.left,
      top: rect.top,
      width: rect.width,
      height: rect.height,
      fill: "black",
    });
    const group = createGroup([rect, text]);
    return group;
  }

  export function createCells(startRow, startCol, endRow, endCol,cellWidth, cellHeight){
    const left = startCol * cellWidth;
    const top = startRow * cellHeight;
    const width = (endCol - startCol + 1) * cellWidth;
    const height = (endRow - startRow + 1) * cellHeight;

    const rect = createRect({
      left: left,
      top: top,
      width: width,
      height: height,
      fill: "white",
      stroke: "black",
      strokeWidth: 1,
      lockMovementX : true,
      lockMovementY : true,
    });

    const text = createTextbox(`${startRow},${startCol}`, {
      left: rect.left,
      top: rect.top,
      width: rect.width,
      height: rect.height,
      lockMovementX : true,
      lockMovementY : true,
      fill: "black",
    });
    const group = createGroup([rect, text]);
    return group;
  }

  type MergeCell = {
    startRow: number;
    startCol: number;
    endRow: number;
    endCol: number;
  };