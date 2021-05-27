/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import faker from "faker";

import { CollectorCreateComponent } from './collector-create.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AppRoutingModule } from '../../app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { Collector } from '../collector';
import { Band } from 'src/app/perfomer/band';
import { CollectorAlbum } from '../collectorAlbum';
import { CollectorService } from '../collector.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

describe('CollectorCreateComponent', () => {
  let component: CollectorCreateComponent;
  let fixture: ComponentFixture<CollectorCreateComponent>;
  let debElement: DebugElement
  let htmlMock: HTMLElement
  let collectorService: jasmine.SpyObj<CollectorService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollectorCreateComponent ],
      imports:[ReactiveFormsModule, HttpClientTestingModule, AppRoutingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectorCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    debElement = fixture.debugElement;
    htmlMock = debElement.nativeElement;
    collectorService = TestBed.get(CollectorService);
    spyOn(collectorService, 'createCollector').and.returnValue({
      subscribe: () => new Observable<any>(),
    } as any)
    router = TestBed.get(Router);
    spyOn(router,'navigateByUrl')
    spyOn(component.collectorForm,'reset')
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    const espia = spyOn(component,'ngOnInit')
    component.ngOnInit();
    expect(espia.calls.count()).toEqual(1)
  });

  it('Cancela la creación de un coleccionista se acciona al presionar el boton cancelar',()=>
  {
    const cancelButton=htmlMock.querySelector<HTMLButtonElement>("button.cancel-button");
    let spyFunc = spyOn(component,'cancelCreation');
    cancelButton.click()
    expect(spyFunc.calls.count()).toEqual(1);
  })

  it('se acciona la función crear coleccionista al llenar los campos y dar click en crear',()=>
  {
    const mockCollector = new Collector(
      faker.datatype.number(),
      faker.name.findName(),
      faker.phone.phoneNumber(),
      faker.internet.email(),
      [],
      [new Band(faker.date.past(),faker.name.firstName(),faker.lorem.text(),faker.datatype.number(),faker.image.imageUrl())],
      [new CollectorAlbum(faker.datatype.number(),faker.datatype.number(),faker.lorem.text())]
    )
    const espia = spyOn(component,'createCollector')
    component.createCollector(mockCollector)
    expect(espia.calls.count()).toEqual(1);
  })

  it('expect createCollector function to subscribe to observable', () => {
    const mockCollector = new Collector(
      faker.datatype.number(),
      faker.name.findName(),
      faker.phone.phoneNumber(),
      faker.internet.email(),
      [],
      [new Band(faker.date.past(),faker.name.firstName(),faker.lorem.text(),faker.datatype.number(),faker.image.imageUrl())],
      [new CollectorAlbum(faker.datatype.number(),faker.datatype.number(),faker.lorem.text())]
    )
    component.createCollector(mockCollector)
    expect(collectorService.createCollector).toHaveBeenCalled()
  })

  it('expect cancelCreation to reseltForm and navigate to collectors list', ()=> {
    component.cancelCreation()
    expect(component.collectorForm.reset).toHaveBeenCalled()
    expect(router.navigateByUrl).toHaveBeenCalledWith('collectors/list')
  })
});
