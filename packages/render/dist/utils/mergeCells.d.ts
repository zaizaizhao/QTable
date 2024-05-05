export declare function mergeCell(cell: MergeCell, cellWidth: any, cellHeight: any): import("fabric/fabric-impl").Group;
export declare function createCells(startRow: any, startCol: any, endRow: any, endCol: any, cellWidth: any, cellHeight: any): import("fabric/fabric-impl").Group;
type MergeCell = {
    startRow: number;
    startCol: number;
    endRow: number;
    endCol: number;
};
export {};
