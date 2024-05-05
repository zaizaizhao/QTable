export declare class Table {
    private canvas;
    private cellWidth;
    private cellHeight;
    private row;
    private col;
    private cellGroups;
    private mergeGroup;
    private mergeCells;
    private startX;
    private startY;
    private endX;
    private endY;
    constructor(row: number, col: number, container: string, mergeCells: MergeCell[]);
    private mouseMove;
    private resetBgc;
    initMaskTable(): this;
    private merge;
    render(): void;
    private reRender;
}
type MergeCell = {
    startRow: number;
    startCol: number;
    endRow: number;
    endCol: number;
};
export {};
