import { fabric } from "fabric";
export declare class Table {
    private canvas;
    private cellWidth;
    private cellHeight;
    private row;
    private col;
    private cellLines;
    private mergeCellRects;
    private cellTexts;
    constructor(row: number, col: number, container: string);
    initMaskTable(): this;
    mergeCells(startRow: number, startCol: number, endRow: number, endCol: number): Table;
    render(): void;
}
export declare function initMaskTable(row: number, col: number, container: string): () => void;
export declare function mergeCells(startRow: number, startCol: number, endRow: number, endCol: number, canvas: fabric.StaticCanvas, cellWidth: number, cellHeight: number): void;
