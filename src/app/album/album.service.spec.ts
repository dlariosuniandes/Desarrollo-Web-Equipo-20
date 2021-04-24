import { TestBed, getTestBed } from '@angular/core/testing';

import { AlbumService } from './album.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs';

describe('AlbumService', () => {
  let service: AlbumService;
  let mockHttp: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[
        AlbumService,
        HttpClient,
        HttpHandler
      ],
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(AlbumService)
    mockHttp = TestBed.inject(HttpTestingController);
  });

  it('Se deberia crear el servicio', () => {
    expect(service).toBeTruthy();
  });

  it('existe un atributo de tipo HTTP',() =>
  {
    expect(service.verifiarHttp()).toBeTrue()
  });

  it('la funcion obtenerAlbums retorna un observable',()=>
  {
    expect(service.obtenerAlbums()).toBeDefined()
    expect(service.obtenerAlbums() instanceof Observable).toBeTrue()
  })

});
