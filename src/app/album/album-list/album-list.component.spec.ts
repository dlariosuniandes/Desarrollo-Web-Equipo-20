import { HttpClientModule, HttpClient, HttpHandler } from '@angular/common/http';
import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Subscription } from 'rxjs';

import { AlbumListComponent } from './album-list.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from 'src/environments/environment';
import faker from 'faker'
import { Album } from '../album';

describe('AlbumListComponent', () => {
  let component: AlbumListComponent;
  let fixture: ComponentFixture<AlbumListComponent>;
  let mockHttp: HttpTestingController
  let debElement: DebugElement;
  let htmlElement: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AlbumListComponent],
      providers:[],
      imports: [HttpClientTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbumListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

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
    let arrayMock = []
    for (let i = 1; i < 10; i++) {
      let albumMock = new Album(faker.name.firstName(),faker.image.imageUrl(),faker.date.past(),faker.lorem.text(),faker.random.number({'min':0,'max':3}),faker.random.number({'min':0,'max':4}))
      arrayMock.push(albumMock);
    }

    mockHttp = TestBed.inject(HttpTestingController)
    const req = mockHttp.expectOne(environment.backUrl+'Albums');
    req.flush(arrayMock)
    expect(component.albums).toBe(arrayMock);
    mockHttp.verify();
  });
});
