export class Point {
    constructor(x, y) {
        this._x = x;
        this._y = y;
    }
    draw(ctx) {
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
/**
 * 点的绘制半径
 * @type {number}
 */
Point.RADIUS = 10; // 单位：px
