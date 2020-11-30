import { Extent } from "./extent";
import { Map } from "../map";
import { IProjection } from "../projection";
import { ISymbol } from "../symbol";

export interface IGeometry {
  extent: Extent
  project (projection: IProjection) : IGeometry
  draw (ctx: CanvasRenderingContext2D, projection?: IProjection, extent?: Extent, symbol?: ISymbol) : Promise<void>
}