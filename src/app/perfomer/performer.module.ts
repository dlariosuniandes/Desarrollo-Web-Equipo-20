import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';



@NgModule({
  declarations: [ListComponent, DetailComponent],
  imports: [
    CommonModule
  ],
  exports:[ListComponent]
})
export class PerformerModule { }
