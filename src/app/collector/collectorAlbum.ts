export class CollectorAlbum {
  constructor(
    private price: number,
    private status: string
  ){
  }
  darPrecio(){
    return this.price;
  }
  darEstado(){
    return this.status;
  }
  cambiarPrecio(precio:number): void {
    this.price = precio;
  }
  cambiarEstado(estado:string): void {
    this.status = status;
  }
}
