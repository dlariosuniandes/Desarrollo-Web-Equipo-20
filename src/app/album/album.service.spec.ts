import { TestBed, getTestBed } from '@angular/core/testing';

import { AlbumService } from './album.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';

describe('AlbumService', () => {
  let service: AlbumService;
  let serviceSpy: {get: jasmine.Spy};

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
    serviceSpy = jasmine.createSpyObj('HttpClient',['get']);
  });

  afterEach(() => 
  {
    service = null;
    serviceSpy = null;
  })

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

  it('la subscripcion al observable que retorna obtenerAlbums se hace con el link correctamente',()=>
  {
    service = null;
    service = new AlbumService(serviceSpy as any);
    serviceSpy.get.and.returnValue(of([]))
    service.obtenerAlbums().subscribe();
    expect(serviceSpy.get.calls.allArgs()[0][0]).toBe(environment.backUrl+'/Albums')
  })

});
