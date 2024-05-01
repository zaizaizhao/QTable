var render = (function (exports, fabric) {
    'use strict';

    function createCanvas(container) {
        return new fabric.fabric.Canvas(container);
    }
    function createGroup(objects, options, isAlreadyGrouped) {
        return new fabric.fabric.Group(objects, options, isAlreadyGrouped);
    }
    function createRect(options) {
        return new fabric.fabric.Rect(options);
    }
    function createLine(points, objObjects) {
        return new fabric.fabric.Line(points, objObjects);
    }
    function createTextbox(text, options) {
        return new fabric.fabric.Textbox(text, options);
    }

    function mergeCell(cell, cellWidth, cellHeight) {
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
            lockMovementX: true,
            lockMovementY: true,
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
        cellLines = [];
        mergeGroup = [];
        constructor(row, col, container) {
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
        initMaskTable() {
            const totalHeight = this.row * this.cellHeight;
            const totalWidth = this.col * this.cellWidth;
            for (let i = 0; i <= this.row; i++) {
                let horizontalLine = createLine([0, i * this.cellHeight, totalWidth, i * this.cellHeight], {
                    stroke: "black",
                    strokeWidth: 1,
                });
                this.cellLines.push(horizontalLine);
            }
            for (let j = 0; j <= this.col; j++) {
                var verticalLine = new fabric.fabric.Line([j * this.cellWidth, 0, j * this.cellWidth, totalHeight], {
                    stroke: "black",
                    strokeWidth: 1,
                });
                this.cellLines.push(verticalLine);
            }
            return this;
        }
        mergeCells(mergeCells) {
            mergeCells.forEach((cell) => {
                const group = mergeCell(cell, this.cellWidth, this.cellHeight);
                this.mergeGroup.push(group);
            });
            return this;
        }
        render() {
            this.canvas.add.apply(this.canvas, [...this.cellLines, ...this.mergeGroup]);
            this.canvas.renderAll();
        }
    }

    exports.Table = Table;

    return exports;

})({}, fabric);
//# sourceMappingURL=render.global.js.map
