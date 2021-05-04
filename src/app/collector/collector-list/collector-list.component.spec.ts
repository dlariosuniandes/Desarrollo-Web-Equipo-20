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

describe('CollectorListarComponent', () => {
  let component: CollectorListComponent;
  let fixture: ComponentFixture<CollectorListComponent>;
  let debug: DebugElement;
  let htmlElement:HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CollectorListComponent, CollectorDetailComponent],
      imports: [HttpClientTestingModule],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectorListComponent);
    component = fixture.componentInstance;
    component.collectors = [
      new Collector(
        faker.datatype.number(),
        faker.name.findName(),
        faker.phone.phoneNumber(),
        faker.internet.email(),
        [],
        [new Band(faker.date.past(),faker.name.firstName(),faker.lorem.text(),faker.datatype.number(),faker.lorem.text())],
        [new CollectorAlbum(faker.datatype.number(),faker.datatype.number(),faker.lorem.text())]
      )
    ];
    fixture.detectChanges();
    debug = fixture.debugElement;
    htmlElement = debug.nativeElement;
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it("Should have an p element with name ", () => {
    expect(debug.query(By.css("p")).nativeElement.innerText).toContain(component.collectors[0].darNombre());

  });
  it('should capture button index', () => {
    let spy = spyOn(component,"collectorDetail");
    htmlElement.querySelector("#but0").parentNode.querySelector("button").click();
    expect(spy.calls.count()).toBe(1);

  });
});
