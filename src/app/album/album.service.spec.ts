import { TestBed } from '@angular/core/testing';

import { AlbumService } from './album.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('AlbumService', () => {
  let service: AlbumService;
  let injector: TestBed;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[
        AlbumService,
        HttpClientTestingModule,
        HttpClient,
        HttpHandler
      ]
    });
    service = TestBed.inject(AlbumService);
  });

  it('Se deberia crear el servicio', () => {
    expect(service).toBeTruthy();
  });

  it('existe un atributo de tipo HTTP',() =>
  {
    expect(service.verifiarHttp()).toBeTrue()
  })

});
