import { Performer } from '../perfomer/performer';
import { Comment } from '../comentario/comment';
import { CollectorAlbum } from './collectorAlbum';
import { Album } from '../album/album';


export class Collector {

  constructor(
    private id:number,
    private name: string,
    private telephone: number,
    private email: string,
    private comments: Array<Comment>,
    private favoritePerformers: Array<Performer>,
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

  darComentarios()
  {
    return this.comments;
  }

  darArtistasFavoritos()
  {
    return this.favoritePerformers
  }

  darAlbumesColeccionista()
  {
    return this.collectorAlbums;
  }


  // cambiarNombre(nombre: string):void {
  //   this.name = nombre;
  // }

  // cambiarTelefono(telefono: number):void {
  //   this.telephone = telefono;
  // }

  // cambiarEmail(email: string):void {
  //   this.email = email;
  // }
  // cambiarComentarios(coment:Array<Comment>)
  // {
  //   this.comments = coment;
  // }

  // cambiarArtistasFavoritos(artists:Array<Artist>)
  // {
  //   this.favoritePerformers = artists;
  // }

  // cambiarAlbumesColeccionista(albums: Array<CollectorAlbum>)
  // {
  //   this.collectorAlbums = albums;
  // }
}
