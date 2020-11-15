import { IGeometry } from './geometry';
export declare class Point implements IGeometry {
    /**
     * 点的绘制半径
     * @type {number}
     */
    static RADIUS: number;
    /**
     * 点横轴坐标
     * @type {number}
     */
    private _x;
    /**
     * 点纵轴坐标
     * @type {number}
     */
    private _y;
    constructor(x: number, y: number);
    draw(ctx: CanvasRenderingContext2D): void;
}
