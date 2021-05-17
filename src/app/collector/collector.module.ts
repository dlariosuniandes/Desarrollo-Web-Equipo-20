import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollectorListComponent } from './collector-list/collector-list.component';
import { CollectorDetailComponent } from './collector-detail/collector-detail.component';
import { CollectorCreateComponent } from './collector-create/collector-create.component';
import { CollectorService } from './collector.service';
import { CollectorAlbumService } from './collectorAlbum.service';
import { CollectorRoutingModule } from './collector-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    CollectorRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [CollectorListComponent, CollectorDetailComponent, CollectorCreateComponent],
  exports: [CollectorListComponent, CollectorDetailComponent, CollectorCreateComponent],
  providers:[CollectorService, CollectorAlbumService]
})
export class CollectorModule { }
