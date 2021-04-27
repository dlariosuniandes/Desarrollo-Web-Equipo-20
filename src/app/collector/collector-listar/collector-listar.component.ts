import { Component, OnInit } from '@angular/core';
import { Collector } from '../collector'
import { CollectorService } from '../collector.service';

@Component({
  selector: 'collector-listar',
  templateUrl: './collector-listar.component.html',
  styleUrls: ['./collector-listar.component.css']
})
export class CollectorListarComponent implements OnInit {
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
