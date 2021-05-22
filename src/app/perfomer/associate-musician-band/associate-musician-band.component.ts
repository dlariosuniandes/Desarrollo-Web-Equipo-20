import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Band } from '../band';
import { Musician } from '../musician';
import { PerformerService } from '../perfomer.service';

@Component({
  selector: 'app-associate-musician-band',
  templateUrl: './associate-musician-band.component.html',
  styleUrls: ['./associate-musician-band.component.css'],
})
export class AssociateMusicianBandComponent implements OnInit {
  @Output() cancelEvent = new EventEmitter();
  @Output() finishCreation = new EventEmitter();
  @Input() currentMusician: Musician | Band;
  associateMusicianForm: FormGroup;
  formBuilder: FormBuilder;
  performerService: PerformerService;
  bands: Band[];
  constructor(formBuilder: FormBuilder, perfomerService: PerformerService) {
    this.formBuilder = formBuilder;
    this.performerService = perfomerService;
  }

  ngOnInit(): void {
    this.getBandList();
    this.associateMusicianForm = this.formBuilder.group({
      band: ['', [Validators.required]],
    });
  }

  async associateMusician() {
    console.log(this.currentMusician);
    const musicianId = this.currentMusician.id;
    const bandId = this.associateMusicianForm.get('band').value;
    this.performerService.associateMusician(bandId, musicianId).subscribe(
      (rta) => {
        Swal.fire({
          icon: 'success',
          text: 'El Musico fue asociado con éxito',
        }).then((r) => {
          if (r.isConfirmed) {
            document.querySelector<HTMLButtonElement>('.cancel-button').click();
            this.finishCreation.emit();
          }
        });
      },
      (err) => console.log(err)
    );
    this.associateMusicianForm.reset();
  }

  cancelAssociation() {
    this.cancelEvent.emit();
    this.associateMusicianForm.reset();
  }

  async getBandList() {
    this.performerService.getBands().subscribe((cs) => {
      this.bands = cs;
    });
  }
}
