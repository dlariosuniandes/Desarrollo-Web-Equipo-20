import { Album } from "../album/album";
import { Collector } from "./collector";

export class CollectorAlbum {
  constructor(
    private id: number,
    private price: number,
    private status: string,
    private album?: Album,
    private collector?: Collector
  ){
  }
  darPrecio(){
    return this.price;
  }
  darEstado(){
    return this.status;
  }
  darAlbum(){
    return this.album;
  }
  darColeccionista(){
    return this.collector;
  }
  // cambiarPrecio(precio:number): void {
  //   this.price = precio;
  // }
  // cambiarEstado(estado:string): void {
  //   this.status = status;
  // }
}
