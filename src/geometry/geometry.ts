import { Extent } from "./extent";
import { Map } from "../map";

export interface IGeometry {
  getExtent () : Extent;
  addTo (map: Map) : void
  draw (ctx: CanvasRenderingContext2D) : void
}