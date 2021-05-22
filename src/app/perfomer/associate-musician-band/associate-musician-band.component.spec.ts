import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AssociateMusicianBandComponent } from './associate-musician-band.component';

describe('AssociateMusicianBandComponent', () => {
  let component: AssociateMusicianBandComponent;
  let fixture: ComponentFixture<AssociateMusicianBandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssociateMusicianBandComponent ],
      imports: [FormsModule, ReactiveFormsModule, HttpClientModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssociateMusicianBandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
