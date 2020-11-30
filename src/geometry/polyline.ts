import { IGeometry } from './geometry';
import { Extent } from './extent';
import { IProjection, WebMercator } from '../projection';
import { ISymbol, SimpleLineSymbol } from '../symbol';

export class Polyline implements IGeometry {

  private _coordinates : number[][];
  private _lonlats : number[][];
  private _projection: IProjection;
  private _projected: boolean
  private _extent : Extent;

  constructor (lonlats : number[][]) {
    this._lonlats = lonlats;
  }

  get extent () : Extent {
    return this._extent;
  }

  project (projection : IProjection) {
    this._projection = projection;
    this._coordinates = this._lonlats.map((point : [number, number]) => this._projection.project(point))
    let [xmin, ymin, xmax, ymax] = [Number.MAX_VALUE, Number.MAX_VALUE, Number.MIN_VALUE, Number.MIN_VALUE];
    this._coordinates.forEach(point => {
      xmin = Math.min(xmin, point[0]);
      ymin = Math.min(ymin, point[1]);
      xmax = Math.max(xmax, point[0]);
      ymax = Math.max(ymax, point[1]);
    });
    this._extent = new Extent(xmin, ymin, xmax, ymax);
    this._projected = true
    return this
  }

  async draw (ctx : CanvasRenderingContext2D, projection: IProjection = new WebMercator(), extent: Extent = projection.extent, symbol: ISymbol = new SimpleLineSymbol()) {
    if (!this._projected) {
      this.project(projection)
    }
    // if (!extent.intersect(this._extent)) {
    //   return
    // }
    ctx.save()
    const pSymbol = symbol as SimpleLineSymbol
    ctx.strokeStyle = pSymbol.strokeStyle
    ctx.lineWidth = pSymbol.lineWidth
    const matrix = ctx.getTransform()
    ctx.setTransform(1, 0, 0, 1, 0, 0)
    ctx.beginPath()
    this._coordinates.forEach((point, index) => {
      const screenX = matrix.a * point[0] + matrix.e
      const screenY = matrix.d * point[1] + matrix.f
      if (index === 0) {
        ctx.moveTo(screenX, screenY)
      } else {
        ctx.lineTo(screenX, screenY)
      }
    })
    ctx.stroke()
    ctx.restore()
  }

}
