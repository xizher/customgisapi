import { Extent } from '../geometry';
import { IProjection, WebMercator } from '../projection';
import { Graphic } from '../element';
import { Layer } from './layer';

export class GraphicLayer extends Layer {
  private _graphics: Graphic[] = []

  add (graphic: Graphic) {
    this._graphics.push(graphic)
  }

  draw (ctx: CanvasRenderingContext2D, projection: IProjection = new WebMercator, extent: Extent = projection.extent) {
    if (this.visible) {
      this._graphics.forEach(graphic => {
        graphic.draw(ctx, projection, extent)
      })
    }
  }

}