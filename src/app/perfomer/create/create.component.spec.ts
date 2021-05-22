import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateComponent } from './create.component';

describe('CreateComponent', () => {
  let component: CreateComponent;
  let fixture: ComponentFixture<CreateComponent>;
  let debElement: DebugElement
  let htmlMock: HTMLElement

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    debElement = fixture.debugElement;
    htmlMock = debElement.nativeElement;

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
