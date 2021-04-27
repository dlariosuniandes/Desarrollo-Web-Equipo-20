import { Artist } from './artist';
import { Album } from '../album/album';

export class Musician extends Artist {
  birthDate: Date;

  public constructor(
    birthDate: Date,
    name: string,
    description: string,
    id: number,
    image: string,
    albums: Array<Album>,
    performerPrizes: any
  ) {
    super(name, description, id, image, albums, performerPrizes);
    this.birthDate = new Date(birthDate);
  }
}
