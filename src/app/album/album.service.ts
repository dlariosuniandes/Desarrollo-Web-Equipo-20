import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import { Album, Track } from './album';
import { environment } from '../../environments/environment';
import { Performer } from '../perfomer/performer';
import { Musician } from '../perfomer/musician';
import { Band } from '../perfomer/band';
import { Comment } from '../comentario/comment';
import { stringify } from '@angular/compiler/src/util';

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
              let performers:Array<Performer> = []
              let comments: Array<Comment> = [];
              albumi['tracks'].forEach(x => tracks.push(new Track(x['id'],x['name'],x['duration'])));
              albumi['performers'].forEach(x=>
                {
                  if (x['birthDate'])
                  {
                    performers.push(new Musician(x['birthDate'],x['name'],x['description'],x['id'],x['image']))
                  }
                  else
                  {
                    performers.push(new Band(x['creationDate'],x['name'],x['description'],x['id'],x['image']))
                  }
                });
                albumi['comments'].forEach(x=> comments.push(new Comment(x['id'],x['description'],x['rating'])))
              return albumi = new Album(
                albumi['id'],
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

  obtenerAlbumId(id: number)
  {
    return this.http.get<Album>(this.urlBack+`/`+id).pipe(map(album=>{
            let tracks:Array<Track> = [];
            let performers:Array<Performer> = []
            let comments: Array<Comment> = [];
            album['tracks'].forEach(x => tracks.push(new Track(x['id'],x['name'],x['duration'])));
            album['performers'].forEach(x=>
              {
                if (x['birthDate'])
                {
                  performers.push(new Musician(x['birthDate'],x['name'],x['description'],x['id'],x['image']))
                }
                else
                {
                  performers.push(new Band(x['creationDate'],x['name'],x['description'],x['id'],x['image']))
                }
              });
              album['comments'].forEach(x=> comments.push(new Comment(x['id'],x['description'],x['rating'])))
            return new Album(
              album['id'],
              album['name'],
              album['cover'],
              album['releaseDate'],
              album['description'],
              album['genre'],
              album['recordLabel'],
              tracks,
              performers,
              comments
              );
          }
    
    )
  );
  }

  agregarAlbum(album:Object)
  {
    const rta = this.http.post(this.urlBack,album);
    return rta;
  }

  eliminarAlbum(id: number)
  {
    return this.http.delete(this.urlBack+"/"+id)
  }
  crearTrack(idAlbum:number, track:Object)
  {
    return this.http.post(this.urlBack+"/"+idAlbum+"/tracks",track)
  }
  eliminarTrack(idAlbum:number,idTrackEliminar:number)
  {
    return this.http.delete(this.urlBack+"/"+idAlbum+"/tracks/"+idTrackEliminar)
  }
}
