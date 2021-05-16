import { Component, OnDestroy, OnInit} from '@angular/core';
import { Album } from '../album';
import { AlbumService } from '../album.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Performer } from '../../perfomer/performer';
import { Band } from '../../perfomer/band';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-album-detail',
  templateUrl: './album-detail.component.html',
  styleUrls: ['./album-detail.component.css']
})
export class AlbumDetailComponent implements OnInit, OnDestroy {

  albumDetail: Album
  sub: Subscription
  idAlbum: number
  backUrl: string
  constructor(public albumService:AlbumService, private router: Router, private ar: ActivatedRoute) {
    if(this.router.getCurrentNavigation()?.extras?.state?.backUrl)
    {
      this.backUrl = "/"+this.router.getCurrentNavigation().extras.state.backUrl
    }
    
  }

  ngOnInit(): void {
    this.idAlbum = this.obtenerIdRuta();
    this.sub = this.subServiceAlbum();
  }

  ngOnDestroy()
  {
    if (this.sub)
    {
      this.sub.unsubscribe();
    }

  }

  subServiceAlbum()
  {
    return this.albumService.obtenerAlbumId(this.idAlbum).subscribe(album=> this.albumDetail = album);
  }

  obtenerIdRuta()
  {
    return this.ar.snapshot.params.id
  }

  backList()
  {
    if(this.backUrl)
    {
      this.router.navigateByUrl(this.backUrl);
    }
    else
    {
      this.router.navigateByUrl('albums/list');
    }

  }

  stringArtistas()
  {
    let text = "";
    if(this.albumDetail.darArtistas().length = 1)
    {
      text = this.albumDetail.darArtistas()[0].name;
    }
    else
    {
      for (const artista of this.albumDetail.darArtistas()) {
        text = text + artista.name + "-"
      }
      
    }
    return text;
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
    this.router.navigateByUrl(`/performers/${tipoArtista}/${artista.id}`,{state:{backUrl:`/albums/${this.albumDetail.darId()}`}});
  }

  accionEliminarAlbum()
  {
    Swal.fire(
      {
        title: '¿Esta seguro que desea eliminar el album: '+this.albumDetail.darNombre()+' ?',
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
            this.albumService.eliminarAlbum(this.idAlbum).subscribe(response =>
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
                        this.backList();
                      }
                    }
                )

              },
              error=>
              {
               Swal.fire({
                 text:'Hubo un error al intentar eliminar el album',
                 icon:'warning'
               })
              }
              )
          }
        }
      )

  }
}
