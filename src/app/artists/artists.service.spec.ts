import { HttpClientModule } from '@angular/common/http';
import { TestBed, inject, getTestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { ArtistsService } from './artists.service';
import { Musician } from './musician';
import faker from 'faker';
import { Band } from './band';

describe('ArtistsService', () => {
  let service: ArtistsService;
  let injector: TestBed;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ArtistsService],
    });
    injector = getTestBed();
    service = injector.get(ArtistsService);
    httpMock = injector.get(HttpTestingController);
  });

  it('should create service', () => {
    expect(service).toBeTruthy();
  });

  it('should return 10 musicians', () => {
    let mockMusicians: Musician[] = [];

    for (let i = 1; i <= 10; i++) {
      let testDate = Date.now();
      let musician = new Musician(
        new Date(testDate),
        faker.lorem.sentence(),
        faker.lorem.sentence(),
        i,
        faker.lorem.sentence(),
        [],
        []
      );
      mockMusicians.push(musician);
    }

    service.getMusicians().subscribe((musicians) => {
      expect(musicians.length).toBe(10);
    });

    const req = httpMock.expectOne(() => true);
    expect(req.request.method).toBe('GET');
    req.flush(mockMusicians);
  });

  it('should return 10 bands', () => {
    let mockBands: Band[] = [];

    for (let i = 1; i <= 10; i++) {
      let testDate = Date.now();
      let musician = new Band(
        new Date(testDate),
        faker.lorem.sentence(),
        faker.lorem.sentence(),
        i,
        faker.lorem.sentence(),
        [],
        []
      );
      mockBands.push(musician);
    }

    service.getBands().subscribe((bands) => {
      expect(bands.length).toBe(10);
    });

    const req = httpMock.expectOne(() => true);
    expect(req.request.method).toBe('GET');
    req.flush(mockBands);
  });

  afterEach(() => {
    httpMock.verify();
  });
});
