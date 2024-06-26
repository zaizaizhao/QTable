import { fabric } from "fabric";
import { ILineOptions, IRectOptions } from "fabric/fabric-impl";
export type StaticCanvas = fabric.StaticCanvas;
export type Canvas = fabric.Canvas;
export type Group = fabric.Group;
export type Rect = fabric.Rect;
export type Line = fabric.Line;
export type Text = fabric.Text;
export type Textbox = fabric.Textbox;
export declare function createStaticCanvas(container: any): fabric.StaticCanvas;
export declare function createCanvas(container: any, options?: fabric.ICanvasOptions): fabric.Canvas;
export declare function createGroup(objects?: fabric.Object[] | undefined, options?: fabric.IGroupOptions | undefined, isAlreadyGrouped?: boolean | undefined): fabric.Group;
export declare function createRect(options: IRectOptions): fabric.Rect;
export declare function createLine(points?: number[], objObjects?: ILineOptions): fabric.Line;
export declare function createText(text: string, options: fabric.ITextOptions): fabric.Text;
export declare function createTextbox(text: string, options: fabric.ITextOptions): fabric.Textbox;
