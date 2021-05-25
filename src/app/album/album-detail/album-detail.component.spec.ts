import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumDetailComponent } from './album-detail.component';
import { HttpClientTestingModule} from '@angular/common/http/testing';
import { AppRoutingModule } from '../../app-routing.module';
import { DebugElement } from '@angular/core';
import { Album, Track } from '../album';
import faker from "faker";
import { Comment } from 'src/app/comentario/comment';
import { Band } from '../../perfomer/band';
import { Musician } from '../../perfomer/musician';
import { RouterTestingModule } from '@angular/router/testing';


describe('AlbumDetailComponent', () => {
  let component: AlbumDetailComponent;
  let fixture: ComponentFixture<AlbumDetailComponent>
  let debElement: DebugElement
  let htmlElement: HTMLElement
  let albumMock: Album

  let crearMockAlbum = ()=>
  {
    let arrayTrackMock = []
    let arrayArtist=[]
    let arrayComments=[]
    for(let n = 1; n<10;n++)
    {

      arrayTrackMock.push(new Track(faker.datatype.number({'min': 100, 'max': 300}),faker.name.firstName(),faker.lorem.text()));
      if(n%2 == 0)
      {
        
        arrayArtist.push(new Band(faker.date.past(),faker.name.firstName(),faker.lorem.text(),faker.datatype.number({'min': 100, 'max': 300}),faker.image.imageUrl()))
      }
      else
      {
        arrayArtist.push(new Musician(faker.date.past(),faker.name.firstName(),faker.lorem.text(),faker.datatype.number({'min': 100, 'max': 300}),faker.image.imageUrl()))
      }
      arrayComments.push(new Comment(faker.datatype.number({'min': 100, 'max': 300}),faker.lorem.text(),faker.datatype.number({'min': 0, 'max': 5})));
    }

    albumMock = new Album(faker.datatype.number({'min': 100, 'max': 300}),faker.name.firstName(),faker.image.imageUrl(),faker.date.past(),faker.lorem.text(),faker.datatype.number({'min':0,'max':3}),faker.datatype.number({'min':0,'max':4}),arrayTrackMock,arrayArtist,arrayComments)

  }
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlbumDetailComponent ],
      imports: [HttpClientTestingModule, RouterTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbumDetailComponent);
    component = fixture.componentInstance;
    component.idAlbum = 100
    debElement = fixture.debugElement;
    htmlElement = debElement.nativeElement;
    fixture.detectChanges();

  });

  afterEach(()=>
  {
    albumMock = undefined
    component = null
    fixture = null
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Verifica que las funciones subServiceAlbum y obtenerIdRuta sean llamadas al inicializar el componente',()=>
  {
    const spy = {func1: spyOn(component,'subServiceAlbum'), func2: spyOn(component,'obtenerIdRuta')}
    component.ngOnInit();
    expect(spy.func1.calls.count()).toBe(1);
    expect(spy.func2.calls.count()).toBe(1);
  });

  it('Verifica que al inicializar el componente la variable albumI sea instancia de album',()=>
  {
    crearMockAlbum();
    const spy = spyOn(component,'subServiceAlbum');
    let funcTest = ()=>
    {
      component.albumDetail=albumMock;
    }
    component.ngOnInit();
    if(spy.calls.count()>0)
    {
      funcTest();
    }
    expect(component.albumDetail instanceof Album).toBeTrue();
    
  });

  it('Verifica que se pinte el detalle del album en el html',()=>
  {
    crearMockAlbum();
    const spy = spyOn(component,'subServiceAlbum');
    let funcTest = ()=>
    {
      component.albumDetail=albumMock;
    }
    component.ngOnInit();
    if(spy.calls.count()>0)
    {
      funcTest();
    }
    fixture.detectChanges();
    const urlImg: string = htmlElement.querySelector('#albumImg').parentNode.querySelector('img').src;
    const numberTracks = htmlElement.querySelector('tbody.mb-0').querySelectorAll('tr').length
    const numberComments = htmlElement.querySelectorAll("#commentCollector").length
    expect(urlImg).toEqual(component.albumDetail.darPortada());
    expect(numberTracks).toEqual(component.albumDetail.darTracks().length);
    expect(numberComments).toEqual(component.albumDetail.darComentarios().length)
  });

  it('Verifica que al dar click en el boton de back, se active la funcion backList',()=>
  {
    crearMockAlbum();
    const spy1 = spyOn(component,'subServiceAlbum');
    let funcTest = ()=>
    {
      component.albumDetail=albumMock;
    }
    component.ngOnInit();
    if(spy1.calls.count()>0)
    {
      funcTest();
    }
    fixture.detectChanges();
    let spy2 = spyOn(component,'backList');
    htmlElement.querySelector("#iconBack").parentNode.querySelector("em").click();
    expect(spy2.calls.count()).toBe(1);
  })
});
