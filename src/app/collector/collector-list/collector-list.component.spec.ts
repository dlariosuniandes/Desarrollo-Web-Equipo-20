/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CollectorListComponent } from './collector-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import faker from "faker";
import { Collector } from "../collector";
import { Band } from '../../perfomer/band';
import { CollectorAlbum } from '../collectorAlbum';
import { CollectorDetailComponent } from '../collector-detail/collector-detail.component';
import { RouterTestingModule } from '@angular/router/testing';
import { CollectorService } from '../collector.service';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

describe('CollectorListComponent', () => {
  let component: CollectorListComponent;
  let fixture: ComponentFixture<CollectorListComponent>;
  let debug: DebugElement;
  let htmlElement:HTMLElement;
  let colService: CollectorService
  let collectorArray: Collector[]
  let ar:ActivatedRoute;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CollectorListComponent, CollectorDetailComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers:[CollectorService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectorListComponent);
    component = fixture.componentInstance;

    collectorArray = [];
    for(let i=0;i<10;i++)
    {
      collectorArray.push(      new Collector(
        faker.datatype.number(),
        faker.name.findName(),
        faker.phone.phoneNumber(),
        faker.internet.email(),
        [],
        [new Band(faker.date.past(),faker.name.firstName(),faker.lorem.text(),faker.datatype.number(),faker.image.imageUrl())],
        [new CollectorAlbum(faker.datatype.number(),faker.datatype.number(),faker.lorem.text())]
      ))
    }

    component.collectors = collectorArray;
    fixture.detectChanges();
    debug = fixture.debugElement;
    htmlElement = debug.nativeElement;
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it("Should have an .collectorName element with name ", () => {
    expect(debug.query(By.css(".collectorName")).nativeElement.innerText).toContain(component.collectors[0].darNombre());

  });
  it('should capture button index', () => {
    let spy = spyOn(component,"collectorDetail");
    htmlElement.querySelector("#but0").parentNode.querySelector("button").click();
    expect(spy.calls.count()).toBe(1);
  });

  it('verifica que la función get collectors haga su función al invocar ngoninit',()=>
  {
    colService = TestBed.inject(CollectorService) as jasmine.SpyObj<CollectorService>
    let getCollectorSpy = spyOn(colService,'getCollectors').and.returnValue(of(collectorArray.slice(0,4)))
    component.ngOnInit();
    expect(getCollectorSpy).toHaveBeenCalled()
    expect(component.collectors.length).toBe(4)
    fixture.detectChanges();
    ar = TestBed.inject(ActivatedRoute) as jasmine.SpyObj<ActivatedRoute>
    ar.snapshot.params.id = collectorArray[2].darId();
    component.ngOnInit();
    expect(component.collectors.length).toBe(1)

  })
});
