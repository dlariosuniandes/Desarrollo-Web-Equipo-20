import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Collector } from './collector';

@Injectable({
  providedIn: 'root'
})
export class CollectorService {
  private apiUrl: string = environment.backUrl + 'collectors';
  constructor(private http: HttpClient) { }

  getCollectors(): Observable<Collector[]> {
    return this.http.get<Collector[]>(this.apiUrl).pipe(
      map(collectors=>{
        let arrCollectors: Collector[]=[]
        for(let col of collectors){
          arrCollectors.push(new Collector(col['name'],col['telephone'],col['email']))
        };
        return arrCollectors
      })
    );
  }

}
