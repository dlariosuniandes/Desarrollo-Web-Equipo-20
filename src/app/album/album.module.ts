import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlbumListComponent } from './album-list/album-list.component';
import { AlbumService } from './album.service';
import { HttpClientModule } from '@angular/common/http';
import { AlbumDetailComponent } from './album-detail/album-detail.component';
import { AppRoutingModule } from '../app-routing.module';
import { AlbumRoutingModule } from './album-routing.module';
import { AlbumCreateComponent } from './album-create/album-create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [AlbumListComponent, AlbumDetailComponent, AlbumCreateComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    AppRoutingModule,
    AlbumRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers:[AlbumService],
  exports:
  [
    AlbumListComponent, AlbumDetailComponent, AlbumCreateComponent
  ]
})
export class AlbumModule { }
