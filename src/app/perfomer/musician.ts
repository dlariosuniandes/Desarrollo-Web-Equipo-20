import { Performer } from './performer';
import { Album } from '../album/album';

export class Musician extends Performer {
  birthDate: Date;

  public constructor(
    birthDate: Date,
    name: string,
    description: string,
    id: number,
    image: string,
    albums?: Array<Album>,
    performerPrizes?: any
  ) {
    super(name, description, id, image, albums, performerPrizes);
    this.birthDate = new Date(birthDate);
  }

  public getName(): string{
    return this.name
  }

  public getBirthDate(): Date{
    return this.birthDate
  }
  public getDescription(): string{
    return this.description
  }

  public getImage(): string{
    return this.image
  }

  public getAlbums(): Album[]{
    return this.albums
  }
}
