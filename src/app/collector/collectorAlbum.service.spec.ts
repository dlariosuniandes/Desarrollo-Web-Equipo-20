/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CollectorAlbumService } from './collectorAlbum.service';

import { HttpTestingController, HttpClientTestingModule } from "@angular/common/http/testing";

import faker from "faker";
import { Collector } from "./collector";
import { environment } from "../../environments/environment";
import { CollectorAlbum } from './collectorAlbum';


describe('Service: CollectorAlbum', () => {
  let injector: TestBed;
  let service: CollectorAlbumService;
  let httpMock: HttpTestingController;
  let apiUrl = environment.backUrl + "collectors/"+ 100 +'/albums';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CollectorAlbumService]
    });

    service =  TestBed.inject(CollectorAlbumService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('getPost() should return 2 records', () => {
    let mockPosts: CollectorAlbum[] = [];

    for (let i =  1; i < 3; i++) {
      let collectorAlbum = new CollectorAlbum(

        faker.datatype.number(),
        faker.datatype.number(),
        faker.lorem.text(),
      );
      mockPosts.push(collectorAlbum);
    }
    service.getCollectorAlbums(100).subscribe((collectorAlbums) =>{
      expect(collectorAlbums.length).toBe(2);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe("GET");
    req.flush(mockPosts);
  });


  it('should ...', inject([CollectorAlbumService], (
    service: CollectorAlbumService) => {
    expect(service).toBeTruthy();
  }));
});
