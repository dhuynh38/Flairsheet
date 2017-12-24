import { ApplicationRef } from '@angular/core';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';

import { FileService } from './../services/file/file.service';

import { Content } from '../models/content';
import { Pdf } from '../models/pdf';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

  @ViewChild('pdfViewer') pdfViewer;
  @Input() content: Content;

  private _audioIconUrl: SafeResourceUrl;
  private _imageUrl: SafeResourceUrl;
  private _videoUrl: SafeResourceUrl;
  private _audioUrl: SafeResourceUrl;
  private _pdfUrl: SafeResourceUrl;
  private _profileImageUrl: SafeResourceUrl;
  private _pdf: Pdf;
  private _isLoading: boolean;

  /**
   * Contructs the component and injects all parameters.
   */
  public constructor(private _applicationRef: ApplicationRef,
    private _domSanitizer: DomSanitizer,
    private _fileService: FileService,
    private _iconRegistry: MatIconRegistry) {
  }

  /**
   * Getter for iconUrl.
   * @returns {SafeResourceUrl} the url of the icon
   */
  public get audioIconUrl(): SafeResourceUrl {
    return this._audioIconUrl;
  }

  /**
   * Getter for imageUrl.
   * @returns {SafeResourceUrl} the url of the image
   */
  public get imageUrl(): SafeResourceUrl {
    return this._imageUrl;
  }

  /**
   * Getter for videoUrl.
   * @returns {SafeResourceUrl} the url of the video
   */
  public get videoUrl(): SafeResourceUrl {
    return this._videoUrl;
  }

  /**
   * Getter for audioUrl.
   * @returns {SafeResourceUrl} the url of the audio
   */
  public get audioUrl(): SafeResourceUrl {
    return this._audioUrl;
  }

  /**
   * Getter for pdfUrl.
   * @returns {SafeResourceUrl} the url of the pdf
   */
  public get pdfUrl(): SafeResourceUrl {
    return this._pdfUrl;
  }

  /**
   * Getter for imageUrl.
   * @returns {SafeResourceUrl} the url of the image
   */
  public get profileImageUrl(): SafeResourceUrl {
    return this._profileImageUrl;
  }

  /**
   * Getter for pdf.
   * @returns {pdf} the pdf object
   */
  public get pdf(): Pdf {
    return this._pdf;
  }

  /**
   * Getter for isLoading.
   * @returns {boolean} whether the object is still loading
   */
  public get isLoading(): boolean {
    return this._isLoading;
  }

  /**
   * Angular runs after creating the component.
   */
  public ngOnInit() {
    this._isLoading = true;
    this._iconRegistry.addSvgIcon(
      'thumbs-up',
      this._domSanitizer.bypassSecurityTrustResourceUrl('./assets/svg/thumbs-up.svg'));
    this._iconRegistry.addSvgIcon(
      'thumbs-down',
      this._domSanitizer.bypassSecurityTrustResourceUrl('./assets/svg/thumbs-down.svg'));
    this._audioIconUrl = this._domSanitizer
      .bypassSecurityTrustResourceUrl('./assets/svg/audio.svg');
    this._profileImageUrl = this._domSanitizer
      .bypassSecurityTrustResourceUrl('./assets/svg/profile.svg');
    this.setContentBasedOnType();
  }


  /**
   * Retrieves file data from the database and send the data to the correct element
   * to be displayed.
   */
  public setContentBasedOnType(): void {
    if (this._fileService.isMimeTypeValid(this.content.contentType)) {
      this ._fileService.getFileWithId(this.content.file, this.content.contentType)
      .subscribe((result) => {
        this.content.file = result;
        this._isLoading = false;

        if (this.content.contentType.includes('image')) {
          this._imageUrl = this.content.file;
        } else if (this.content.contentType.includes('video')) {
          this._videoUrl = this.content.file;
        } else if (this.content.contentType.includes('audio')) {
          this._audioUrl = this.content.file;
        } else if (this.content.contentType.includes('pdf')) {
          this._pdfUrl = 'exists';
          this._applicationRef.tick();
          this._pdf = new Pdf(this.content.file, this.pdfViewer.nativeElement);
        }
      }, (err) => {
      console.log('Error: Failed To Retreive File.');
      });
    }
  }
}
