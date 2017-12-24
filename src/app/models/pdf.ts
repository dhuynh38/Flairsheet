import PDFJS from 'pdfjs-dist';

/**
 * Pdf class to handle instances of a pdf.
 */
export class Pdf {

  private _pdfDoc: any;
  private _pageNum: number;
  private _pageRendering: boolean;
  private _pageNumPending: number;
  private _scale: number;
  private _context: CanvasRenderingContext2D;
  private _numPages: number;

  /**
   * Constructs the pdf instance and gets the pdf file.
   * @param {string} url the url to the data or containing the data
   * @param {HTMLCanvasElement} _canvas the canvas for the pdf to draw on
   */
  public constructor(private url: string, private _canvas: HTMLCanvasElement) {
    this._pdfDoc = null;
    this._pageNum = 1;
    this._pageRendering = false;
    this._pageNumPending = null;
    this._scale = 1.5;
    this._context = this._canvas.getContext('2d');
    PDFJS.getDocument(url).then((pdfFile) => {
      this._pdfDoc = pdfFile;
      this._numPages = this._pdfDoc.numPages;
      this.renderPage(this._pageNum);
    }).catch((err) => {
      console.log('Error: Failed To Load PDF');
    });
  }

  /**
   * Getter for pageNum.
   * @returns {number} the current page number
   */
  public get pageNum(): number {
    return this._pageNum;
  }

  /**
   * Getter for numPages.
   * @returns {number} the total number of pages
   */
  public get numPages(): number {
    return this._numPages;
  }

  /**
   * Get page info from document, resize canvas accordingly, and render page.
   * @param {number} pageNumber the page number to render
   */
  public renderPage(pageNumber: number): void {
    this._pageRendering = true;
    this._pdfDoc.getPage(pageNumber).then((page) => {
      const viewport = page.getViewport(this._scale);
      this._canvas.height = viewport.height;
      this._canvas.width = viewport.width;

      const renderContext = {
        canvasContext: this._context,
        viewport: viewport
      };
      const renderTask = page.render(renderContext);

      renderTask.promise.then(() => {
        this._pageRendering = false;
        if (this._pageNumPending !== null) {
          this.renderPage(this._pageNumPending);
          this._pageNumPending = null;
        }
      }).catch((err) => {
        console.log('Error: Failed Rendering Task');
      });
    }).catch((err) => {
      console.log('Error: Failed To Render Page ' + pageNumber);
    });
  }

  /**
   * If another page rendering in progress, waits until the rendering is
   * finised. Otherwise, executes rendering immediately.
   * @param {number} pageNumber the page number.
   */
  public queueRenderPage(pageNumber: number): void {
    if (this._pageRendering) {
      this._pageNumPending = pageNumber;
    } else {
      this.renderPage(pageNumber);
    }
  }

  /**
   * Displays previous page.
   */
  public loadPrevPage(): void {
    if (this._pageNum <= 1) {
      return;
    }

    this._pageNum--;
    this.queueRenderPage(this._pageNum);
  }

  /**
   * Displays next page.
   */
  public loadNextPage(): void {
    if (this._pageNum >= this._pdfDoc.numPages) {
      return;
    }

    this._pageNum++;
    this.queueRenderPage(this._pageNum);
  }

}
