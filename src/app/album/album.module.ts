import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlbumListComponent } from './album-list/album-list.component';
import { AlbumService } from './album.service';
import { HttpClientModule } from '@angular/common/http';
import { AlbumDetailComponent } from './album-detail/album-detail.component';
import { AppRoutingModule } from '../app-routing.module';
import { AlbumRoutingModule } from './album-routing.module';



@NgModule({
  declarations: [AlbumListComponent, AlbumDetailComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    AppRoutingModule,
    AlbumRoutingModule
  ],
  providers:[AlbumService],
  exports:
  [
    AlbumListComponent, AlbumDetailComponent
  ]
})
export class AlbumModule { }
