import { TestBed } from '@angular/core/testing';

import { AlbumService } from './album.service';

describe('AlbumService', () => {
  let service: AlbumService;
  let injector: TestBed;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[AlbumService]
    });
    service = TestBed.inject(AlbumService);
  });

  it('Se deberia crear el servicio', () => {
    expect(service).toBeTruthy();
  });

  it('existe un atributo de tipo HTTP',() =>
  {
    expect(service.verifiarHttp()).toBeFalse();
  })

});
