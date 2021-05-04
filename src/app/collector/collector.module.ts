import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollectorListComponent } from './collector-list/collector-list.component';
import { CollectorDetailComponent } from './collector-detail/collector-detail.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [CollectorListComponent, CollectorDetailComponent],
  exports: [CollectorListComponent, CollectorDetailComponent],
})
export class CollectorModule { }
