import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';
import { CreateComponent } from './create/create.component';

const routes: Routes = [
  {
    path: 'performers',
    children: [
      {
        path: 'list',
        component: ListComponent,
      },
      {
        path: 'band/:id',
        component: DetailComponent,
      },
      {
        path: 'musician/:id',
        component: DetailComponent,
      },
      {
        path: 'create',
        component: CreateComponent
      },
      {
        path: '',
        redirectTo: '/performers/list',
        pathMatch: 'full'
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PerformerRoutingModule {}
