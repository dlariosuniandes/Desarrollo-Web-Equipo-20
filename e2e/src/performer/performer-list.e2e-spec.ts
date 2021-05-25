import { AppPage } from '../app.po';
import { browser, element, logging, by } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('navegar a ruta de artistas', async () => {
    await page.navigateToRoute('performers/list');
    await browser.waitForAngular();
  });

  it('debe existir listado de musicos y Bandas', async () => {
    await browser.waitForAngular();
    const musicosTitle = await element(
      by.xpath(`div[@class="list-container"]/h1[text()="Musicos"]`)
    );
    await browser.waitForAngular();
    expect(musicosTitle).toBeTruthy();
    await browser.waitForAngular();
    const listMusician = await element
      .all(by.xpath(`//div[contains(@class,'musician-card')]`))
      .count();
    await browser.waitForAngular();
    expect(listMusician).toBeGreaterThan(0);

    const listBand = await element
      .all(by.xpath(`//div[contains(@class,'band-card')]`))
      .count();
    expect(listBand).toBeGreaterThan(0);
  });

  it('debe hacer click en una carta y renderear el detail', async () => {
    await element(by.xpath(`//button[text()=" Ver detalles "]`)).click();
    expect(browser.getCurrentUrl()).toContain('musician' || 'band');
  });

  it('deben encontrarse los elementos de card perfomer y lista de albumes en detail', async () => {
    const performerCard = element
      .all(
        by.xpath(
          `//div[@class="container perfomer-card-container col-lg-12 col-md-12 col-sm-12"]`
        )
      )
      .count();
    expect(performerCard).toEqual(1);
    const albumList = element
      .all(by.xpath(`div[@class="list-container container"]`))
      .count();
    expect(performerCard).toEqual(1);
  });
  it('debe crear un artista y verificar que se haya agregado al listado de artistas', async () => {
    await page.navigateToRoute('performers/list');
    await browser.waitForAngular();
    await browser.sleep(200);
    const buttonAdd = await element(
      by.xpath(`//button[text()=" Agregar Artista "]`)
    );
    await browser.sleep(200);
    await buttonAdd.click();
    await browser.sleep(200);
    await browser.waitForAngular();
    const inputName = await element(
      by.xpath(`//input[@formcontrolname="name"]`)
    );
    await inputName.sendKeys('Banda Test');
    await browser.sleep(200);
    const inputImg = await element(
      by.xpath(`//input[@formcontrolname="image"]`)
    );
    await browser.sleep(200);
    await inputImg.sendKeys(
      'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Ruben_Blades_by_Gage_Skidmore.jpg/800px-Ruben_Blades_by_Gage_Skidmore.jpg'
    );
    await browser.sleep(200);
    const inputDescription = await element(
      by.xpath(`//textarea[@formcontrolname="description"]`)
    );
    await inputDescription.sendKeys('Descripción Test');
    await browser.sleep(200);
    const inputDate = await element(
      by.xpath(`//input[@formcontrolname="date"]`)
    );
    await inputDate.sendKeys('19/12/1970');
    await browser.sleep(200);
    const selectType = await element(
      by.xpath(`//select[@formcontrolname="performerType"]`)
    );
    await selectType.click();
    await browser.sleep(200)
    const option = await element(by.xpath(`//option[@value="1: Músico"]`));
    await option.click();
    await browser.sleep(200);
    const button = await element(by.xpath(`//button[text()=" Create "]`));
    await button.click();
    await page.navigateToRoute('performers/list');
    await browser.waitForAngular();
    const createdPerfomer = element
      .all(by.xpath(`//p[text()="Banda Test"]`))
      .count();
    expect(await createdPerfomer).toBeGreaterThan(0)
  });

  it('debe asociar un musico a una banda cualquiera sin regresar error', async () => {
    await page.navigateToRoute('performers/list');
    await browser.waitForAngular();
    await element(by.xpath(`//button[text()=" Ver detalles "]`)).click();
    expect(await browser.getCurrentUrl()).toContain('musician' || 'band');
    await browser.sleep(200);
    const buttonAdd = await element(
      by.xpath(`//button[@data-target="#musicianAssociateModal"]`)
    );
    await browser.sleep(200);
    await buttonAdd.click();
    await browser.sleep(200);
    const selectType = await element(
      by.xpath(`//select[@formcontrolname="band"]`)
    );
    await selectType.click();
    browser.sleep(200)
    const option = await element(by.xpath(`//option[@value="1: 101"]`));
    await option.click();
    await browser.sleep(200);
    const button = await element(by.xpath(`//button[text()=" Create "]`));
    await button.click();
    await browser.sleep(200);
  })
});
