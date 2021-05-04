import { Component, Input, OnInit } from '@angular/core';
import { Performer } from 'src/app/perfomer/performer';
import { Collector } from '../collector';
import { CollectorAlbum } from '../collectorAlbum';
import { CollectorAlbumService } from '../collectorAlbum.service';



@Component({
  selector: 'app-collector-detail',
  templateUrl: './collector-detail.component.html',
  styleUrls: ['./collector-detail.component.css']
})
export class CollectorDetailComponent implements OnInit {

  @Input() collectorDetail: Collector;
  collectorAlbums: Array<CollectorAlbum>;

  constructor(private collectorAlbumService: CollectorAlbumService) { }


  getCollectorAlbums(id:number): void {
    this.collectorAlbumService.getCollectorAlbums(id)
    .subscribe(collectorAlbums => {
      this.collectorAlbums = collectorAlbums;
    });
  }

  ngOnChanges(): void{
    
  }
  ngOnInit() {
    this.getCollectorAlbums(this.collectorDetail.darId())
  }

}
