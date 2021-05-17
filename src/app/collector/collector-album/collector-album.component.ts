import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
//import { ToastrService } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Collector } from '../collector';
import { CollectorService } from '../collector.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'collector-album',
  templateUrl: './collector-album.component.html',
  styleUrls: ['./collector-album.component.css']
})
export class CollectorAlbumComponent implements OnInit {
  addAlbumCollectorForm: FormGroup;
  collectors: Collector[];

  @Output() cancelEvent = new EventEmitter();
  @Output() finishCreation = new EventEmitter();

  constructor(
    private collectorService: CollectorService,
    private formBuilder: FormBuilder,
    private router: Router
  //  private toastr: ToastrService
  ) {

  }

  addAlbumCollector(collectorId: number, albumId: number) {

    //-----------------------------------------------------------------
    this.collectorService.addAlbumCollector(collectorId,albumId).subscribe(
      rta =>
      {
        Swal.fire({
          icon: 'success',
          text: 'El album fue añadido al coleccionista con éxito.'
        }).then(r=>
          {
            if (r.isConfirmed)
            {

              this.router.navigateByUrl('collectors/list');
            }
          }
        )
      },
    error =>
      {
        console.log(error)
      }
     );
    //------------------------------------------------------------------

    this.addAlbumCollectorForm.reset();

  }
  emitCancelEvent()
  {
    this.cancelEvent.emit();
  }


  ngOnInit() {
    this.addAlbumCollectorForm = this.formBuilder.group({
      price: ["",[Validators.required, Validators.min(10)]],
      status: ["",[Validators.required]],
      album: ["", [Validators.required]]
    });
  }

}
