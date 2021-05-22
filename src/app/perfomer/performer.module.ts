import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';
import { PerformerRoutingModule } from './perfomer-routing.module';
import { CreateComponent } from './create/create.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ListComponent, DetailComponent, CreateComponent],
  imports: [CommonModule, PerformerRoutingModule,ReactiveFormsModule],
  exports: [ListComponent],
})
export class PerformerModule {}
