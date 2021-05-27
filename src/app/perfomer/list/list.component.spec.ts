import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';

import { ListComponent } from './list.component';
import { Musician } from '../musician';
import { By } from '@angular/platform-browser';
import { Band } from '../band';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let debug: DebugElement;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule],
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
      ),
    ];
    fixture.detectChanges();
    debug = fixture.debugElement;
    router = TestBed.get(Router);
    spyOn(router, 'getCurrentNavigation').and.returnValue({
      extras: { state: { backUrl: 'msg' } },
    } as any);
    spyOn(router, 'navigateByUrl')
    spyOn(router, 'navigate');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return formatted date', () => {
    expect(component.formatDate(new Date('1989-10-17T10:00:01+00:00'))).toEqual(
      '(1989)'
    );
  });

  it('should have a title musician', () => {
    expect(
      debug.query(By.css('.list-title.musician')).nativeElement.innerText
    ).toBe('Musicos');
  });

  it('should have a musician card', () => {
    expect(debug.query(By.css('.musician-card')).nativeElement).toBeTruthy();
  });

  it('should have a title tag for bands', () => {
    expect(
      debug.query(By.css('.list-title.band')).nativeElement.innerText
    ).toBe('Bandas');
  });

  it('should have a band card', () => {
    expect(debug.query(By.css('.band-card')).nativeElement).toBeTruthy();
  });

  it('expect onSelect to navigate to musician detail', () => {
    component.onSelect(
      new Musician(
        new Date(),
        'Test',
        'Musico Test',
        100,
        'https://url.com',
        [],
        []
      )
    );
    expect(router.navigateByUrl).toHaveBeenCalledWith('performers/musician/' + 100)
  });

  it('expect onSelect to navigate to band detail', () => {
    component.onSelect(
      new Band(
        new Date(),
        'Test',
        'Musico Test',
        100,
        'https://url.com',
        [],
        []
      )
    );
    expect(router.navigateByUrl).toHaveBeenCalledWith('performers/band/' + 100)
  });

  it('expect toggle function to change flag', () => {
    const initialValue = component.flagModal;
    component.modalToggle();
    expect(component.flagModal).toBe(!initialValue);
  });

  it('should test reload component function', () =>{
    component.reloadComponent()
    expect(router.navigate).toHaveBeenCalled()
  })
});
