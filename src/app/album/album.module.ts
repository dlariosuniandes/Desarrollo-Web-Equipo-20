import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlbumListComponent } from './album-list/album-list.component';
import { AlbumService } from './album.service';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [AlbumListComponent],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers:[AlbumService],
  exports:
  [
    AlbumListComponent
  ]
})
export class AlbumModule { }
