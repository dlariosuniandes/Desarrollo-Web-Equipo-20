import { Album } from '../album/album';

export class Artist {
  name: string;
  description: string;
  id: number;
  image: string;
  albums: any;
  performerPrizes: any;

  public constructor(
    name: string,
    description: string,
    id: number,
    image:string,
    albums: Array<Album>,
    performerPrizes: any
  ) {
    this.name = name;
    this.description = description;
    this.id = id,
    this.image = image
    this.albums = albums
    this.performerPrizes = performerPrizes
  }
}
