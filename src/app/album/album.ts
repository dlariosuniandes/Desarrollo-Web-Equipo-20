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

export class Album{
    
    constructor(private name: string, private cover: string, private releaseDate: Date, private description: string, private genre: GENRE, private recordLabel: RECORD_LABEL )
    {
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

    cambiarNombre(nombre:string):void
    {
        this.name = nombre;
    }

    cambiarPortada(portada:string):void
    {
        this.cover = portada;
    }

    cambiarFecha(fecha:Date)
    {
        this.releaseDate = fecha;
    }

    cambiarDescripcion(descr: string)
    {
        this.description = descr
    }

    cambiarGenero(genre: GENRE)
    {
        this.genre = genre;
    }
    cambiarSelloDisco(selloDisco: RECORD_LABEL)
    {
        this.recordLabel = selloDisco;
    }


}