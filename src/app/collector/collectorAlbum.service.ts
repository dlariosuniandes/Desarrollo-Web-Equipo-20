import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Collector } from './collector';
import { Musician } from '../perfomer/musician';
import { Band } from '../perfomer/band';
import { CollectorAlbum } from './collectorAlbum';
import { Album } from '../album/album';

@Injectable({
  providedIn: 'root'
})
export class CollectorAlbumService {

  private apiUrl: string = environment.backUrl + 'collectors/';
  constructor(private http: HttpClient) { }

  getCollectorAlbums(id:number): Observable<CollectorAlbum[]> {
  return this.http.get<CollectorAlbum[]>(this.apiUrl + id +'/albums').pipe(
    map(collectorAlbums=>{
      let arrCollectors: CollectorAlbum[]=[]
      for(let col of collectorAlbums){
        arrCollectors.push(
          new CollectorAlbum(
            col['id'],
            col['price'],
            col['status'],
            new Album(
              col['album']['id'],
              col['album']['name'],
              col['album']['cover'],
              col['album']['releaseDate'],
              col['album']['description'],
              col['album']['genre'],
              col['album']['recordLabel']
              ),
            col['collector'])
            )
      };
      return arrCollectors
    })
  );
  }
}
