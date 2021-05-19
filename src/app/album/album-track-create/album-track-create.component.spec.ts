import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumTrackCreateComponent } from './album-track-create.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AppRoutingModule } from '../../app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('AlbumTrackCreateComponent', () => {
  let component: AlbumTrackCreateComponent;
  let fixture: ComponentFixture<AlbumTrackCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlbumTrackCreateComponent ],
      imports: [HttpClientTestingModule,AppRoutingModule,FormsModule, ReactiveFormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbumTrackCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
