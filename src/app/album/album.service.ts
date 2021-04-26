import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import { Album, Track } from './album';
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
    return this.http.get<Album[]>(this.urlBack).pipe(map(albumArray=>{
      
        let newArray = albumArray.map(albumi =>
            {
              let tracks:Array<Track> = [];
              albumi['tracks'].forEach(x => tracks.push(new Track(x['name'],x['duration'])));
              return albumi = new Album(
                albumi['name'],
                albumi['cover'],
                albumi['releaseDate'],
                albumi['description'],
                albumi['genre'],
                albumi['recordLabel'],
                tracks
                );
            }
          );
        return  newArray
      }
      )
    );
  }
}
