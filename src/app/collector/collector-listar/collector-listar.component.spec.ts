/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CollectorListarComponent } from './collector-listar.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import faker from "faker";
import { Collector } from "../collector";

describe('CollectorListarComponent', () => {
  let component: CollectorListarComponent;
  let fixture: ComponentFixture<CollectorListarComponent>;
  let debug: DebugElement;
  let htmlElement:HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollectorListarComponent ],
      imports: [HttpClientTestingModule],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectorListarComponent);
    component = fixture.componentInstance;
    component.collectors = [
      new Collector(

        faker.name.findName(),
        faker.phone.phoneNumber(),
        faker.internet.email(),
        [],
        [],
        []
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
    expect(debug.query(By.css("p")).nativeElement.innerText).toContain(
      component.collectors[0].darNombre())
  });
  it('should capture button index', () => {
    let spy = spyOn(component,"collectorDetail");
    htmlElement.querySelector("#but0").parentNode.querySelector("button").click();
    expect(spy.calls.count()).toBe(1);

  });
});
