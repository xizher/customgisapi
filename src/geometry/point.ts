import { IGeometry } from './geometry';

export class Point implements IGeometry {

  /** 
   * 点的绘制半径
   * @type {number}
   */
  static RADIUS : number = 10; // 单位：px

  /** 
   * 点横轴坐标
   * @type {number}
   */
  private _x : number;
  /** 
   * 点纵轴坐标
   * @type {number}
   */
  private _y : number;

  constructor (x : number, y : number) {
    this._x = x;
    this._y = y;
  }

  draw (ctx : CanvasRenderingContext2D) {
    ctx.save();
    ctx.strokeStyle = '#ff0000';
    ctx.fillStyle = '#ff0000';
    ctx.beginPath();
    ctx.arc(this._x, this._y, Point.RADIUS, 0, Math.PI * 2, true);
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  }

}
