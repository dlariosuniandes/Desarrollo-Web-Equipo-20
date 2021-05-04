import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollectorListComponent } from './collector-list/collector-list.component';
import { CollectorDetailComponent } from './collector-detail/collector-detail.component';
import { CollectorService } from './collector.service';
import { CollectorAlbumService } from './collectorAlbum.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [CollectorListComponent, CollectorDetailComponent],
  exports: [CollectorListComponent, CollectorDetailComponent],
  providers:[CollectorService, CollectorAlbumService]
})
export class CollectorModule { }
