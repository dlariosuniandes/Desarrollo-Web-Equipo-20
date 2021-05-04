/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CollectorDetailComponent } from './collector-detail.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Album } from '../../album/album';
import { CollectorAlbum } from '../collectorAlbum';
import faker from "faker";
import { Collector } from '../collector';

describe('CollectorDetailComponent',() => {
  let component: CollectorDetailComponent;
  let fixture: ComponentFixture<CollectorDetailComponent>;
  let mockCollectorAlbum:CollectorAlbum[]=[];
  let crearCollectorAlbum=()=>
  {
    for (let i = 0; i< 10; i++) {
      let mockAlbum = new Album(faker.datatype.number({'min': 100, 'max': 300}),faker.name.firstName(),faker.image.imageUrl(),faker.date.past(),faker.lorem.text(),faker.datatype.number({'min':0,'max':3}),faker.datatype.number({'min':0,'max':4}))
      mockCollectorAlbum.push(new CollectorAlbum(faker.datatype.number({min:100,max:300}),faker.datatype.number(),faker.name.firstName(),mockAlbum))
    }
  }
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollectorDetailComponent],
      imports: [HttpClientTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectorDetailComponent);
    component = fixture.componentInstance;
    crearCollectorAlbum();
    component.collectorDetail =  new Collector
    (
      faker.datatype.number(),
      faker.name.findName(),
      faker.phone.phoneNumber(),
      faker.internet.email(),

    )
    component.collectorAlbums = mockCollectorAlbum;
    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
