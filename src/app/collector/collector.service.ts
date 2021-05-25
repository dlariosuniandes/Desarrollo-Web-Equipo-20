import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Collector } from './collector';
import { Musician } from '../perfomer/musician';
import { Band } from '../perfomer/band';
import { CollectorAlbum } from './collectorAlbum';
import { registerLocaleData } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class CollectorService {
  private apiUrl: string = environment.backUrl + 'collectors';
  constructor(private http: HttpClient) { }

  createCollector(collector: Collector): Observable<Collector>{
    return this.http.post<Collector>(this.apiUrl, collector);//.pipe(catchError(this.handleError('createCollector',collector)));
  };

  deleteCollector(idC: number){
    return this.http.delete(this.apiUrl+"/"+idC);
  };

  addAlbumCollector(idC: number, idA: number, collectorAlbum: CollectorAlbum){
    //console.log(idC, this.apiUrl+"/"+idC+"/albums/"+idA, collectorAlbum);
    let registro = {'price':collectorAlbum['price'],
                  'status':collectorAlbum['status']};
    return this.http.post(this.apiUrl+"/"+idC+"/albums/"+idA, registro);
  };

  getCollectors(): Observable<Collector[]> {
    return this.http.get<Collector[]>(this.apiUrl).pipe(
      map(collectors=>{
        let arrCollectors: Collector[]=[]
        for(let col of collectors){
          arrCollectors.push(
            new Collector(
              col['id'],
              col['name'],
              col['telephone'],
              col['email'],
              [],
              col['favoritePerformers'].map(x=>{
                if (x['birthDate'])
                {
                  return new Musician(x['birthDate'],x['name'],x['description'],x['id'],x['image'],[],[]);
                }
                else
                {
                  return new Band(x['creationDate'],x['name'],x['description'],x['id'],x['image'],[],[])
                }
              }),
              []))
        };
        return arrCollectors
      })
    );
  }

}
