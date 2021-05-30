import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { Album, GENRE, RECORD_LABEL } from 'src/app/album/album';
import Swal from 'sweetalert2';
import { Musician } from '../musician';
import { PerformerService } from '../perfomer.service';

import { AssociateMusicianBandComponent } from './associate-musician-band.component';

describe('AssociateMusicianBandComponent', () => {
  let component: AssociateMusicianBandComponent;
  let fixture: ComponentFixture<AssociateMusicianBandComponent>;
  let performerService: jasmine.SpyObj<PerformerService>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AssociateMusicianBandComponent],
      imports: [FormsModule, ReactiveFormsModule, HttpClientModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssociateMusicianBandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    performerService = TestBed.get(PerformerService);
    spyOn(component.associateMusicianForm, 'reset');
    spyOn(performerService, 'associateMusician').and.returnValue({
      subscribe: () => new Observable<any>(),
    } as any);
    spyOn(Swal, 'fire');
    spyOn(performerService, 'getBands').and.returnValue({
      subscribe: () => new Observable<any>(),
    } as any);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should cancel association', () => {
    component.cancelAssociation();
    expect(component.associateMusicianForm.reset).toHaveBeenCalled();
  });

  it('function should call method associate musician', async () => {
    component.currentMusician = new Musician(
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
    await component.associateMusician();
    expect(performerService.associateMusician).toHaveBeenCalled();
    performerService.associateMusician(100, 100).subscribe(() => {
      expect(Swal.fire).toHaveBeenCalled();
    });
  });

  it('expect getBandlist function to subscribe to observable', async() => {
    await component.getBandList()
    expect(performerService.getBands).toHaveBeenCalled()
    performerService.getBands().subscribe((cs)=> {
      expect(component.bands = cs)
    })
  })
});
