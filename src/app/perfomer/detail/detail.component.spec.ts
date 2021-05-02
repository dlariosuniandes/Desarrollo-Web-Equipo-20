import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';

import { DetailComponent } from './detail.component';
import { HttpClientModule } from '@angular/common/http';
import { Musician } from '../musician';
import { By } from '@angular/platform-browser';
import { Album, GENRE, RECORD_LABEL } from 'src/app/album/album';

describe('DetailComponent', () => {
  let component: DetailComponent;
  let fixture: ComponentFixture<DetailComponent>;
  let debug: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [DetailComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailComponent);
    component = fixture.componentInstance;
    component.performer = new Musician(
      new Date(),
      'Test',
      'Musico Test',
      100,
      'https://url.com',
      [
        new Album(
          100,
          'Test',
          'https://url.com',
          new Date(),
          'Test',
          GENRE.CLASSICAL,
          RECORD_LABEL.ELEKTRA,
          [],
          [],
          []
        ),
      ],
      []
    );
    fixture.detectChanges();
    debug = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return formatted date', () => {
    expect(component.formatDate(new Date('1989-10-17T10:00:01+00:00'))).toEqual(
      '(1989)'
    );
  });

  it('should render component container', () => {
    expect(
      debug.query(By.css('.component-container')).nativeElement
    ).toBeTruthy();
  });

  it('should render artistName', () => {
    expect(debug.query(By.css('.artist-name')).nativeElement.innerText).toBe(
      'Test'
    );
  });

  it('should render date', () => {
    expect(debug.query(By.css('.artist-year')).nativeElement.innerText).toBe(
      component.formatDate(new Date())
    );
  });

  it('should render description', () => {
    expect(
      debug.query(By.css('.artist-description')).nativeElement.innerText
    ).toBe('Musico Test');
  });

  it('should render list albums', () => {
    expect(
      debug.query(By.css('.list-container.container .row .musician-card')).nativeElement
    ).toBeTruthy();
  });

  it('should return date for perfomer either is Musician or Band', () => {
    expect(component.returnDatePerfomer()
      ).toBe(component.formatDate(new Date()));
  })
});
