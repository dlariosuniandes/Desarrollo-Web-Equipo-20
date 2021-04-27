import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlbumListComponent } from './album/album-list/album-list.component';
import { CollectorListarComponent } from './collector/collector-listar/collector-listar.component';
import { ListComponent } from './artists/list/list.component';

const routes: Routes = [
  {path: 'album-list', component: AlbumListComponent},
  {path: 'collector-listar', component: CollectorListarComponent},
  {path: 'bands-list', component: ListComponent},
  {path: '', redirectTo:'/album-list', pathMatch: 'full'},
  {path: '**', redirectTo:'/album-list'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
