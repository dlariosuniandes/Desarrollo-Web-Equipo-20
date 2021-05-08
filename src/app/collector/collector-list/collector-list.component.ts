import { Component, OnInit } from '@angular/core';
import { Collector } from '../collector'
import { CollectorService } from '../collector.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'collector-list',
  templateUrl: './collector-list.component.html',
  styleUrls: ['./collector-list.component.css']
})
export class CollectorListComponent implements OnInit {
  indiceADetallar: number;
  collectors: Array<Collector>;
  constructor(private collectorService: CollectorService, private ar: ActivatedRoute) {
    console.log(ar.snapshot.params.id)
  }
  

  getCollectors(): void {
    this.collectorService.getCollectors()
    .subscribe(collectors => {
      if(this.ar.snapshot.params.id)
      {
        this.collectors = collectors.filter(col => col.darId() == this.ar.snapshot.params.id)
      }
      else
      {
        this.collectors = collectors;
      }
      
    });
  }

  collectorDetail(indexA:number): void {
    this.indiceADetallar = indexA;
  }

  ngOnInit() {
    this.getCollectors();
  }

}
