import { browser, by, element, ElementFinder } from 'protractor';
import { protractor } from 'protractor/built/ptor';
import { faker } from 'faker';

export class AppPage {
  navigateTo(childComponents?: string): Promise<unknown> {
    if (childComponents != undefined) {
      return browser.get(browser.baseUrl + '') as Promise<unknown>;
    } else {
      return browser.get(browser.baseUrl) as Promise<unknown>;
    }
  }

  navigateToRoute(route: string): Promise<unknown> {
    return browser.get(browser.baseUrl + route) as Promise<unknown>;
  }

  getTitleText(): Promise<string> {
    return element(
      by.css('app-root .content span')
    ).getText() as Promise<string>;
  }

  darClickAgregarAlbum(): Promise<unknown> {
    return element(
      by.xpath('//button[@data-target="#albumCreationModal"]')
    ).click() as Promise<unknown>;
  }

  verificaExistenciaDeModal(id: string) {
    return element(by.id(id)).isPresent();
  }

  esperar(time: number) {
    browser.sleep(time);
  }

  esperarSelector(selector: ElementFinder) {
    return browser.wait(selector.isPresent(), 10000);
  }

  async detallarAlbum(index: number) {
    let idAlbum: string;
    await this.esperarSelector(
      element(by.xpath(`//button[@id="buttonAlbum${index}"]`))
    );
    let elHijo = await element(by.xpath(`//button[@id="buttonAlbum${index}"]`));
    browser.actions().mouseMove(await elHijo);
    await browser.sleep(200)
    idAlbum = await elHijo.element(by.xpath('../../..')).getAttribute('id');
    let splitted = await idAlbum.split('-');
    this.esperar(200);
    await elHijo.click();
    return Number(splitted[1]);
  }

  obtenerTamanoCartasAlbums(): Promise<number> {
    return element.all(by.css('.shadow.card')).count() as Promise<number>;
  }

  async verificarUrl(index: number) {
    const actualUrl = await browser.getCurrentUrl();
    expect(await actualUrl).toEqual(`${browser.baseUrl}albums/${index}`);
  }

  async volverListaAlbums() {
    await element(by.id('iconBack')).click();
  }

  async llenarFormularioAlbum() {
    await browser.wait(element.all(by.css('input')).isPresent(), 5000);
    const inputArray = await element.all(by.xpath('//input'));
    this.esperar(200);
    await inputArray[0].click();
    await inputArray[0].sendKeys('Musica para volar');
    await inputArray[1].click();
    await inputArray[1].sendKeys(
      'https://images-na.ssl-images-amazon.com/images/I/71OmC6lSOcL._SL1500_.jpg'
    );
    this.esperar(200);
    await element(by.xpath("//input[@type='date']")).sendKeys('11/05/2021');
    this.esperar(200);
    await element(by.css('textarea')).click();
    await element(by.css('textarea')).sendKeys(
      'adgfkjhfjhadfnkebhnarfusvnauidgfbaiubgfdsvnfbahuibgfdsabgnfhuib'
    );
    this.esperar(200);
    const selector = await element(
      by.xpath("//select[@aria-label='Default select example']")
    );
    await selector.click();
    const option = await selector.element(
      by.xpath('//option[@value="2: Folk"]')
    );
    await option.click();
    const selector2 = await element(
      by.xpath("//select[@aria-label='seleccion de sello']")
    );
    await selector2.click();
    const option2 = await selector.element(
      by.xpath('//option[@value="2: Elektra"]')
    );
    await option2.click();
  }

  async clickSubmitButton() {
    await browser.wait(
      element(by.xpath('//button[@type="submit"]')).isEnabled(),
      5000
    );
    await element(by.xpath('//button[@type="submit"]')).click();
    await browser.wait(
      element(by.css('.swal2-confirm.swal2-styled')).isPresent(),
      5000
    );
    await element(by.css('button.swal2-confirm.swal2-styled')).click();
  }

  async eliminarAlbum() {
    await browser.wait(element(by.css('.bi.bi-trash')).isDisplayed(), 5000);
    await element(by.css('.bi.bi-trash')).click();
    await browser.wait(
      element(
        by.css('.swal2-confirm.swal2-styled.swal2-default-outline')
      ).isPresent(),
      5000
    );
    await element(
      by.css('.swal2-confirm.swal2-styled.swal2-default-outline')
    ).click();
    await browser.wait(
      element(by.css('.swal2-confirm.swal2-styled')).isDisplayed(),
      5000
    );
    await element(by.css('button.swal2-confirm.swal2-styled')).click();
    await browser.waitForAngular();
  }

  async clickAgregarTrack() {
    await browser.wait(
      element(
        by.xpath('//button[@data-target="#trackCreationModal"]')
      ).isDisplayed(),
      5000
    );
    await element(
      by.xpath('//button[@data-target="#trackCreationModal"]')
    ).click();
  }
  async llenarFormularioTrack() {
    await browser.wait(element(by.id('trackName')).isPresent(), 5000);
    this.esperar(200);
    await element(by.id('trackName')).sendKeys('Nuevo Track');
    this.esperar(200);
    await element(by.id('trackDuration')).sendKeys('250');
    await browser.wait(
      element(by.xpath('//button[@type="submit"]')).isEnabled(),
      5000
    );
    await element(by.xpath('//button[@type="submit"]')).click();
    await browser.wait(
      element(by.css('.swal2-confirm.swal2-styled')).isDisplayed(),
      5000
    );
    await element(by.css('button.swal2-confirm.swal2-styled')).click();
  }

  async contarTracks() {
    let rtaBool = await element(by.xpath('//*[@id="tackTable"]')).isPresent();
    if (await rtaBool) {
      const rowTracks = await element
        .all(by.xpath('//*[@id="tackTable"]/table/tbody/tr'))
        .count();
      return await rowTracks;
    } else {
      return await 0;
    }
  }

  async eliminarTrack() {
    let rtaBool = await element(by.xpath('//*[@id="tackTable"]')).isPresent();
    const rowTracks = await element
      .all(by.xpath('//*[@id="tackTable"]/table/tbody/tr'))
      .count();
    this.esperar(200);
    const tRow = await element.all(
      by.xpath('//*[@id="tackTable"]/table/tbody/tr')
    );
    await tRow[(await rowTracks) - 1].element(by.xpath('//td/button')).click();
    await browser.wait(
      element(
        by.css('.swal2-confirm.swal2-styled.swal2-default-outline')
      ).isPresent(),
      5000
    );
    this.esperar(200);
    await element(
      by.css('.swal2-confirm.swal2-styled.swal2-default-outline')
    ).click();
    await browser.wait(
      element(
        by.css('.swal2-confirm.swal2-styled.swal2-default-outline')
      ).isPresent(),
      5000
    );
    this.esperar(200);
    await element(
      by.css('.swal2-confirm.swal2-styled.swal2-default-outline')
    ).click();
  }
}
