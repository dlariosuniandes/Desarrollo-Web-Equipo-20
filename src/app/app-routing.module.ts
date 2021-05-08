import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlbumListComponent } from './album/album-list/album-list.component';
import { CollectorListComponent } from './collector/collector-list/collector-list.component';
import { ListComponent } from './perfomer/list/list.component';
import { AlbumDetailComponent } from './album/album-detail/album-detail.component';

const routes: Routes = [
  {path: '', component: AlbumListComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
