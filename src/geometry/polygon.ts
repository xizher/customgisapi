import { IGeometry } from './geometry';
import { Extent } from './extent';
import { IProjection, WebMercator } from '../projection';
import { ISymbol, SimpleFillSymbol } from '../symbol';


export class Polygon implements IGeometry {

  private _coordinates : number[][][];
  private _lonlats : number[][][];
  private _projection : IProjection;
  private _projected: boolean
  private _extent : Extent

  constructor (lonlat : number[][][]) {
    this._lonlats = lonlat;
  }

  get extent () : Extent {
    return this._extent;
  }

  project (projection: IProjection) {
    this._projection = projection;
    this._coordinates = this._lonlats.map((ring: any) => ring.map((point: any) => this._projection.project(point)))
    let [xmin, ymin, xmax, ymax] = [Number.MAX_VALUE, Number.MAX_VALUE, Number.MIN_VALUE, Number.MIN_VALUE];
    this._coordinates.forEach(ring => {
      ring.forEach(point => {
        xmin = Math.min(xmin, point[0]);
        ymin = Math.min(ymin, point[1]);
        xmax = Math.max(xmax, point[0]);
        ymax = Math.max(ymax, point[1]);
      });
    });
    this._extent = new Extent(xmin, ymin, xmax, ymax);
    return this
  }

  async draw(ctx : CanvasRenderingContext2D, projection: IProjection = new WebMercator(), extent: Extent = projection.extent, symbol: ISymbol = new SimpleFillSymbol()) {
    if (!this._projected) {
      this.project(projection)
    }
    if (!extent.intersect(this._extent)) {
      return
    }
    ctx.save();
    const pSymbol = symbol as SimpleFillSymbol
    ctx.strokeStyle = pSymbol.strokeStyle;
    ctx.fillStyle = pSymbol.fillStyle;
    ctx.lineWidth = pSymbol.lineWidth;
    ctx.beginPath();
    const matrix = ctx.getTransform();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    this._coordinates.forEach(ring => {
      ring.forEach((point, index) => {
        const [x, y] = [
          matrix.a * point[0] + matrix.e,
          matrix.d * point[1] + matrix.f
        ];
        index === 0
          ? ctx.moveTo(x, y)
          : ctx.lineTo(x, y);
      });
    });
    ctx.closePath();
    ctx.fill('evenodd');
    ctx.stroke();
    ctx.restore();
  }

}
