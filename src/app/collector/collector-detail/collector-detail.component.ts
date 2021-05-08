import { Component, Input, OnInit } from '@angular/core';
import { Performer } from 'src/app/perfomer/performer';
import { Collector } from '../collector';
import { CollectorAlbum } from '../collectorAlbum';
import { CollectorAlbumService } from '../collectorAlbum.service';
import { Router } from '@angular/router';
import { Band } from '../../perfomer/band';



@Component({
  selector: 'app-collector-detail',
  templateUrl: './collector-detail.component.html',
  styleUrls: ['./collector-detail.component.css']
})
export class CollectorDetailComponent implements OnInit {

  @Input() collectorDetail: Collector;
  @Input () collectorsLength: number;
  collectorAlbums: Array<CollectorAlbum>;

  constructor(private collectorAlbumService: CollectorAlbumService, private router: Router) { }


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

  navegarAlbum(id: number)
  {
    if(this.collectorsLength>1)
    {
      this.router.navigateByUrl('/albums/' + id,{state:{backUrl:`/collectors/list`}});
    }
    else{
      this.router.navigateByUrl('/albums/' + id,{state:{backUrl:`/collectors/${this.collectorDetail.darId()}`}});
    }
  }
  navegarArtista(artista: Performer)
  {
    let tipoArtista:string = ''
    if(artista instanceof Band)
    {
      tipoArtista = "band"
    }else
    {
      tipoArtista = "musician"
    }

    if(this.collectorsLength>1)
    {
      this.router.navigateByUrl(`/performers/${tipoArtista}/${artista.id}`,{state:{backUrl:`/collectors/list`}});
    }
    else{
      this.router.navigateByUrl(`/performers/${tipoArtista}/${artista.id}`,{state:{backUrl:`/collectors/${this.collectorDetail.darId()}`}});
    }
  }
}
