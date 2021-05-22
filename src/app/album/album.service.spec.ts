import { TestBed, getTestBed } from '@angular/core/testing';

import { AlbumService } from './album.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import faker from 'faker'
import { Album, Track } from './album';
import { Band } from '../perfomer/band';
import { Comment } from '../comentario/comment';
import { RouterTestingModule } from '@angular/router/testing';

describe('AlbumService', () => {
  let service: AlbumService;
  let mockHttp: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[
        AlbumService
      ],
      imports: [HttpClientTestingModule, RouterTestingModule]
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
    let arrayTrackMock = []
    for(let n = 1; n<10;n++)
    {
      arrayTrackMock.push(new Track(faker.datatype.number({'min': 100, 'max': 300}),faker.name.firstName(),faker.lorem.text()));
    }

    let arrayMock = [];
    for (let i = 1; i < 10; i++) {
      let albumMock = new Album(faker.datatype.number({'min': 100, 'max': 300}),faker.name.firstName(),faker.image.imageUrl(),faker.date.past(),faker.lorem.text(),faker.datatype.number({'min':0,'max':3}),faker.datatype.number({'min':0,'max':4}),arrayTrackMock,[],[])
      arrayMock.push(albumMock);
    }

    const sub = service.obtenerAlbums().subscribe(al =>
      {
        expect(al).toEqual(arrayMock);
      }
      );
    const req = mockHttp.expectOne(environment.backUrl+'Albums')
    req.flush(arrayMock)
    sub.unsubscribe();
  })

  it('La funcion obtenerAlbumId retorna un obesvable',()=>
  {
    expect(service.obtenerAlbumId(100)).toBeDefined();
    expect(service.obtenerAlbumId(100) instanceof Observable).toBeTrue();
  })

  it('la subscripcion al observable que retorna obtenerAlbumId se hace con el link correctamente',()=>
  {
    let arrayTrackMock = []
    for(let n = 1; n<10;n++)
    {

      arrayTrackMock.push(new Track(faker.datatype.number({'min': 100, 'max': 300}),faker.name.firstName(),faker.lorem.text()));

    }
    let albumMock = new Album(faker.datatype.number({'min': 100, 'max': 300}),faker.name.firstName(),faker.image.imageUrl(),faker.date.past(),faker.lorem.text(),faker.datatype.number({'min':0,'max':3}),faker.datatype.number({'min':0,'max':4}),arrayTrackMock,[],[])
    
    let sub = service.obtenerAlbumId(100).subscribe();

    let req = mockHttp.expectOne(environment.backUrl+'Albums'+`/`+100);

    expect(req.request.method).toBe('GET')

    sub.unsubscribe();

  })

  it('la subscripcion al observable que retorna obtenerAlbumId retorna el album deseado',()=>
  {
    let arrayTrackMock = []
    for(let n = 1; n<10;n++)
    {
      arrayTrackMock.push(new Track(faker.datatype.number({'min': 100, 'max': 300}),faker.name.firstName(),faker.lorem.text()));
    }
    let albumMock = new Album(faker.datatype.number({'min': 100, 'max': 300}),faker.name.firstName(),faker.image.imageUrl(),faker.date.past(),faker.lorem.text(),faker.datatype.number({'min':0,'max':3}),faker.datatype.number({'min':0,'max':4}),arrayTrackMock,[],[])
    
    let sub = service.obtenerAlbumId(100).subscribe(albumI =>
      {
        expect(albumI).toEqual(albumMock)
      });

    let req = mockHttp.expectOne(environment.backUrl+'Albums'+`/`+100);

    req.flush(albumMock)

    sub.unsubscribe();

  })


});
