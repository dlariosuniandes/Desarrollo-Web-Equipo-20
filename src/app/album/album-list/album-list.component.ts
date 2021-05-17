import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AlbumService } from '../album.service';
import { Album } from '../album';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-album-list',
  templateUrl: './album-list.component.html',
  styleUrls: ['./album-list.component.css']
})

export class AlbumListComponent implements OnInit, OnDestroy{

  sub: Subscription;
  albums: Array<Album>;
  creatingAlbum: boolean = false;
  constructor(private servicioAlbum: AlbumService, private router: Router) { }

  ngOnInit(): void {
    this.sub = this.startSub()
  }

  ngOnDestroy(): void{
    this.sub.unsubscribe();
  }


  startSub(): Subscription
  {
    return this.servicioAlbum.obtenerAlbums().subscribe(al => {this.albums = al});
  }

  detallarAlbum(index:number)
  {
    this.router.navigateByUrl(`/albums/${this.albums[index].darId()}`)
  }

  crearAlbumOn()
  {
    this.creatingAlbum = !this.creatingAlbum
  }

  reloadComponent()
  {
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);
  }
}
