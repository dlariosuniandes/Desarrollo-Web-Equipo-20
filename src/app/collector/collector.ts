import { CollectorAlbum } from './collectorAlbum';
export class Collector {

  constructor(

    private name: string,
    private telephone: number,
    private email: string,
    //public comments: Array<Comment>,
    //public favoritePerformers: Array<Performer>,
    //public collectorAlbums: Array<CollectorAlbum>
  ){
  }



  darNombre():string {
    return this.name;
  }

  darTelefono():number {
    return this.telephone;
  }

  darEmail():string {
    return this.email;
  }


  cambiarNombre(nombre: string):void {
    this.name = nombre;
  }

  cambiarTelefono(telefono: number):void {
    this.telephone = telefono;
  }

  cambiarEmail(email: string):void {
    this.email = email;
  }

}
