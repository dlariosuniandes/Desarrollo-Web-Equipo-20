import { Artist } from './artist';
import { Album } from '../album/album';

export class Band extends Artist {
  creationDate: Date;

  public constructor(
    creationDate: Date,
    name: string,
    description: string,
    id: number,
    image: string,
    albums: Array<Album>,
    performerPrizes: any
  ) {
    super(name, description, id, image, albums, performerPrizes);
    this.creationDate = new Date(creationDate);
  }
}
