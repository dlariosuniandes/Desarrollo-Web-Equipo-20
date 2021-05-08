import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlbumListComponent } from './album/album-list/album-list.component';
import { CollectorListComponent } from './collector/collector-list/collector-list.component';
import { ListComponent } from './perfomer/list/list.component';
import { AlbumDetailComponent } from './album/album-detail/album-detail.component';

const routes: Routes = [
  {path: 'album-list', component: AlbumListComponent},
  {path: 'collector-list', component: CollectorListComponent},
  {path:"album-list/detail/:id", component:AlbumDetailComponent},
  {path: 'performer-list', component: ListComponent},
  {path: '', redirectTo:'/album-list', pathMatch: 'full'},
  {path: '**', redirectTo:'/album-list'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
