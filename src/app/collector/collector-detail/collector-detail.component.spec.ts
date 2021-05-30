/* tslint:disable:no-unused-variable */
import { async, ComponentFixture,fakeAsync,TestBed} from '@angular/core/testing';

import { DebugElement } from '@angular/core';

import { CollectorDetailComponent } from './collector-detail.component';
import { HttpClientTestingModule} from '@angular/common/http/testing';
import { Album } from '../../album/album';
import { CollectorAlbum } from '../collectorAlbum';
import faker from 'faker';
import { Collector } from '../collector';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { Band } from 'src/app/perfomer/band';
import { Musician } from 'src/app/perfomer/musician';
import { CollectorAlbumService } from '../collectorAlbum.service';
import { of } from 'rxjs';
import { CollectorService } from '../collector.service';
import Swal, { SweetAlertResult } from 'sweetalert2';


describe('CollectorDetailComponent', () => {
  let component: CollectorDetailComponent;
  let fixture: ComponentFixture<CollectorDetailComponent>;
  let mockCollectorAlbum:CollectorAlbum[]=[];
  let debElement: DebugElement
  let htmlMock: HTMLElement
  let router:Router
  let service:any
  let crearCollectorAlbum=()=>
  {
    for (let i = 0; i< 10; i++) {
      let mockAlbum = new Album(faker.datatype.number({'min': 100, 'max': 300}),faker.name.firstName(),faker.image.imageUrl(),faker.date.past(),faker.lorem.text(),faker.datatype.number({'min':0,'max':3}),faker.datatype.number({'min':0,'max':4}))
      mockCollectorAlbum.push(new CollectorAlbum(faker.datatype.number({min:100,max:300}),faker.datatype.number(),faker.name.firstName(),mockAlbum))
    }
  };

  const albumResponse: CollectorAlbum[] = [
    new CollectorAlbum(
      faker.datatype.number({ min: 100, max: 300 }),
      faker.name.firstName(),
      faker.image.imageUrl(),
      faker.date.past(),
      faker.lorem.text(),
    ),
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollectorDetailComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [CollectorAlbumService]
    })
    .compileComponents();

  }));

  beforeEach(() => {

    fixture = TestBed.createComponent(CollectorDetailComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router)
    crearCollectorAlbum();
    component.collectorDetail = new Collector(
      faker.datatype.number(),
      faker.name.findName(),
      faker.phone.phoneNumber(),
      faker.internet.email(),
    )
    component.collectorAlbums = mockCollectorAlbum;
    fixture.detectChanges();
    debElement = fixture.debugElement;
    htmlMock = debElement.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Verifica que se accione navegar album para un collectorsLength = 10',()=>
  {
    component.collectorsLength=10;
    let spyRouter = spyOn(router,'navigateByUrl')
    component.navegarAlbum(100)
    // expect(spyFunc).toHaveBeenCalledWith(100)
    expect(spyRouter).toHaveBeenCalledWith('/albums/' + 100,{state:{backUrl:`/collectors/list`}});
  });

  it('Verifica que se accione navegar album para un collectorsLength = 1',()=>
  {
    component.collectorsLength=1;
    let spyRouter = spyOn(router,'navigateByUrl')
    component.navegarAlbum(100)
    // expect(spyFunc).toHaveBeenCalledWith(100)
    expect(spyRouter).toHaveBeenCalledWith('/albums/' + 100,{state:{backUrl:`/collectors/${component.collectorDetail.darId()}`}});
  });

  it('Verifica que se accione navegarArtista para un collectorsLength = 10',()=>
  {
    component.collectorsLength=10;
    let spyRouter = spyOn(router,'navigateByUrl')
    let bandaMock = new Band(
      new Date(),
      'Test',
      'Musico Test',
      100,
      'https://url.com',
      [],
      []
    )
    let musicMock = new Musician(
      new Date(),
      'Test',
      'Musico Test',
      100,
      'https://url.com',
      [],
      []
    )
    component.navegarArtista(bandaMock)
    expect(spyRouter).toHaveBeenCalledWith(`/performers/band/${bandaMock.id}`,{state:{backUrl:`/collectors/list`}});
    component.navegarArtista(musicMock);
    expect(spyRouter).toHaveBeenCalledWith(`/performers/musician/${musicMock.id}`,{state:{backUrl:`/collectors/list`}});
  });

  it('Verifica que se accione navegarArtista para un collectorsLength = 1',()=>
  {
    component.collectorsLength=1;
    let spyRouter = spyOn(router,'navigateByUrl')
    let bandaMock = new Band(
      new Date(),
      'Test',
      'Musico Test',
      100,
      'https://url.com',
      [],
      []
    )
    let musicMock = new Musician(
      new Date(),
      'Test',
      'Musico Test',
      100,
      'https://url.com',
      [],
      []
    )
    component.navegarArtista(bandaMock)
    expect(spyRouter).toHaveBeenCalledWith(`/performers/band/${bandaMock.id}`,{state:{backUrl:`/collectors/${component.collectorDetail.darId()}`}});
    component.navegarArtista(musicMock);
    expect(spyRouter).toHaveBeenCalledWith(`/performers/musician/${musicMock.id}`,{state:{backUrl:`/collectors/${component.collectorDetail.darId()}`}});
  });

  it('verifica que al iniciar el componente se invoque la función getCollectorAlbums',()=>
  {
    let spyFunc = spyOn(component,'getCollectorAlbums')
    component.ngOnInit()
    expect(spyFunc).toHaveBeenCalledWith(component.collectorDetail.darId())
  })

  it('verifica que la función getCollectorAlbums devuelva la cantidad de collector albums enviada por parametro',()=>
  {
    service = TestBed.inject(CollectorAlbumService) as jasmine.SpyObj<CollectorAlbumService>
    spyOn(service,'getCollectorAlbums').and.returnValue(of(mockCollectorAlbum.slice(0,4)));
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.collectorAlbums.length).toBe(4)
  })

  it('verifica que la función getCollectorAlbums devuelva la cantidad de collector albums enviada por parametro',()=>
  {
    service = TestBed.inject(CollectorAlbumService) as jasmine.SpyObj<CollectorAlbumService>
    spyOn(service,'getCollectorAlbums').and.returnValue(of(mockCollectorAlbum.slice(0,4)));
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.collectorAlbums.length).toBe(4)
  })

  it('Verifica que la función borrarColeccionista funcione correctamente',fakeAsync(()=>
  {
    let service = TestBed.inject(CollectorService) as jasmine.SpyObj<CollectorService>
    let router = TestBed.inject(Router) as jasmine.SpyObj<Router>
    let routerSpy = spyOn(router,'navigateByUrl')
    spyOn(service,'deleteCollector').and.returnValue(of({response:true}))
    let response:SweetAlertResult =
    {
      isConfirmed:true,
      isDenied: false,
      isDismissed: false
    }
    spyOn(Swal,'fire').and.resolveTo(response)

    component.borrarColeccionista(component.collectorDetail.darId())

    expect(Swal.fire).toHaveBeenCalled()
  }))

});
