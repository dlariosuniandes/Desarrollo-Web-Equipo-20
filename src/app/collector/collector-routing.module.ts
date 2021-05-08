import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CollectorListComponent } from './collector-list/collector-list.component';
import { CollectorDetailComponent } from './collector-detail/collector-detail.component';

const routes: Routes = [{
  path: 'collectors',
  children: [
    {
      path: 'list',
      component: CollectorListComponent
    },
    {
      path: 'id',
      component: CollectorDetailComponent,

    },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CollectorRoutingModule { }
