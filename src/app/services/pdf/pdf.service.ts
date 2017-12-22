import { Injectable } from '@angular/core';
import { PDFJS } from 'pdfjs-dist';

/**
 * Service to interact with pdf.js and load pdf files.
 */
@Injectable()
export class PdfService {

  /**
   * Contructs the service and injects all parameters.
   */
  constructor() { }

  /**
   * Displays the first page of the pdf on the provided
   * canvas.
   * @param {string} url the url or data of the pdf itself
   * @param {HTMLCanvasElement}canvas the canvas object to draw the pdf on
   */
  public displayFirstPage(url: string, canvas: HTMLCanvasElement): void {
    PDFJS.getDocument(url).then((pdfFile) => {
      pdfFile.getPage(1).then((page) => {
        const scale = 1.5;
        const viewport = page.getViewport(scale);

        const context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        const renderContext = {
          canvasContext: context,
          viewport: viewport
        };
        page.render(renderContext);
      });
    });
  }

}
