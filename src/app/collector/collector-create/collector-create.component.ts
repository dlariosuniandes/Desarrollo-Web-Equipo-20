import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Collector } from '../collector';
import { CollectorService } from '../collector.service';

@Component({
  selector: 'collector-create',
  templateUrl: './collector-create.component.html',
  styleUrls: ['./collector-create.component.css']
})
export class CollectorCreateComponent implements OnInit {
  collectorForm: FormGroup;
  collectors: Collector[];


  constructor(
    private collectorService: CollectorService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) {

  }

  createCollector(newCollector: Collector) {
    console.warn("el coleccionista fue creado", newCollector);
    this.showSuccess(newCollector);

    //-----------------------------------------------------------------
    this.collectorService.createCollector(newCollector).subscribe(collector => {
      //this.collectors.push(newCollector);
      this.showSuccess(newCollector);
     });
    //------------------------------------------------------------------

    this.collectorForm.reset();

  }

  showSuccess(c: Collector) {
    this.toastr.success('Creado exitosamente!', `Coleccionista ${c.darNombre}`,{"progressBar": true, timeOut: 4000});
  }

  cancelCreation() {
    console.log("Cancelando ...");
    this.collectorForm.reset();
  }

  ngOnInit() {
    this.collectorForm = this.formBuilder.group({
      name: ["",[Validators.required, Validators.minLength(2)]],
      telephone: ["",[Validators.required, Validators.minLength(7)]],
      email: ["", [Validators.required, Validators.email]]
    });
  }
}
