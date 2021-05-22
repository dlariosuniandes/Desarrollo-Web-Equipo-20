import { Component, OnInit, Output, EventEmitter, OnChanges } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import Swal from 'sweetalert2';
import { PerformerService } from '../perfomer.service';

@Component({
  selector: 'performer-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit {
  @Output() cancelEvent = new EventEmitter();
  @Output() finishCreation = new EventEmitter();
  performerForm: FormGroup;
  formBuilder: FormBuilder;
  perfomerService: PerformerService;
  optionsControl: any;
  typePerfomer = ["Músico", "Banda"]
  constructor(formBuilder: FormBuilder, perfomerService: PerformerService) {
    this.formBuilder = formBuilder;
    this.perfomerService = perfomerService;
  }

  ngOnInit(): void {
    this.performerForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      image: ['', [Validators.required, this.urlValidator]],
      description: ['', [Validators.required]],
      date: ['', [Validators.required]],
      performerType: ['', [Validators.required]]
    });
  }

  crearPerformer() {
    if (this.performerForm.get('performerType').value === 'Banda') {
      const newBand = {
        name: this.performerForm.get('name').value,
        image: this.performerForm.get('image').value,
        description: this.performerForm.get('description').value,
        creationDate: this.performerForm.get('date').value,
      };
      this.perfomerService.createBand(newBand).subscribe(
        (rta) => {
          Swal.fire({
            icon: 'success',
            text: 'El Perfomer fue añadido con éxito',
          }).then((r) => {
            if (r.isConfirmed) {
              document
                .querySelector<HTMLButtonElement>('.cancel-button')
                .click();
              this.finishCreation.emit();
            }
          });
        },
        (err) => console.log(err)
      );
    }

    if (this.performerForm.get('performerType').value === 'Músico') {
      const newMusician = {
        name: this.performerForm.get('name').value,
        image: this.performerForm.get('image').value,
        description: this.performerForm.get('description').value,
        birthDate: this.performerForm.get('date').value,
      };
      this.perfomerService.createMusician(newMusician).subscribe(
        (rta) => {
          Swal.fire({
            icon: 'success',
            text: 'El Perfomer fue añadido con éxito',
          }).then((r) => {
            if (r.isConfirmed) {
              document
                .querySelector<HTMLButtonElement>('.cancel-button')
                .click();
              this.finishCreation.emit();
            }
          });
        },
        (err) => console.log(err)
      );
    }
    this.performerForm.reset();
  }

  cancelCrearPerformer() {
    this.cancelEvent.emit()
    this.performerForm.reset();
  }

  urlValidator(url: AbstractControl) {
    const regExp =
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
    const notUrl = regExp.test(url.value);
    return !notUrl ? { invalidUrl: true } : null;
  }
}
