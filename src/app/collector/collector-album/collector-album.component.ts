import { Component, OnInit, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
//import { ToastrService } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Collector } from '../collector';
import { CollectorService } from '../collector.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { AlbumService } from 'src/app/album/album.service';
import { Album } from 'src/app/album/album';
import { ALBUM_STATUS, CollectorAlbum } from '../collectorAlbum';


@Component({
  selector: 'collector-album',
  templateUrl: './collector-album.component.html',
  styleUrls: ['./collector-album.component.css']
})
export class CollectorAlbumComponent implements OnInit {
  addAlbumCollectorForm: FormGroup;
  status=[ALBUM_STATUS.ACTIVE, ALBUM_STATUS.INACTIVE];
  collectors: Collector[];
  albums: Array<Album>;
  sub: Subscription;

  @Input() collectorDetail: Collector;
  @Output() cancelEvent = new EventEmitter();
  @Output() finishCreation = new EventEmitter();

  constructor(
    private collectorService: CollectorService,
    private albumService: AlbumService,
    private formBuilder: FormBuilder,
    private router: Router
  //  private toastr: ToastrService
  ) {

  }

  addAlbumCollector(albumId: number, collectorAlbum: CollectorAlbum) {

    //-----------------------------------------------------------------
    this.collectorService.addAlbumCollector(this.collectorDetail.darId(),albumId, collectorAlbum).subscribe(
      rta =>
      {
        Swal.fire({
          icon: 'success',
          text: 'El album fue añadido al coleccionista con éxito.'
        }).then(r=>
          {
            if (r.isConfirmed)
            {
              document.querySelector<HTMLButtonElement>('.cancel-button').click()
              this.finishCreation.emit()
              this.router.navigateByUrl('collectors/');
            }
          }
        )
      },
    error =>
      {
        Swal.fire({
        icon: 'error',
        text: 'El album no fue añadido al coleccionista!.'
        })
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

  getAlbums(): Subscription
  {
    return this.albumService.obtenerAlbums().subscribe(al => {this.albums = al});
  }

  ngOnInit() {
    this.sub = this.getAlbums();
    this.addAlbumCollectorForm = this.formBuilder.group({
      price: ["",[Validators.required, Validators.min(10)]],
      status: ["",[Validators.required]],
      album: ["", [Validators.required]]
    });
  }

  ngOnDestroy(): void{
    this.sub.unsubscribe();
  }

}
