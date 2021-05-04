import { Performer } from '../perfomer/performer';
import { Comment } from '../comentario/comment';
export enum GENRE
{
    CLASSICAL,
    SALSA,
    ROCK,
    FOLK
}

export enum RECORD_LABEL
{
    SONY,
    EMI,
    DF,
    ELEKTRA,
    FANIA
}

export class Track
{
    constructor(private name:string, private duration:string)
    {
    }

    darNombre()
    {
        return this.name;
    }
    darDuracion()
    {
        return this.duration;
    }
    // cambiarDuracion(duracion:string):void
    // {
    //     this.duration = duracion
    // }
    // cambiarNombre(nomb:string):void{
    //     this.name = nomb;
    // }
}


export class Album{

    constructor(
        private id: number,
        private name: string,
        private cover: string,
        private releaseDate: Date,
        private description: string,
        private genre: GENRE,
        private recordLabel: RECORD_LABEL,
        private tracks?: Array<Track>,
        private performers?: Array<Performer>,
        private comments?: Array<Comment>
        )
    {
    }

    darId()
    {
        return this.id
    }

    darNombre():string
    {
        return this.name;
    }

    darPortada():string
    {
        return this.cover;
    }

    darFecha():Date
    {
        return this.releaseDate;
    }

    darDescripcion():string
    {
        return this.description;
    }

    darGenero(): GENRE
    {
        return this.genre;
    }

    darSelloDisco():RECORD_LABEL
    {
        return this.recordLabel;
    }

    darTracks()
    {
        return this.tracks;
    }

    darArtistas()
    {
        return this.performers;
    }

    darComentarios()
    {
        return this.comments;
    }

    // cambiarTracks(newTracks: Array<Track>):void
    // {
    //     this.tracks = newTracks;
    // }

    // cambiarNombre(nombre:string):void
    // {
    //     this.name = nombre;
    // }

    // cambiarPortada(portada:string):void
    // {
    //     this.cover = portada;
    // }

    // cambiarFecha(fecha:Date)
    // {
    //     this.releaseDate = fecha;
    // }

    // cambiarDescripcion(descr: string)
    // {
    //     this.description = descr
    // }

    // cambiarGenero(genre: GENRE)
    // {
    //     this.genre = genre;
    // }
    // cambiarSelloDisco(selloDisco: RECORD_LABEL)
    // {
    //     this.recordLabel = selloDisco;
    // }

    // cambiarArtistas(newArtists:Array<Artist>)
    // {
    //     this.performers = newArtists;
    // }

    // cambiarComentarios(newComments:Array<Comment>)
    // {
    //     this.comments = newComments;
    // }


}
