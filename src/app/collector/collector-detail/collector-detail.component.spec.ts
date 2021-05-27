/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CollectorDetailComponent } from './collector-detail.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Album } from '../../album/album';
import { CollectorAlbum } from '../collectorAlbum';
import faker from 'faker';
import { Collector } from '../collector';
import { RouterTestingModule } from '@angular/router/testing';
import { CollectorService } from '../collector.service';
import { CollectorAlbumService } from '../collectorAlbum.service';
import { Observable } from 'rxjs';
import { of } from 'rxjs';

describe('CollectorDetailComponent', () => {
  let component: CollectorDetailComponent;
  let fixture: ComponentFixture<CollectorDetailComponent>;
  let mockCollectorAlbum: CollectorAlbum[] = [];
  let debElement: DebugElement;
  let htmlMock: HTMLElement;
  let collectorAlbumService: jasmine.SpyObj<CollectorAlbumService>;
  let crearCollectorAlbum = () => {
    for (let i = 0; i < 10; i++) {
      let mockAlbum = new Album(
        faker.datatype.number({ min: 100, max: 300 }),
        faker.name.firstName(),
        faker.image.imageUrl(),
        faker.date.past(),
        faker.lorem.text(),
        faker.datatype.number({ min: 0, max: 3 }),
        faker.datatype.number({ min: 0, max: 4 })
      );
      mockCollectorAlbum.push(
        new CollectorAlbum(
          faker.datatype.number({ min: 100, max: 300 }),
          faker.datatype.number(),
          faker.name.firstName(),
          mockAlbum
        )
      );
    }
  };

  const albumResponse: CollectorAlbum[] = [
    new CollectorAlbum(
      faker.datatype.number({ min: 100, max: 300 }),
      faker.name.firstName(),
      faker.image.imageUrl(),
      faker.date.past(),
      faker.lorem.text(),
    ),
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CollectorDetailComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
    }).compileComponents();
  }));

  beforeEach(() => {
   
    fixture = TestBed.createComponent(CollectorDetailComponent);
    component = fixture.componentInstance;
    crearCollectorAlbum();
    component.collectorDetail = new Collector(
      faker.datatype.number(),
      faker.name.findName(),
      faker.phone.phoneNumber(),
      faker.internet.email()
    );
    component.collectorAlbums = mockCollectorAlbum;
    fixture.detectChanges();
    debElement = fixture.debugElement;
    htmlMock = debElement.nativeElement;
    collectorAlbumService = TestBed.get(CollectorAlbumService);
    spyOn(collectorAlbumService, 'getCollectorAlbums').and.returnValue(of(albumResponse)
    );
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('acciona navegar album', () => {
    // const linkAlbum=htmlMock.querySelector<HTMLButtonElement>("td.albumNav");
    let spyFunc = spyOn(component, 'navegarAlbum');
    component.navegarAlbum(100);
    console.log(spyFunc.calls.first().args);
    expect(spyFunc.calls.count()).toEqual(1);
  });

  it('expect getCollectorsAlbum to subscribe to observable', () => {
    component.getCollectorAlbums(faker.datatype.number());
    expect(collectorAlbumService.getCollectorAlbums).toHaveBeenCalled();
    expect(component.collectorAlbums).toEqual(albumResponse)
  });
});
