import { HttpClientModule } from '@angular/common/http';
import { TestBed, inject, getTestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { PerformerService } from './perfomer.service';
import { Musician } from './musician';
import faker from 'faker';
import { Band } from './band';

describe('ArtistsService', () => {
  let service: PerformerService;
  let injector: TestBed;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PerformerService],
    });
    injector = getTestBed();
    service = injector.get(PerformerService);
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

  it('should return a musician detail', () => {
    let mockMusician: Musician;
    let testDate = Date.now();
    mockMusician = new Musician(
      new Date(testDate),
      faker.lorem.sentence(),
      faker.lorem.sentence(),
      1,
      faker.lorem.sentence(),
      []
    );
    service.getMusicianDetail(1).subscribe((detail) => {
      expect(detail).toBeTruthy(detail instanceof Musician);
    });
    const req = httpMock.expectOne(() => true);
    expect(req.request.method).toBe("GET");
  });

  it('should return a band detail', () => {
    let mockBand: Band;
    let testDate = Date.now();
    mockBand = new Band(
      new Date(testDate),
      faker.lorem.sentence(),
      faker.lorem.sentence(),
      1,
      faker.lorem.sentence(),
      []
    );
    service.getBandDetail(1).subscribe((detail) => {
      expect(detail).toBeTruthy(detail instanceof Band);
    });
    const req = httpMock.expectOne(() => true);
    expect(req.request.method).toBe("GET");
  });

  afterEach(() => {
    httpMock.verify();
  });
});
