import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Subscription } from 'rxjs';

import { AlbumListComponent } from './album-list.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from 'src/environments/environment';
import faker from 'faker'
import { Album, Track } from '../album';
import { AppRoutingModule } from '../../app-routing.module';
import { Router } from '@angular/router';

describe('AlbumListComponent', () => {
  let component: AlbumListComponent;
  let fixture: ComponentFixture<AlbumListComponent>;
  let mockHttp: HttpTestingController
  let debElement: DebugElement;
  let htmlElement: HTMLElement;
  let arrayMock: Array<Album>
  let arrayTrackMock: Array<Track>
  let router:Router;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AlbumListComponent],
      providers:[],
      imports: [HttpClientTestingModule, AppRoutingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbumListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    debElement = fixture.debugElement;
    htmlElement = debElement.nativeElement;
     arrayMock = []
     arrayTrackMock = []
    for(let j = 1; j<10;j++)
    {

      arrayTrackMock.push(new Track(faker.datatype.number({'min': 100, 'max': 300}),faker.name.firstName(),faker.lorem.text()));

    }
    for (let i = 1; i < 10; i++) {
      let albumMock = new Album(faker.datatype.number({'min': 100, 'max': 300}),faker.name.firstName(),faker.image.imageUrl(),faker.date.past(),faker.lorem.text(),faker.datatype.number({'min':0,'max':3}),faker.datatype.number({'min':0,'max':4}), arrayTrackMock,[],[])
      arrayMock.push(albumMock);
    }

  });

  afterEach(()=>
  {
    fixture = null
    component = null;
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('verifica que la función startSub retorne un elemento de tipo subscription',()=>
  {
    const sub = component.startSub()
    expect(sub instanceof Subscription).toBe(true);
    sub.unsubscribe()
  });

  it('verifica que al llamar ngOnInit se haga llamado a la función starSub y defina la variables sub',()=>
  {
    component.ngOnInit();
    expect(component.sub).toBeDefined();
  });

  it('Verifica que al hacerse la subscripciòn, la variable album retorne el arraymock de albums',()=>
  {


    mockHttp = TestBed.inject(HttpTestingController)
    const req = mockHttp.expectOne(environment.backUrl+'Albums');
    req.flush(arrayMock)
    expect(component.albums).toEqual(arrayMock);
    mockHttp.verify();
  });

  it('Verifica que al hacerse la subscripciòn, la variable album retorne el arraymock de albums',()=>
  {
    mockHttp = TestBed.inject(HttpTestingController)
    const req = mockHttp.expectOne(environment.backUrl+'Albums');
    req.flush(arrayMock)
    expect(component.albums).toEqual(arrayMock);
    mockHttp.verify();
  });

  it('verifica que se muestren tantas cartas en el HTML como tamaño del arrayMock ', ()=>
  {
    mockHttp = TestBed.inject(HttpTestingController);
    const req = mockHttp.expectOne(environment.backUrl+'Albums');
    req.flush(arrayMock);

    fixture.detectChanges();
    const numCards = htmlElement.querySelector('#iterablecard').childElementCount;
    expect(numCards).toBe(arrayMock.length);
  })

  it('verifica que al dar click en el botón de detalle  de alguna card se accione la función detallarAlbum ', ()=>
  {
    mockHttp = TestBed.inject(HttpTestingController);
    const req = mockHttp.expectOne(environment.backUrl+'Albums');
    req.flush(arrayMock);
    let spy = spyOn(component,'detallarAlbum');
    fixture.detectChanges();
    for (let i = 0; i < arrayMock.length; i++) {
      htmlElement.querySelector(`#buttonAlbum${i}`).parentNode.querySelector('button').click();
    }
    expect(spy.calls.count()).toBe(arrayMock.length)
  })

  it('verifica que al dar click en el botón de detalle  de alguna card se accione la función detallarAlbum y se envie por parametro la posición del arreglo', ()=>
  {
    mockHttp = TestBed.inject(HttpTestingController);
    const req = mockHttp.expectOne(environment.backUrl+'Albums');
    req.flush(arrayMock);
    let spy = spyOn(component,'detallarAlbum');
    fixture.detectChanges();
    htmlElement.querySelector(`#buttonAlbum${4}`).parentNode.querySelector('button').click();
    expect(spy.calls.first().args[0]).toBe(4)
  })

  it('Verifica el correcto funcionamiento de la funcion detallar Album',()=>
  {
    component.albums = arrayMock;
    fixture.detectChanges();
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    let routerSpy = spyOn(router,'navigateByUrl')
    component.detallarAlbum(2)
    fixture.detectChanges();
    expect(routerSpy).toHaveBeenCalledWith(`/albums/${arrayMock[2].darId()}`)
  })

  it('Verifica el correcto funcionamiento de la funcion reloadComponent',()=>
  {
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    let routerSpy = spyOn(router,'navigate')
    component.reloadComponent();
    fixture.detectChanges()
    expect(routerSpy).toHaveBeenCalled();
  })
});
