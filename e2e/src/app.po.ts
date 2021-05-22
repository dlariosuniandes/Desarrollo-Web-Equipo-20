import { browser, by, element, ElementFinder } from 'protractor';
import { protractor } from 'protractor/built/ptor';

export class AppPage {
  navigateTo(childComponents?:string): Promise<unknown> {
    if(childComponents != undefined)
    {
      return browser.get(browser.baseUrl + "") as Promise<unknown>;
    }
    else
    {
      return browser.get(browser.baseUrl) as Promise<unknown>;
    }
    
  }

  getTitleText(): Promise<string> {
    return element(by.css('app-root .content span')).getText() as Promise<string>;
  }

  darClickAgregarAlbum():Promise<unknown>
  {
    return element(by.xpath('//button[@data-target="#albumCreationModal"]')).click() as Promise<unknown>
  }

  verificaExistenciaDeModal(id:string)
  {
    return element(by.id(id)).isPresent()
  }
  
  esperar(time:number)
  {
    browser.sleep(time);
  }

  esperarSelector(selector:ElementFinder)
  {
    return browser.wait(selector.isPresent(),10000)
  }

  async detallarAlbum(index:number)
  {
    let idAlbum:string
    await this.esperarSelector(element(by.xpath(`//button[@id="buttonAlbum${index}"]`)))
    let elHijo = await element(by.xpath(`//button[@id="buttonAlbum${index}"]`))
    browser.actions().mouseDown(elHijo)
    idAlbum= await elHijo.element(by.xpath('../../..')).getAttribute('id')
    let splitted = idAlbum.split("-")
    await elHijo.click()
    return Number(splitted[1])
  }

  obtenerTamanoCartasAlbums():Promise<number>
  {
    return element.all(by.css('.shadow.card')).count() as Promise<number>
  }

  async verificarUrl(index:number)
  {
    const actualUrl = browser.getCurrentUrl();
    expect(actualUrl).toEqual(`http://localhost:4200/albums/${index}`);
  }

  async volverListaAlbums()
  {
    element(by.id('iconBack')).click()
  }
}
