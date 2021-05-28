/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CollectorAlbumComponent } from './collector-album.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AppRoutingModule } from '../../app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CollectorService } from '../collector.service';
import Swal, { SweetAlertResult } from 'sweetalert2';
import { of } from 'rxjs';
import { Collector } from '../collector';
import faker from 'faker'
import { Band } from 'src/app/perfomer/band';
import { CollectorAlbum, ALBUM_STATUS } from '../collectorAlbum';
import { CollectorRoutingModule } from '../collector-routing.module';

describe('CollectorAlbumComponent', () => {
  let component: CollectorAlbumComponent;
  let fixture: ComponentFixture<CollectorAlbumComponent>;
  let debElement: DebugElement
  let htmlMock: HTMLElement
  let collectorArray:Collector[]
  let collectorAlb:CollectorAlbum

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollectorAlbumComponent ],
      imports:[ReactiveFormsModule, HttpClientTestingModule, AppRoutingModule, CollectorRoutingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectorAlbumComponent);
    component = fixture.componentInstance;

    collectorArray = [];
    for(let i=0;i<10;i++)
    {
      collectorArray.push(new Collector(
        faker.datatype.number(),
        faker.name.findName(),
        faker.phone.phoneNumber(),
        faker.internet.email(),
        [],
        [new Band(faker.date.past(),faker.name.firstName(),faker.lorem.text(),faker.datatype.number(),faker.image.imageUrl())],
        [new CollectorAlbum(faker.datatype.number(),faker.datatype.number(),faker.lorem.text())]
      ))
    }
    collectorAlb = new CollectorAlbum(100,10000,ALBUM_STATUS.ACTIVE)
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('verifica el correcto funcionamiento de la acción addAlbumCollector',fakeAsync(()=>
  {
    component.collectorDetail = collectorArray[1]
    let service = TestBed.inject(CollectorService) as jasmine.SpyObj<CollectorService>
    let result:SweetAlertResult=
    {
      isConfirmed: true,
      isDenied:false,
      isDismissed:false
    }
    let spyFire = spyOn(Swal,'fire').and.resolveTo(result)
    let spyServ = spyOn(service,'addAlbumCollector').and.returnValue(of({resp:true}))
    component.addAlbumCollector(100,collectorAlb)
    fixture.detectChanges()
    expect(spyFire).toHaveBeenCalledTimes(1)
  })
  )

});
