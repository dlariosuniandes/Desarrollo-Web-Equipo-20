import { Component, Input, OnInit } from '@angular/core';
import { Performer } from 'src/app/perfomer/performer';
import { Collector } from '../collector';
import { CollectorAlbum } from '../collectorAlbum';
import { CollectorAlbumService } from '../collectorAlbum.service';
import { Router } from '@angular/router';
import { Band } from '../../perfomer/band';
import { CollectorService } from '../collector.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-collector-detail',
  templateUrl: './collector-detail.component.html',
  styleUrls: ['./collector-detail.component.css']
})
export class CollectorDetailComponent implements OnInit {

  @Input() collectorDetail: Collector;
  @Input () collectorsLength: number;
  collectorAlbums: Array<CollectorAlbum>;

  constructor(private collectorAlbumService: CollectorAlbumService, private collectorService: CollectorService, private router: Router) { }


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

  borrarColeccionista(id: number){
    Swal.fire(
      {
        title: '¿Esta seguro que desea eliminar el album: '+this.collectorDetail.darNombre()+' ?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText:'Seguro!',
        cancelButtonText:'Cancelar',
        cancelButtonColor: '#FF0000',
        confirmButtonColor: '#008000',
      }
    ).then((r)=>
        {
          if(r.isConfirmed)
          {
            this.collectorService.deleteCollector(id).subscribe(response =>
              {
                Swal.fire(
                  {
                    text:'Se elimino correctamente el album',
                    icon: 'success'
                  }
                ).then(r=>
                    {
                      if(r.isConfirmed)
                      {
                        this.router.navigateByUrl('collectors/');
                        this.router.onSameUrlNavigation = 'reload';
                      }
                    }
                )

              },
              error=>
              {
               Swal.fire({
                 text:'Hubo un error al intentar eliminar el coleccionista',
                 icon:'warning'
               })
              }
              )
          }
        }
      )

  };

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
