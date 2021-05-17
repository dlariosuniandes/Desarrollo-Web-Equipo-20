import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';
import { GENRE, RECORD_LABEL } from '../album';
import { AlbumService } from '../album.service';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';

@Component({
  selector: 'app-album-create',
  templateUrl: './album-create.component.html',
  styleUrls: ['./album-create.component.css']
})
export class AlbumCreateComponent implements OnInit, OnDestroy {

  @Output() cancelEvent = new EventEmitter()
  @Output() finishCreation = new EventEmitter()
  createAlbumForm:FormGroup
  genero=[GENRE.CLASSICAL,GENRE.FOLK,GENRE.ROCK,GENRE.SALSA]
  sello=[RECORD_LABEL.DF,RECORD_LABEL.ELEKTRA, RECORD_LABEL.EMI,RECORD_LABEL.FANIA,RECORD_LABEL.SONY]

  get nombreAlbum()
  {
    return this.createAlbumForm.get('nombreAlbum')
  }

  get urlAlbum()
  {
    return this.createAlbumForm.get('urlAlbum')
  }

  get fechaPublicacion()
  {
    return this.createAlbumForm.get('fechaPublicacion')
  }
  get descripcion()
  {
    return this.createAlbumForm.get('descripcion')
  }

  get genre()
  {
    return this.createAlbumForm.get('genero')
  }

  get seal()
  {
    return this.createAlbumForm.get('sello')
  }
  constructor(private fb: FormBuilder, private as: AlbumService, private router: Router) {
    this.construirFormulario()
  }

  ngOnInit(): void {
  }

  ngOnDestroy():void{
  }

  emitCancelEvent()
  {
    this.cancelEvent.emit();
  }

  construirFormulario()
  {
    this.createAlbumForm = this.fb.group(
      {
        nombreAlbum:['',[Validators.required,Validators.minLength(3)]],
        urlAlbum: ['',[Validators.required, this.validarUrl]],
        fechaPublicacion: ['', [Validators.required, this.validarFecha]],
        descripcion:['',[Validators.required]],
        genero:['',[Validators.required]],
        sello:['',[Validators.required]]
      }
    )
  }
validarUrl(url:AbstractControl)
  {
      const urlString:string = url.value
      let esValido = false
      if ((urlString.search('www')!=-1) || (urlString.search('http')!=-1))
      {
        esValido = true
      }
      return esValido ? null:{'invalidUrl':true}
    
  }

  validarFecha(fecha:FormControl)
  {
    const inDate = new Date(fecha.value)
    const today = new Date()
    if (inDate > today)
    {
      return {'response':true}
    }
    else
    {
      return null
    }
  }

  crearAlbum()
  {
    const albumNuevo = {
      name: this.nombreAlbum.value,
      cover: this.urlAlbum.value,
      releaseDate: this.fechaPublicacion.value,
      description: this.descripcion.value,
      genre: this.genre.value,
      recordLabel: this.seal.value
    }
    this.as.agregarAlbum(albumNuevo).subscribe(
        rta => 
          {
            Swal.fire({
              icon: 'success',
              text: 'El Album fue añadido con éxito.'
            }).then(r=>
              {
                if (r.isConfirmed)
                {
                  document.querySelector<HTMLButtonElement>('.cancel-button').click()
                  this.finishCreation.emit()
                }
              }
            )
          },
        error =>
          {
            console.log(error)
          }
      )
  }
}
