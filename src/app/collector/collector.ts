import { CollectorAlbum } from './collectorAlbum';
import { Artist } from './collectorAlbum';
import { Comment } from './comentario/comment';

export class Collector {

  constructor(

    private name: string,
    private telephone: number,
    private email: string,
    private comments: Array<Comment>,
    private favoritePerformers: Array<Artist>,
    private collectorAlbums: Array<CollectorAlbum>
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
