import { TestBed, getTestBed } from '@angular/core/testing';

import { AlbumService } from './album.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import faker from 'faker'
import { Album } from './album';

describe('AlbumService', () => {
  let service: AlbumService;
  let mockHttp: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[
        AlbumService
      ],
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(AlbumService)
    mockHttp = TestBed.inject(HttpTestingController);
  });

  afterEach(() => 
  {
    service = null;
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
    const sub = service.obtenerAlbums().subscribe()
    const req = mockHttp.expectOne(environment.backUrl+'Albums');
    expect(req.request.method).toBe('GET')
    sub.unsubscribe();
  })


  it('la subscripcion retorna el arreglo mock de albumes',()=>
  {
    
    let arrayMock = []
    for (let i = 1; i < 10; i++) {
      let albumMock = new Album(faker.name.firstName(),faker.image.imageUrl(),faker.date.past(),faker.lorem.text(),faker.datatype.number({'min':0,'max':3}),faker.datatype.number({'min':0,'max':4}))
      arrayMock.push(albumMock);
    }
    const sub = service.obtenerAlbums().subscribe(al =>
      {
        expect(al).toBe(arrayMock);
      }
      );
    const req = mockHttp.expectOne(environment.backUrl+'Albums')
    req.flush(arrayMock)
    sub.unsubscribe();
  })


});
