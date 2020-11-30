import { IGeometry } from './geometry';
import { Extent } from './extent';
import { IProjection, WebMercator } from '../projection';
import { SimplePointSymbol, ISymbol, SimpleMarkerSymbol } from '../symbol';

export class Point implements IGeometry {

  static RADIUS : number = 10; // px

  private _x : number;
  private _y : number;
  private _lon : number;
  private _lat : number;
  private _projection : IProjection;
  private _projected: boolean
  private _extent : Extent;

  constructor (lon : number, lat : number) {
    this._lon = lon;
    this._lat = lat;
  }

  get extent () : Extent {
    return this._extent
  }

  project (projection: IProjection) {
    this._projection = projection
    const [x, y] = this._projection.project([this._lon, this._lat])
    this._x = x
    this._y = y
    this._extent = new Extent(this._x, this._y, this._x, this._y)
    this._projected = true
    return this
  }

  async draw (ctx : CanvasRenderingContext2D, projection: IProjection = new WebMercator(), extent: Extent = projection.extent, symbol: ISymbol = new SimplePointSymbol()) {
    if (!this._projected) {
      this.project(projection)
    }
    if (!extent.intersect(this._extent)) { // only draw which is in map extent
      return
    }
    ctx.save()
    if (symbol instanceof SimplePointSymbol) {
      const pSimplePointSymbol = (symbol as SimplePointSymbol)
      ctx.strokeStyle = pSimplePointSymbol.strokStyle
      ctx.fillStyle = pSimplePointSymbol.fillStyle
      ctx.lineWidth = pSimplePointSymbol.lineWidth
      ctx.beginPath()
      const matrix = ctx.getTransform()
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.arc(matrix.a * this._x + matrix.e, matrix.d * this._y + matrix.f, pSimplePointSymbol.radius, 0, Math.PI * 2, true)
      ctx.fill()
      ctx.stroke()
    } else if (symbol instanceof SimpleMarkerSymbol) {
      const marker = (symbol as SimpleMarkerSymbol)
      if (!marker.loaded) await marker.load()
      if (marker.icon) {
        const matrix = ctx.getTransform()
        ctx.setTransform(1, 0, 0, 1, 0, 0)
        ctx.drawImage(marker.icon, (matrix.a * this._x + matrix.e) - marker.offsetX, (matrix.d * this._y + matrix.f) - marker.offsetY, marker.width, marker.height)
      }
    }
    ctx.restore()
  }

}
