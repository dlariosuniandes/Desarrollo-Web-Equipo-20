import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AlbumService } from '../album.service';

@Component({
  selector: 'app-album-list',
  templateUrl: './album-list.component.html',
  styleUrls: ['./album-list.component.css']
})
export class AlbumListComponent implements OnInit {

  constructor(private servicioAlbum: AlbumService) { }

  ngOnInit(): void {
  }

  startSub(): Subscription
  {
    return this.servicioAlbum.obtenerAlbums().subscribe()
  }
}
