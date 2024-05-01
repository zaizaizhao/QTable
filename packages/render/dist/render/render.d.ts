export declare class Table {
    private canvas;
    private cellWidth;
    private cellHeight;
    private row;
    private col;
    private cellLines;
    private mergeGroup;
    constructor(row: number, col: number, container: string);
    initMaskTable(): this;
    mergeCells(mergeCells: MergeCell[]): Table;
    render(): void;
}
type MergeCell = {
    startRow: number;
    startCol: number;
    endRow: number;
    endCol: number;
};
export {};
