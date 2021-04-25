import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AlbumService } from '../album.service';
import { Album } from '../album';

@Component({
  selector: 'app-album-list',
  templateUrl: './album-list.component.html',
  styleUrls: ['./album-list.component.css']
})
export class AlbumListComponent implements OnInit {

  sub: Subscription;
  albums: Array<Album>
  constructor(private servicioAlbum: AlbumService) { }

  ngOnInit(): void {
    this.sub = this.startSub()
  }

  startSub(): Subscription
  {
    return this.servicioAlbum.obtenerAlbums().subscribe(al => this.albums = al);
  }
}
