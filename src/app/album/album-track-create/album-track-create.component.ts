import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlbumService } from '../album.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-album-track-create',
  templateUrl: './album-track-create.component.html',
  styleUrls: ['./album-track-create.component.css']
})
export class AlbumTrackCreateComponent implements OnInit {

  @Output() cancelEvent = new EventEmitter()
  @Output() finishCreation = new EventEmitter()
  @Input() idAlbum:number

  get nombreTrack()
  {
    return this.createTrackForm.get('nombre')
  }

  get duracionTrack()
  {
    return this.createTrackForm.get('duracion')
  }

  createTrackForm: FormGroup
  constructor(private fb: FormBuilder, private as: AlbumService, private router: Router) { }

  ngOnInit(): void {
    this.createTrackForm = this.fb.group(
      {
        nombre:['',[Validators.required, Validators.minLength(2)]],
        duracion:['',[Validators.required]]
      }
    )
  }

  crearTrack()
  {
    const track = 
    {
      name: this.nombreTrack.value,
      duration: ((this.duracionTrack.value-(this.duracionTrack.value%60))/60)+":"+ (this.duracionTrack.value%60)
    }
    Swal.showLoading()
    this.as.crearTrack(this.idAlbum,track).subscribe(
      r=>
      {
        Swal.fire({
          text:'Se creo correctamente el track en el album actual',
          icon:'success'
        }).then(
          r=>
          {
            if (r.isConfirmed)
            {
              document.querySelector<HTMLButtonElement>("button.cancel-button").click()
              this.finishCreation.emit()
            }
          }
        )
      },
      error =>
      {

      }
    )
  }


}
