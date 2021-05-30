import { HttpClientModule, HttpResponse } from '@angular/common/http';
import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable, scheduled } from 'rxjs';
import Swal, { SweetAlertCustomClass } from 'sweetalert2';
import { PerformerService } from '../perfomer.service';

import { CreateComponent } from './create.component';

describe('CreateComponent', () => {
  let component: CreateComponent;
  let fixture: ComponentFixture<CreateComponent>;
  let debElement: DebugElement;
  let htmlMock: HTMLElement;
  let performerService: jasmine.SpyObj<PerformerService>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreateComponent],
      imports: [FormsModule, ReactiveFormsModule, HttpClientModule],
      providers: [Swal],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    debElement = fixture.debugElement;
    htmlMock = debElement.nativeElement;
    performerService = TestBed.get(PerformerService);
    spyOn(performerService, 'createBand').and.returnValue({
      subscribe: () => new Observable<any>(),
    } as any)
    spyOn(performerService, 'createMusician').and.returnValue({
      subscribe: () => new Observable<any>(),
    } as any)
    spyOn(component.performerForm, 'reset')
    spyOn(Swal, 'fire')
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call create band when perfomer form is filled with  ', async () => {
    component.performerForm.setValue({
      performerType: 'Banda',
      name: 'name',
      image: 'https://url.com',
      description: 'test',
      date: new Date(),
    });
    component.crearPerformer();
    expect(performerService.createBand).toHaveBeenCalled();
    performerService.createBand({}).subscribe((test) => {
      expect(Swal.fire).toHaveBeenCalled()
    })
  });


  it('should call create musician when perfomer form is filled with musician type', async () => {
    component.performerForm.setValue({
      performerType: 'Músico',
      name: 'name',
      image: 'https://url.com',
      description: 'test',
      date: new Date(),
    });
    await component.crearPerformer();
    expect(performerService.createMusician).toHaveBeenCalled();

    performerService.createMusician({}).subscribe((test) => {
      expect(Swal.fire).toHaveBeenCalled()
    })
  });


  it('expect cancel event function to emit event and reset form', async () => {
    component.cancelCrearPerformer()
    expect(component.performerForm.reset).toHaveBeenCalled();
  });

});
