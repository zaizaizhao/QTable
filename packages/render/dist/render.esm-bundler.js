import { fabric } from 'fabric';

function createCanvas(container, options) {
    return new fabric.Canvas(container, options);
}
function createGroup(objects, options, isAlreadyGrouped) {
    return new fabric.Group(objects, options, isAlreadyGrouped);
}
function createRect(options) {
    return new fabric.Rect(options);
}
function createTextbox(text, options) {
    return new fabric.Textbox(text, options);
}

function mergeCell(cell, cellWidth, cellHeight) {
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
function createCells(startRow, startCol, endRow, endCol, cellWidth, cellHeight) {
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
        lockMovementX: true,
        lockMovementY: true,
    });
    const text = createTextbox(`${startRow},${startCol}`, {
        left: rect.left,
        top: rect.top,
        width: rect.width,
        height: rect.height,
        lockMovementX: true,
        lockMovementY: true,
        fill: "black",
    });
    const group = createGroup([rect, text]);
    return group;
}

class Table {
    canvas;
    cellWidth;
    cellHeight;
    row;
    col;
    cellGroups = [];
    mergeGroup = [];
    mergeCells = [];
    startX = Number.MAX_SAFE_INTEGER;
    startY = Number.MAX_SAFE_INTEGER;
    endX = Number.MIN_SAFE_INTEGER;
    endY = Number.MIN_SAFE_INTEGER;
    constructor(row, col, container, mergeCells) {
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
    mouseMove = (e) => {
        let minX = Number(Math.floor(e.pointer.x / this.cellWidth)) * this.cellWidth;
        let maxX = Number(Math.ceil(e.pointer.x / this.cellWidth)) * this.cellWidth;
        let minY = Number(Math.floor(e.pointer.y / this.cellHeight)) * this.cellHeight;
        let maxY = Number(Math.ceil(e.pointer.y / this.cellHeight)) * this.cellHeight;
        console.log(minX, maxX, minY, maxY);
        this.startX = Math.min(minX, this.startX);
        this.endX = Math.max(maxX, this.endX);
        this.startY = Math.min(minY, this.startY);
        this.endY = Math.max(maxY, this.endY);
        this.cellGroups.forEach((group) => {
            const rect = group.getObjects()[0];
            if (group.left >= this.startX &&
                group.left + this.cellWidth <= this.endX &&
                group.top >= this.startY &&
                group.top + this.cellHeight <= this.endY) {
                rect.set("fill", "rgba(0,0,0,0.5)"); // 给矩形添加红色背景
            }
        });
        this.reRender();
    };
    resetBgc() {
        this.cellGroups.forEach((group) => {
            const rect = group.getObjects()[0];
            if (group.left >= this.startX &&
                group.left + this.cellWidth <= this.endX &&
                group.top >= this.startY &&
                group.top + this.cellHeight <= this.endY) {
                rect.set("fill", "white"); // 给矩形添加红色背景
            }
        });
    }
    initMaskTable() {
        this.row * this.cellHeight;
        this.col * this.cellWidth;
        for (let i = 0; i < this.row; i++) {
            for (let j = 0; j < this.col; j++) {
                const cellGroup = createCells(i, j, i, j, this.cellWidth, this.cellHeight);
                this.cellGroups.push(cellGroup);
            }
        }
        return this;
    }
    merge() {
        this.mergeCells.forEach((cell) => {
            const group = mergeCell(cell, this.cellWidth, this.cellHeight);
            this.mergeGroup.push(group);
        });
        return this;
    }
    render() {
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
    reRender() {
        this.canvas.renderAll();
    }
}

export { Table };
//# sourceMappingURL=render.esm-bundler.js.map
