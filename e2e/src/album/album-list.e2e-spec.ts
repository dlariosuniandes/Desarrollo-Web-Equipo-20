import { AppPage } from '../app.po';
import { browser, logging } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  for(let i=0;i<9;i++)
  {
    it('El boton de agregar album dispara el componente de crear album en un modal', async() => {
      await page.navigateTo();
      await browser.waitForAngular()
      await page.darClickAgregarAlbum()
      await browser.waitForAngular()
      expect(await page.verificaExistenciaDeModal('albumCreationModal')).toBeTruthy(); 
    });
  
    it('Crea un album y espera que se visualice en el listado', async() => {
      await page.navigateTo();
      await browser.waitForAngular()
      await page.darClickAgregarAlbum()
      await browser.waitForAngular()
      let numberCardsInit = await page.obtenerTamanoCartasAlbums()
      await page.llenarFormularioAlbum();
      await page.clickSubmitButton();
      let numberCardsEnd = await page.obtenerTamanoCartasAlbums()
      expect(await numberCardsInit < await numberCardsEnd).toBeTruthy()
  
    });
  
    it('El boton ver detalle Album navega hasta el detalle de un album y regresa al listado', async() => {
      await page.navigateTo();
      await browser.manage().window().maximize();
      await browser.waitForAngular();
      let numberCards:number
      numberCards = await page.obtenerTamanoCartasAlbums()
      for(let i=0; i<numberCards;i++)
      {
        const idAlbum = await page.detallarAlbum(i);
        await browser.waitForAngular();
        await page.verificarUrl(await idAlbum);
        await browser.waitForAngular();
        await page.volverListaAlbums();
        await browser.waitForAngular();
      }
  
    });
  
    it('Crea un track en el primer album', async ()=>
    {
      await page.navigateTo();
      await browser.manage().window().maximize();
      await browser.waitForAngular();
      const idAlbum = await page.detallarAlbum(0);
      await browser.waitForAngular();
      const numberTracksInit = await page.contarTracks();
      await page.verificarUrl(await idAlbum);
      await page.clickAgregarTrack();
      await browser.waitForAngular();
      await page.llenarFormularioTrack();
      await browser.waitForAngular();
      const numberTracksEnd = await page.contarTracks();
      expect(await numberTracksInit<numberTracksEnd).toBeTruthy();
    })
  
    it('Elimina el ultimo track del primer album',async ()=>
    {
      await page.navigateTo();
      await browser.manage().window().maximize();
      await browser.waitForAngular();
      const idAlbum = await page.detallarAlbum(0);
      await browser.waitForAngular();
      const numberTracksInit = await page.contarTracks();
      await page.verificarUrl(await idAlbum);
      await page.eliminarTrack();
      await browser.waitForAngular();
      const numberTracksEnd = await page.contarTracks();
      expect(await numberTracksInit>numberTracksEnd).toBeTruthy();

    })
 
  
    it('Elimina el ultimo album de la lista', async ()=>
    {
      await page.navigateTo();
      await browser.manage().window().maximize();
      await browser.waitForAngular();
      let numberCardsInit =  await page.obtenerTamanoCartasAlbums()
      const idAlbum = await page.detallarAlbum((await numberCardsInit)-1);
      await browser.waitForAngular();
      await page.verificarUrl(await idAlbum);
      await page.eliminarAlbum();
      await browser.waitForAngular();
      let numberCardsEnd =  await page.obtenerTamanoCartasAlbums();
      expect(await numberCardsEnd< await numberCardsInit).toBeTruthy();
      
    })
  }





  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
