import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollectorListarComponent } from './collector-listar/collector-listar.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [CollectorListarComponent],
  exports: [CollectorListarComponent],
})
export class CollectorModule { }
