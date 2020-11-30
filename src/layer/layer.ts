import { Extent } from '../geometry';
import { IProjection, WebMercator } from '../projection'

export interface ILayer {
  name: string
  description: string
  visible: boolean
  draw (ctx: CanvasRenderingContext2D, projection?: IProjection, extent?: Extent, zoom?: number) : void
}

export class Layer implements ILayer {
  name = ''
  description = ''
  visible = true
  draw (ctx: CanvasRenderingContext2D, projection: IProjection = new WebMercator, extent: Extent = projection.extent, zoom: number = 10 ) {}
}
