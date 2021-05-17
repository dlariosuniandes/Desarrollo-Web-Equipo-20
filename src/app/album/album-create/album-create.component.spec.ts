import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { AlbumCreateComponent } from './album-create.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AppRoutingModule } from '../../app-routing.module';
import { DebugElement } from '@angular/core';

describe('AlbumCreateComponent', () => {
  let component: AlbumCreateComponent;
  let fixture: ComponentFixture<AlbumCreateComponent>;
  let debElement: DebugElement
  let htmlMock: HTMLElement

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlbumCreateComponent ],
      imports:[ReactiveFormsModule, HttpClientTestingModule, AppRoutingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbumCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    debElement = fixture.debugElement;
    htmlMock = debElement.nativeElement;

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
