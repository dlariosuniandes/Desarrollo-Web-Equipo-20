export class Comment
{
    constructor(
        private description: string,
        private rating: number
    )
    {
    }

    darDescripcion()
    {
        return this.description;
    }

    darRating()
    {
        return this.rating;
    }
    
    cambiarDescripcion(descrp:string):void
    {
        this.description = descrp
    }

    cambiarRating(rate:number):void
    {
        this.rating = rate;
    }
}