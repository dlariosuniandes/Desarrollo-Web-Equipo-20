import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Album } from './album';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {
  
  private urlBack = environment.backUrl + 'Albums'
  constructor(private http: HttpClient) { }

  verifiarHttp()
  {
    if(this.http instanceof HttpClient)
    {
      return true;
    }
    else
    {
      return false
    }
  }

  obtenerAlbums():Observable<Album[]>
  {
    return this.http.get<Album[]>(this.urlBack);
  }
}
