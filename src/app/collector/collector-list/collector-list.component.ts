import { Component, OnInit } from '@angular/core';
import { Collector } from '../collector'
import { CollectorService } from '../collector.service';

@Component({
  selector: 'collector-list',
  templateUrl: './collector-list.component.html',
  styleUrls: ['./collector-list.component.css']
})
export class CollectorListComponent implements OnInit {
  indiceADetallar: number;
  constructor(private collectorService: CollectorService) { }
  collectors: Array<Collector>;

  getCollectors(): void {
    this.collectorService.getCollectors()
    .subscribe(collectors => {
      this.collectors = collectors;
    });
  }

  collectorDetail(indexA:number): void {
    this.indiceADetallar = indexA;
  }

  ngOnInit() {
    this.getCollectors();
  }

}
