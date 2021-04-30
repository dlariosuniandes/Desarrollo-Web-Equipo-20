/* tslint:disable:no-unused-variable */

import { TestBed, async, inject, getTestBed } from '@angular/core/testing';
import { CollectorService } from './collector.service';

import { HttpTestingController, HttpClientTestingModule } from "@angular/common/http/testing";

import faker from "faker";
import { Collector } from "./collector";
import { environment } from "../../environments/environment";

describe('Service: Collector', () => {
  let  injector: TestBed;
  let service: CollectorService;
  let httpMock: HttpTestingController;
  let apiUrl = environment.backUrl + "collectors";

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CollectorService],
    });
    injector = getTestBed();
    service = injector.get(CollectorService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('getPost() should return 2 records', () => {
    let mockPosts: Collector[] = [];

    for (let i =  1; i < 3; i++) {
      let collector = new Collector(

        faker.datatype.number(),
        faker.name.findName(),
        faker.phone.phoneNumber(),
        faker.internet.email(),
        [],
        [],
        []

      );
      mockPosts.push(collector);
    }
    service.getCollectors().subscribe((collectors) =>{
      expect(collectors.length).toBe(2);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe("GET");
    req.flush(mockPosts);
  });
});
