import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';

import { ListComponent } from './list.component';
import { Musician } from '../musician';
import { By } from '@angular/platform-browser';
import { Band } from '../band';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let debug: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [ListComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    component.musicians = [
      new Musician(
        new Date(),
        'Test',
        'Musico Test',
        100,
        'https://url.com',
        [],
        []
      ),
    ];
    component.bands = [
      new Band(
        new Date(),
        'Test',
        'Musico Test',
        100,
        'https://url.com',
        [],
        []
      )
    ]
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

  it('should have a title musician',()=> {
    expect(debug.query(By.css(".list-title.musician")).nativeElement.innerText).toBe("Musicos")
  })

  it('should have a musician card',()=> {
    expect(debug.query(By.css('.col-4.card.musician-card')).nativeElement).toBeTruthy()
  })

  it('should have a title tag for bands',()=> {
    expect(debug.query(By.css(".list-title.band")).nativeElement.innerText).toBe("Bandas")
  })

  it('should have a band card',()=> {
    expect(debug.query(By.css('.col-4.card.band-card')).nativeElement).toBeTruthy()
  })
});
