import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';

import { DetailComponent } from './detail.component';
import { HttpClientModule } from '@angular/common/http';
import { Musician } from '../musician';
import { By } from '@angular/platform-browser';
import { Album, GENRE, RECORD_LABEL } from 'src/app/album/album';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { PerformerService } from '../perfomer.service';
import { Observable, of, Subscriber, Subscription } from 'rxjs';
import { Band } from '../band';
import { subscribeOn } from 'rxjs/operators';

describe('DetailComponent', () => {
  let component: DetailComponent;
  let fixture: ComponentFixture<DetailComponent>;
  let debug: DebugElement;
  let router: jasmine.SpyObj<Router>;
  let performerService: jasmine.SpyObj<PerformerService>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule],
      declarations: [DetailComponent],
    }).compileComponents();
  }));

  const musicianResponse: Musician = new Musician(
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
  const bandResponse: Band = new Band(
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
  beforeEach(() => {
    router = TestBed.get(Router);
    spyOn(router, 'getCurrentNavigation').and.returnValue({
      extras: { state: { backUrl: 'msg' } },
    } as any);
    spyOn(router, 'navigateByUrl');
    spyOn(router, 'navigate');
    performerService = TestBed.get(PerformerService);
    spyOn(performerService, 'getMusicianDetail').and.returnValue(
      of(musicianResponse)
    );
    spyOn(performerService, 'getBandDetail').and.returnValue({
      subscribe: () => new Observable<Band>(),
    } as any);
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
      debug.query(By.css('.list-container.container .row .musician-card'))
        .nativeElement
    ).toBeTruthy();
  });

  it('should return date for perfomer either is Musician or Band', () => {
    expect(component.returnDatePerfomer()).toBe(
      component.formatDate(new Date())
    );
  });

  it('constructor should set backUrl', () => {
    expect(component.backUrl).toBeTruthy();
  });

  it('test onChange with musician instance', () => {
    component.performerDetail = musicianResponse;
    component.ngOnChanges();
    fixture.detectChanges();
    expect(performerService.getMusicianDetail).toHaveBeenCalled();
    expect(component.performerDetail).toEqual(musicianResponse);
  });

  it('test onChange with band instance', async () => {
    component.performerDetail = bandResponse;
    component.ngOnChanges();
    expect(performerService.getBandDetail).toHaveBeenCalled();
    expect(component.performerDetail).toEqual(bandResponse);
  });

  it('expect backurl to be called with onBackfunction', () => {
    component.goBackDetail();
    expect(router.navigateByUrl).toHaveBeenCalled();
  });

  it('expect default route when theres no backurl', () => {
    component.backUrl = null;
    component.goBackDetail();
    expect(router.navigateByUrl).toHaveBeenCalledWith('/performers/list');
  });

  it('expect on select to call a navigate by URL', () => {
    component.onSelect(
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
      )
    );
    expect(router.navigateByUrl).toHaveBeenCalledWith('/albums/' + 100, {
      state: {
        backUrl: `/performers/musician/0`,
      },
    });
  });

  it('expect toggle function to change flag', () => {
    const initialValue = component.flagModal;
    component.toggleModal();
    expect(component.flagModal).toBe(!initialValue);
  });

  it('should test reload component function', () =>{
    component.reloadComponent()
    expect(router.navigate).toHaveBeenCalled()
  })
});
