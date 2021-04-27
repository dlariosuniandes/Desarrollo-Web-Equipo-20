import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Musician } from './musician';
import { Band } from './band'
import {environment} from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class ArtistsService {
  private url = environment.backUrl 

  constructor( private http: HttpClient) { }

  getMusicians(): Observable<Musician[]> {
    const methodUrl = this.url + "musicians"
    return this.http.get<Musician[]>(methodUrl);
  }

  getBands(): Observable<Band[]> {
    const methodUrl = this.url + "bands"
    return this.http.get<Band[]>(methodUrl)
  }
}
