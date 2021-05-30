import { HttpClientModule} from '@angular/common/http';
import { DebugElement } from '@angular/core';
import { async, ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable, of} from 'rxjs';
import Swal, { SweetAlertResult } from 'sweetalert2';
import { PerformerService } from '../perfomer.service';

import { CreateComponent } from './create.component';
import faker from 'faker';

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
    performerService = TestBed.inject(PerformerService) as jasmine.SpyObj<PerformerService>;
    spyOn(component.performerForm, 'reset')
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call create band when perfomer form is filled with  ', fakeAsync(() => {
    let service = spyOn(performerService,'createBand').and.returnValue(of({response:true}))
    let response:SweetAlertResult =
    {
      isConfirmed:true,
      isDenied: false,
      isDismissed: false
    }
    spyOn(Swal,'fire').and.resolveTo(response)
    component.performerForm.setValue({
      performerType: 'Banda',
      name: 'name',
      image: 'https://url.com',
      description: 'test',
      date: new Date(),
    });
    component.crearPerformer();
    expect(service).toHaveBeenCalled();
  }));


  it('should call create musician when perfomer form is filled with musician type',  fakeAsync(() => {
    let service = spyOn(performerService,'createMusician').and.returnValue(of({response:true}))
    let response:SweetAlertResult =
    {
      isConfirmed:true,
      isDenied: false,
      isDismissed: false
    }
    spyOn(Swal,'fire').and.resolveTo(response)
    component.performerForm.setValue({
      performerType: 'Músico',
      name: 'name',
      image: 'https://url.com',
      description: 'test',
      date: new Date(),
    });
    component.crearPerformer();
    expect(service).toHaveBeenCalled();
  }));


  it('expect cancel event function to emit event and reset form', async () => {
    component.cancelCrearPerformer()
    expect(component.performerForm.reset).toHaveBeenCalled();
  });


});
