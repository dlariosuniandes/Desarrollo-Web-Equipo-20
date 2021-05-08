import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlbumListComponent } from './album-list/album-list.component';
import { AlbumDetailComponent } from './album-detail/album-detail.component';



const routes: Routes = [
  {
    path: 'albums',
    children:[
      {
        path: 'list', component:AlbumListComponent
      },
      {
        path: ':id', component:AlbumDetailComponent
      },
      {
        path: '', redirectTo:'list',pathMatch: 'full'
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AlbumRoutingModule { }
