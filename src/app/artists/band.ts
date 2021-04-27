import { Artist } from './artist';

export class Band extends Artist {
  creationDate: Date;

  public constructor(
    creationDate: Date,
    name: string,
    description: string,
    id: number,
    image: string,
    albums: any,
    performerPrizes: any
  ) {
    super(name, description, id, image, albums, performerPrizes);
    this.creationDate = new Date(creationDate);
  }
}
