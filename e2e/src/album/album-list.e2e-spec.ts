import { AppPage } from '../app.po';
import { browser, logging } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('El boton de agregar album dispara el componente de crear album en un modal', async() => {
    page.navigateTo();
    browser.waitForAngular()
    page.darClickAgregarAlbum()
    browser.waitForAngular()
    expect(page.verificaExistenciaDeModal('albumCreationModal')).toBeTruthy(); 
  });

  it('El boton ver detalle Album navega hasta el detalle de un album y regresa al listado', async() => {
    page.navigateTo();
    browser.manage().window().maximize();
    browser.waitForAngular();
    let numberCards:number
    numberCards = await page.obtenerTamanoCartasAlbums()
    for(let i=0; i<numberCards;i++)
    {
      const idAlbum = await page.detallarAlbum(i);
      browser.waitForAngular();
      page.verificarUrl(idAlbum);
      browser.waitForAngular();
      page.volverListaAlbums();
    }
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
