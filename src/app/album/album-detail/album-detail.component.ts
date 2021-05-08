import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Album } from '../album';
import { AlbumService } from '../album.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CollectorService } from '../../collector/collector.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-album-detail',
  templateUrl: './album-detail.component.html',
  styleUrls: ['./album-detail.component.css']
})
export class AlbumDetailComponent implements OnInit, OnDestroy {

  albumDetail: Album
  sub: Subscription
  idAlbum: number
  constructor(public albumService:AlbumService, private router: Router, private ar: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.idAlbum = this.obtenerIdRuta();
    this.sub = this.subServiceAlbum();
  }

  ngOnDestroy()
  {
    if (this.sub)
    {
      this.sub.unsubscribe();
    }

  }

  subServiceAlbum()
  {
    return this.albumService.obtenerAlbumId(this.idAlbum).subscribe(album=> this.albumDetail = album);
  }

  obtenerIdRuta()
  {
    return this.ar.snapshot.params.id
  }

  backList()
  {
    this.router.navigateByUrl('album-list');
  }

  stringArtistas()
  {
    let text = "";
    if(this.albumDetail.darArtistas().length = 1)
    {
      text = this.albumDetail.darArtistas()[0].name;
    }
    else
    {
      for (const artista of this.albumDetail.darArtistas()) {
        text = text + artista.name + "-"
      }
      
    }
    return text;
  }


}