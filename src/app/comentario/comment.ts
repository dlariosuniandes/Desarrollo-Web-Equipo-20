export class Comment
{
    constructor(
        private id: number,
        private description: string,
        private rating: number
    )
    {
    }

    darId()
    {
        return this.id;
    }

    darDescripcion()
    {
        return this.description;
    }

    darRating()
    {
        return this.rating;
    }

    // cambiarDescripcion(descrp:string):void
    // {
    //     this.description = descrp
    // }

    // cambiarRating(rate:number):void
    // {
    //     this.rating = rate;
    // }
}
