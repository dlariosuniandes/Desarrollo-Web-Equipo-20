import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';
import { PerformerRoutingModule } from './perfomer-routing.module';



@NgModule({
  declarations: [ListComponent, DetailComponent],
  imports: [
    CommonModule,
    PerformerRoutingModule
  ],
  exports:[ListComponent]
})
export class PerformerModule { }
