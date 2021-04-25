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
    const sub = service.obtenerAlbums().subscribe();
    expect(serviceSpy.get.calls.allArgs()[0][0]).toBe(environment.backUrl+'Albums')
    sub.unsubscribe();
  })


  it('la subscripcion retorna el arreglo mock de albumes',()=>
  {
    service = null;
    service = new AlbumService(serviceSpy as any);
    let arrayMock = []
    for (let i = 1; i < 10; i++) {
      let albumMock = new Album(faker.name.firstName(),faker.image.imageUrl(),faker.date.past(),faker.lorem.text(),faker.random.number({'min':0,'max':3}),faker.random.number({'min':0,'max':4}))
      arrayMock.push(albumMock);
    }
   

    serviceSpy.get.and.returnValue(of(arrayMock))
    const sub = service.obtenerAlbums().subscribe(al =>
      {
        expect(al).toBe(arrayMock);
      }
      );
    sub.unsubscribe();
  })


});
