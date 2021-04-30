import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import { Album, Track } from './album';
import { environment } from '../../environments/environment';
import { Artist } from '../artists/artist';
import { Musician } from '../artists/musician';
import { Band } from '../artists/band';
import { Comment } from '../comentario/comment';

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
              let performers:Array<Artist> = []
              let comments: Array<Comment> = [];
              albumi['tracks'].forEach(x => tracks.push(new Track(x['name'],x['duration'])));
              albumi['performers'].forEach(x=>
                {
                  if (x['birthDate'])
                  {
                    performers.push(new Musician(x['birthDate'],x['name'],x['description'],x['id'],x['image'],[],[]))
                  }
                  else
                  {
                    performers.push(new Band(x['creationDate'],x['name'],x['description'],x['id'],x['image'],[],[]))
                  }
                });
                albumi['comments'].forEach(x=> comments.push(new Comment(x['id'],x['description'],x['rating'])))
              return albumi = new Album(
                albumi['name'],
                albumi['cover'],
                albumi['releaseDate'],
                albumi['description'],
                albumi['genre'],
                albumi['recordLabel'],
                tracks,
                performers,
                comments
                );
            }
          );
        return  newArray
      }
      )
    );
  }
}
