import { HttpClientModule, HttpClient, HttpHandler } from '@angular/common/http';
import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Subscription } from 'rxjs';

import { AlbumListComponent } from './album-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AlbumListComponent', () => {
  let component: AlbumListComponent;
  let fixture: ComponentFixture<AlbumListComponent>;
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
});
