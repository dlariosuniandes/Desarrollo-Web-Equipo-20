/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CollectorAlbumService } from './collectorAlbum.service';

import { HttpTestingController, HttpClientTestingModule } from "@angular/common/http/testing";

import faker from "faker";
import { environment } from "../../environments/environment";
import { CollectorAlbum } from './collectorAlbum';
import { Album } from '../album/album';


describe('Service: CollectorAlbum', () => {
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
        new Album(faker.datatype.number({'min': 100, 'max': 300}),faker.name.firstName(),faker.image.imageUrl(),faker.date.past(),faker.lorem.text(),faker.datatype.number({'min':0,'max':3}),faker.datatype.number({'min':0,'max':4}))
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


});
