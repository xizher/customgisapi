import { ISymbol } from "../symbol";
import { Extent, IGeometry } from "../geometry";
import { IProjection, WebMercator } from "../projection";

export class Graphic {

  private _geometry: IGeometry
  private _symbol: ISymbol

  public visible: boolean = true

  get extent (): Extent {
    return this._geometry ? this._geometry.extent : null
  }

  constructor (geometry: IGeometry, symbol: ISymbol) {
    this._geometry = geometry
    this._symbol = symbol
  }

  draw (ctx: CanvasRenderingContext2D, projection: IProjection = new WebMercator(), extent: Extent = projection.extent) {
    if (this.visible) {
      this._geometry.draw(ctx, projection, extent, this._symbol)
    }
  }

}