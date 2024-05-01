import { fabric } from 'fabric';

class Table {
    canvas;
    cellWidth;
    cellHeight;
    row;
    col;
    cellLines = [];
    mergeCellRects = [];
    cellTexts = [];
    constructor(row, col, container) {
        this.canvas = new fabric.StaticCanvas(container);
        this.cellWidth = 120;
        this.cellHeight = 40;
        this.row = row;
        this.col = col;
    }
    initMaskTable() {
        const totalHeight = this.row * this.cellHeight;
        const totalWidth = this.col * this.cellWidth;
        for (let i = 0; i <= this.row; i++) {
            let horizontalLine = new fabric.Line([0, i * this.cellHeight, totalWidth, i * this.cellHeight], {
                stroke: "black",
                strokeWidth: 1,
            });
            this.cellLines.push(horizontalLine);
        }
        // 使用另一个for循环创建列线条
        for (let j = 0; j <= this.col; j++) {
            var verticalLine = new fabric.Line([j * this.cellWidth, 0, j * this.cellWidth, totalHeight], {
                stroke: "black",
                strokeWidth: 1,
            });
            this.cellLines.push(verticalLine);
        }
        return this;
    }
    mergeCells(startRow, startCol, endRow, endCol) {
        // 计算矩形的位置和大小
        const left = startCol * this.cellWidth;
        const top = startRow * this.cellHeight;
        const width = (endCol - startCol + 1) * this.cellWidth;
        const height = (endRow - startRow + 1) * this.cellHeight;
        // 创建一个矩形
        const rect = new fabric.Rect({
            left: left,
            top: top,
            width: width,
            height: height,
            fill: "white",
            stroke: "black",
            strokeWidth: 1,
        });
        var text = new fabric.Textbox("Hello", {
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
    render() {
        console.log(this.cellLines, this.mergeCellRects, this.cellTexts);
        this.canvas.add.apply(this.canvas, [...this.cellLines, ...this.mergeCellRects, ...this.cellTexts]);
    }
}

export { Table };
//# sourceMappingURL=render.esm-bundler.js.map
