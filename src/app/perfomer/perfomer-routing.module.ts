import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';
import { CreateComponent } from './create/create.component';
import { AssociateMusicianBandComponent } from './associate-musician-band/associate-musician-band.component';
import { CommonModule } from '@angular/common';

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
        path: 'associate',
        component: AssociateMusicianBandComponent
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
  imports: [RouterModule.forChild(routes), CommonModule],
  exports: [RouterModule],
})
export class PerformerRoutingModule {}
