import { AppPage } from '../app.po';
import { browser, logging } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('Listar coleccionistas', async() => {
    await page.navigateTo('/collectors/list');
    await browser.waitForAngular();
    let numberCollectorsInit = await page.obtenerTamanoColeccionistas()
    expect(await numberCollectorsInit > 0).toBeTruthy();
  });

  it('Crear un nuevo coleccionista', async() => {
    await page.navigateTo('/collectors/list');
    await browser.waitForAngular();
    await page.darClickAgregarColeccionista();
    await browser.waitForAngular();
    let numberCollectorsInit = await page.obtenerTamanoColeccionistas()
    await page.llenarFormularioColeccionista();
    await page.clickSubmitButton();
    let numberCollectorsEnd = await page.obtenerTamanoColeccionistas()
    await browser.waitForAngular();
    expect(await numberCollectorsInit < await numberCollectorsEnd).toBeTruthy();
  });

  it('Ver detalles de coleccionistas', async() => {
    await page.navigateTo('/collectors/list');
    await browser.manage().window().maximize();
    await browser.waitForAngular();
    let numberCollectors = await page.obtenerTamanoColeccionistas()
    for(let i=0; i<numberCollectors;i++)
    {
      await page.darClickVerColeccionista(i);
      await browser.sleep(500)
      await page.navigateTo('/collectors/list');
      await browser.waitForAngular();
    }
  });

  it('Adicionar un album a coleccionista', async ()=>{
    await page.navigateTo('/collectors/list');
    await browser.waitForAngular();
    await page.darClickVerColeccionista(0);
    await browser.waitForAngular();
    let numberAlbumsCollectorInit = await page.obtenerTamanoAlbumsColeccionista()
    await page.darClickAgregarAlbumColeccionista();
    await page.llenarFormularioAlbumColeccionista();
    await page.clickSubmitButton();
    let numberAlbumsCollectorEnd = await page.obtenerTamanoAlbumsColeccionista()
    await browser.waitForAngular();
    expect(await numberAlbumsCollectorInit < await numberAlbumsCollectorEnd).toBeTruthy();
  })

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
