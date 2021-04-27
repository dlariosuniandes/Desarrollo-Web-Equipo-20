import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlbumListComponent } from './album/album-list/album-list.component';
import { CollectorListarComponent } from './collector/collector-listar/collector-listar.component';

const routes: Routes = [
  {path: 'album-list', component: AlbumListComponent},
  {path: 'collector-listar', component: CollectorListarComponent},
  {path: '', redirectTo:'/album-list', pathMatch: 'full'},
  {path: '**', redirectTo:'/album-list'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
