import { fabric } from "fabric";
import { ILineOptions, IRectOptions } from "fabric/fabric-impl";

export type StaticCanvas = fabric.StaticCanvas;
export type Canvas = fabric.Canvas;
export type Group = fabric.Group;
export type Rect = fabric.Rect;
export type Line = fabric.Line;
export type Text = fabric.Text;
export type Textbox = fabric.Textbox;


export function createStaticCanvas(container): fabric.StaticCanvas {
    return new fabric.StaticCanvas(container);
}

export function createCanvas(container): fabric.Canvas {
    return new fabric.Canvas(container);
}

export function createGroup(objects?: fabric.Object[] | undefined, options?: fabric.IGroupOptions | undefined, isAlreadyGrouped?: boolean | undefined): fabric.Group {
    return new fabric.Group(objects,options,isAlreadyGrouped);
}


export function createRect(options:IRectOptions): fabric.Rect {
    return new fabric.Rect(options);
}

export function createLine(points?: number[], objObjects?: ILineOptions): fabric.Line {
    return new fabric.Line(points, objObjects);
}

export function createText(text: string, options: fabric.ITextOptions): fabric.Text {
    return new fabric.Text(text, options);
}

export function createTextbox(text: string, options: fabric.ITextOptions): fabric.Textbox {
    return new fabric.Textbox(text, options);
}