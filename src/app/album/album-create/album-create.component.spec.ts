import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormControl } from '@angular/forms';


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
      imports:[ReactiveFormsModule, HttpClientTestingModule, AppRoutingModule, FormsModule]
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

  it('Muestra la clase wrong input cuando dicha entrada no es valida',()=>
  {
    const labelInput=htmlMock.querySelector<HTMLLabelElement>("label[for='name-input-field']");
    const fatherDiv=labelInput.parentElement.parentElement;
    const nameInput = fatherDiv.querySelector<HTMLInputElement>("input");
    nameInput.click();
    labelInput.click();
    expect(component.nombreAlbum.invalid).toBeTrue();
  })

  it('Cancelar acciona la función emitCancelEvent',()=>
  {
    const cancelButton=htmlMock.querySelector<HTMLButtonElement>("button.cancel-button");
    let spyFunc = spyOn(component,'emitCancelEvent');
    cancelButton.click()
    expect(spyFunc.calls.count()).toEqual(1);
  })

  it('verifica el correcto funcionamiento de validarFecha',()=>
  {
    const dateControl = new FormControl(['05/19/2050'])
    let retornoFuncion = component.validarFecha(dateControl)
    console.log(retornoFuncion);
    expect(retornoFuncion['response']).toBeTrue()
  })

  it('verifica que el formulario se cree correctamente',()=>
  {
    expect(component.createAlbumForm).toBeTruthy()
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
    fixture.whenStable().then(()=>expect(component.nombreAlbum.value).toEqual('Hola Querola'));
  })

});
