import { Performer } from './performer';
import { Album } from '../album/album';

export class Band extends Performer {
  creationDate: Date;

  public constructor(
    creationDate: Date,
    name: string,
    description: string,
    id: number,
    image: string,
    albums?: Array<Album>,
    performerPrizes?: any
  ) {
    super(name, description, id, image, albums, performerPrizes);
    this.creationDate = new Date(creationDate);
  }

  public getName(): string{
    return this.name
  }

  public getCreationDate(): Date{
    return this.creationDate
  }
  public getDescription(): string{
    return this.description
  }

  public getImage(): string{
    return this.image
  }
}
