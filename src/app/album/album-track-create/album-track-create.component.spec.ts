import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AlbumTrackCreateComponent } from './album-track-create.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';

describe('AlbumTrackCreateComponent', () => {
  let component: AlbumTrackCreateComponent;
  let fixture: ComponentFixture<AlbumTrackCreateComponent>;
  let debElement: DebugElement
  let htmlMock: HTMLElement

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
    debElement = fixture.debugElement;
    htmlMock = debElement.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Muestra la clase wrong input cuando dicha entrada no es valida',()=>
  {
    const labelInput=htmlMock.querySelector<HTMLLabelElement>("label[for='name-input-field']");
    const fatherDiv=labelInput.parentElement.parentElement;
    const nameInput = fatherDiv.querySelector<HTMLInputElement>("input");
    nameInput.click();
    labelInput.click();
    expect(component.nombreTrack.invalid).toBeTrue();
  })

  it('Cancelar acciona la función emitCancelEvent',()=>
  {
    const cancelButton=htmlMock.querySelector<HTMLButtonElement>("button.cancel-button");
    let spyFunc = spyOn(component.cancelEvent,'emit');
    cancelButton.click()
    expect(spyFunc.calls.count()).toEqual(1);
  })


  it('verifica que el formulario se cree correctamente',()=>
  {
    expect(component.createTrackForm).toBeTruthy()
  })

  it('verifica que al escribir en un input, la función get de éste retorne lo escrito',()=>
  {
    const e:Event = document.createEvent('Event');
    e.initEvent('input', false, false);
    const labelInput=htmlMock.querySelector<HTMLLabelElement>("label[for='name-input-field']");
    const fatherDiv=labelInput.parentElement.parentElement;
    const nameInput = fatherDiv.querySelector<HTMLInputElement>("input");
    nameInput.value = 'Hola Querola'
    nameInput.dispatchEvent(e)
    fixture.detectChanges();
    fixture.whenStable().then(()=>expect(component.nombreTrack.value).toEqual('Hola Querola'));
  })
});
