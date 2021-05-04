import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { Musician } from './musician';
import { Band } from './band';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { Album } from '../album/album';

@Injectable({
  providedIn: 'root',
})
export class PerformerService {
  private url = environment.backUrl;

  constructor(private http: HttpClient) {}

  getMusicians(): Observable<Musician[]> {
    const methodUrl = this.url + 'musicians';
    return this.http.get<Musician[]>(methodUrl).pipe(
      map((array) => {
        return array.map((element) => {
          return new Musician(
            element.birthDate,
            element.name,
            element.description,
            element.id,
            element.image,
            element.albums,
            element.performerPrizes
          );
        });
      })
    );
  }

  getBands(): Observable<Band[]> {
    const methodUrl = this.url + 'bands';
    return this.http.get<Band[]>(methodUrl).pipe(
      map((array) => {
        return array.map((element) => {
          return new Band(
            element.creationDate,
            element.name,
            element.description,
            element.id,
            element.image,
            element.albums,
            element.performerPrizes
          );
        });
      })
    );
  }

  getMusicianDetail(id: number): Observable<Musician> {
    const methodUrl = this.url + 'musicians/' + id;
    return this.http.get<Musician>(methodUrl).pipe(
      map((element) => {
        return new Musician(
          element.birthDate,
          element.name,
          element.description,
          element.id,
          element.image,
          element.albums.map((album) => {
            return new Album(
              album.id,
              album.name,
              album.cover,
              album.releaseDate,
              album.description,
              album.genre,
              album.recordLabel,
              album.tracks,
              album.performers,
              album.comments
            );
          }),
          element.performerPrizes
        );
      })
    );
  }

  getBandDetail(id: number): Observable<Band> {
    const methodUrl = this.url + 'bands/' + id;
    return this.http.get<Band>(methodUrl).pipe(
      map((element) => {
        return new Band(
          element.creationDate,
          element.name,
          element.description,
          element.id,
          element.image,
          element.albums.map((album) => {
            return new Album(
              album.id,
              album.name,
              album.cover,
              album.releaseDate,
              album.description,
              album.genre,
              album.recordLabel,
              album.tracks,
              album.performers,
              album.comments
            );
          }),
          element.performerPrizes
        );
      })
    );
  }
}
