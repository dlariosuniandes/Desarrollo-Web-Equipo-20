import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
//import { ToastrService } from 'ngx-toastr';
import { Collector } from '../collector';
import { CollectorService } from '../collector.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'collector-create',
  templateUrl: './collector-create.component.html',
  styleUrls: ['./collector-create.component.css']
})
export class CollectorCreateComponent implements OnInit {
  collectorForm: FormGroup;
  collectors: Collector[];

  @Output() cancelEvent = new EventEmitter()
  @Output() finishCreation = new EventEmitter()

  constructor(
    private collectorService: CollectorService,
    private formBuilder: FormBuilder,
    private router: Router
  //  private toastr: ToastrService
  ) {

  }

  createCollector(newCollector: Collector) {

    //-----------------------------------------------------------------
    this.collectorService.createCollector(newCollector).subscribe(
      rta =>
      {
        Swal.fire({
          icon: 'success',
          text: 'El coleccionista fue añadido con éxito.'
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
        Swal.fire({
          icon: 'error',
          text: 'El coleccionista no fue añadido!.'
          })
        console.log(error)
      }
     );
    //------------------------------------------------------------------

    this.collectorForm.reset();

  }


  cancelCreation() {
    console.log("Cancelando ...");
    this.collectorForm.reset();
    this.router.navigateByUrl('collectors/list');
  }

  ngOnInit() {
    this.collectorForm = this.formBuilder.group({
      name: ["",[Validators.required, Validators.minLength(2)]],
      telephone: ["",[Validators.required, Validators.minLength(7)]],
      email: ["", [Validators.required, Validators.email]]
    });
  }
}
