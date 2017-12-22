import { AbstractControl, ValidatorFn } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Content } from '../models/content';

import { ConfigService } from '../services/config/config.service';
import { FileService } from './../services/file/file.service';
import { PdfService } from '../services/pdf/pdf.service';
import { UploadService } from './../services/upload/upload.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

  @ViewChild('contentInput') _contentInput;
  @ViewChild('pdfViewer') _pdfViewer;

  private _file: File;
  private _fileReader: FileReader;
  private _form: FormGroup;
  private _iconUrl: SafeResourceUrl;
  private _audioIconUrl: SafeResourceUrl;
  private _imageUrl: SafeResourceUrl;
  private _videoUrl: SafeResourceUrl;
  private _audioUrl: SafeResourceUrl;
  private _pdfUrl: SafeResourceUrl;
  private _titleErrorMessage: string;
  private _descriptionErrorMessage: string;
  private _minorErrorMessage: string;
  private _majorErrorMessage: string;
  private _contentTypeErrorMessage: string;

  /**
   * Contructs the component and injects all parameters.
   */
  public constructor(private _formBuilder: FormBuilder,
      private _domSanitizer: DomSanitizer,
      private _configService: ConfigService,
      private _fileService: FileService,
      private _pdfService: PdfService,
      private _uploadService: UploadService) {
    }

  /**
   * Angular runs after creating the component.
   */
  public ngOnInit() {
    this._iconUrl = this._domSanitizer
      .bypassSecurityTrustResourceUrl('./assets/svg/add.svg');
    this._audioIconUrl = this._domSanitizer
      .bypassSecurityTrustResourceUrl('./assets/svg/audio.svg');
    this._fileReader = new FileReader();
    this.createForm();
  }

  /**
   * Getter for form.
   * @returns {FormGroup} the form the user is filling out
   */
  public get form(): FormGroup {
    return this._form;
  }

  /**
   * Getter for iconUrl.
   * @returns {SafeResourceUrl} the url of the icon
   */
  public get iconUrl(): SafeResourceUrl {
    return this._iconUrl;
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
   * Getter for titleErrorMessage.
   * @returns {string} the error message for title field.
   */
  public get titleErrorMessage(): string {
    return this._titleErrorMessage;
  }

  /**
   * Getter for descriptionErrorMessage.
   * @returns {string} the error message for description field.
   */
  public get descriptionErrorMessage(): string {
    return this._descriptionErrorMessage;
  }

  /**
   * Getter for majorErrorMessage.
   * @returns {string} the error message for major category field.
   */
  public get majorErrorMessage(): string {
    return this._majorErrorMessage;
  }

  /**
   * Getter for minorErrorMessage.
   * @returns {string} the error message for minor category field.
   */
  public get minorErrorMessage(): string {
    return this._minorErrorMessage;
  }

  /**
   * Getter for contentTypeErrorMessage.
   * @returns {string} the error message for content type field.
   */
  public get contentTypeErrorMessage(): string {
    return this._contentTypeErrorMessage;
  }

  /**
   * Checks to see if the add content icon can be displayed.
   * @returns {boolean} true if icon can be displayed
   */
  public canDisplayIcon(): boolean {
    return !this._imageUrl && !this._videoUrl && !this.audioUrl && !this.pdfUrl;
  }

  /**
   * Creates the form by using FormBuilder to initialize
   * FormGroup.
   */
  private createForm(): void {
    this._form = this._formBuilder.group({
      title: ['', [
        Validators.required,
        Validators.maxLength(50),
      ]],
      description: ['', [
        Validators.required,
        Validators.maxLength(250),
      ]],
      contentType: ['', [
        Validators.required,
        this.fileMimeTypeValidator()
      ]],
      major: ['', [
        Validators.required,
        Validators.maxLength(20),
      ]],
      minor: ['', [
        Validators.required,
        Validators.maxLength(20),
      ]]
    });
  }

  /**
   * Checks whether the Title input field has any
   * errors and if it does, set the error message accordingly.
   * @returns {boolean} true if Title field is valid
   */
  public isTitleValid(): boolean {
    const titleField = this._form.controls['title'];
    let validity = false;

    if (titleField.hasError('required')) {
      this._titleErrorMessage = this._configService.ERROR_REQUIRED;
    } else if (titleField.hasError('maxlength')) {
      this._titleErrorMessage = this._configService.ERROR_MAX_LENGTH_50;
    } else {
      validity = true;
    }

    return validity;
  }

  /**
   * Checks whether the Description input field has any
   * errors and if it does, set the error message accordingly.
   * @returns {boolean} true if Description field is valid
   */
  public isDescriptionValid(): boolean {
    const descriptionField = this._form.controls['description'];
    let validity = false;

    if (descriptionField.hasError('required')) {
      this._descriptionErrorMessage = this._configService.ERROR_REQUIRED;
    } else if (descriptionField.hasError('maxlength')) {
      this._descriptionErrorMessage = this._configService.ERROR_MAX_LENGTH_250;
    } else {
      validity = true;
    }

    return validity;
  }

  /**
   * Checks whether the Major Category input field has any
   * errors and if it does, set the error message accordingly.
   * @returns {boolean} true if Major Category field is valid
   */
  public isMajorValid(): boolean {
    const majorField = this._form.controls['major'];
    let validity = false;

    if (majorField.hasError('required')) {
      this._majorErrorMessage = this._configService.ERROR_REQUIRED;
    } else if (majorField.hasError('maxlength')) {
      this._majorErrorMessage = this._configService.ERROR_MAX_LENGTH_20;
    } else {
      validity = true;
    }

    return validity;
  }

  /**
   * Checks whether the Minor Category input field has any
   * errors and if it does, set the error message accordingly.
   * @returns {boolean} true if Minor Category field is valid
   */
  public isMinorValid(): boolean {
    const minorField = this._form.controls['minor'];
    let validity = false;

    if (minorField.hasError('required')) {
      this._minorErrorMessage = this._configService.ERROR_REQUIRED;
    } else if (minorField.hasError('maxlength')) {
      this._minorErrorMessage = this._configService.ERROR_MAX_LENGTH_20;
    } else {
      validity = true;
    }

    return validity;
  }

  /**
   * Checks whether Content Type has any
   * errors and if it does, set the error message accordingly.
   * @returns {boolean} true if Contenty Type field is valid
   */
  public isContentTypeValid(): boolean {
    const contentTypeField = this._form.controls['contentType'];
    let validity = false;

    if (contentTypeField.hasError('required')) {
      this._contentTypeErrorMessage = '';
    } else if (contentTypeField.hasError('mimetype')) {
      this._contentTypeErrorMessage = this._configService.ERROR_INVALID_MIME_TYPE;
    } else {
      validity = true;
    }

    return validity;
  }

  /**
   * Returns a validator to checks whether the input file is
   * valid. If the file is valid, then display a previous. Otherwise,
   * set the error for the field.
   * @returns {ValidatorFn} a validator function to validate the date format
   */
  private fileMimeTypeValidator(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {
      let validMimeType = false;

      if (control.value) {
        console.log(this._file.type);
        validMimeType = this._fileService.isMimeTypeValid(control.value);

        if (!validMimeType) {
          this.clearUrls();
        } else {
          this.displayPreview();
        }
      }
      return !validMimeType ? {'mimetype': {value: control.value}} : null;
    };
  }

  /**
   * Sets all urls to null.
   */
  private clearUrls(): void {
    this._imageUrl = null;
    this._videoUrl = null;
    this._audioUrl = null;
    this._pdfUrl = null;
  }

  /**
   * Sets the url of the input file to display
   * a preview of it.
   */
  private displayPreview(): void {
    if (this._file.type.includes('image')) {
      this._fileReader.onload = (event: any) => {
        this._imageUrl = this._domSanitizer
          .bypassSecurityTrustResourceUrl(this._fileReader.result);
      };
      this._fileReader.readAsDataURL(this._file);
    } else if (this._file.type.includes('video')) {
      this._fileReader.onload = (event: any) => {
        this._videoUrl = this._domSanitizer
          .bypassSecurityTrustResourceUrl(this._fileReader.result);
      };
      this._fileReader.readAsDataURL(this._file);
    } else if (this._file.type.includes('audio')) {
      this._fileReader.onload = (event: any) => {
        this._audioUrl = this._domSanitizer
          .bypassSecurityTrustResourceUrl(this._fileReader.result);
      };
      this._fileReader.readAsDataURL(this._file);
    } else if (this._file.type.includes('pdf')) {
      this._pdfUrl = 'exists';
      this._fileReader.onload = (event: any) => {
        this._pdfService.displayFirstPage(
          this._fileReader.result,
          this._pdfViewer.nativeElement
        );
      };
      this._fileReader.readAsArrayBuffer(this._file);
    }
  }

  /**
   * Checks to see if a file is selected and set the form
   * controls accordingly.
   */
  public setSelectedFile(): void {
    const fi = this._contentInput.nativeElement;
    if (fi.files && fi.files[0]) {
      this.clearUrls();
      this._file = fi.files[0];
      this._form.controls['contentType'].setValue(this._file.type);
    }
  }

  /**
   * Generates a Content object based on the data from the form.
   * @param {FormGroup} form the form to generate the Content object from
   * @returns {Content} the content object generated
   */
  private generateNewContent(form: FormGroup): Content {
    return {
      _id: '',
      title: this._form.get('title').value,
      description: this._form.get('description').value,
      author: null,
      contentType: this._form.get('contentType').value,
      major: this._form.get('major').value,
      minor: this._form.get('minor').value,
      comments: null,
      suggestions: null,
      requests: null,
      views: 0,
      upvotes: 0,
      downvotes: 0,
      file: this._file,
    };
  }

  /**
   * Generates a FormData object with all the Content object's
   * properties along with the file's data.
   * @param {Content} content the content object to generate into form data
   * @returns {FormData} the form data object with the file data
   */
  private generateFormData(content: Content): FormData {
    const formData = new FormData();

    formData.append('file', this._file);
    formData.append('title', this._form.get('title').value);
    formData.append('description', this._form.get('description').value);
    formData.append('contentType', this._form.get('contentType').value);
    formData.append('major', this._form.get('major').value);
    formData.append('minor', this._form.get('minor').value);
    return formData;
  }

  /**
   * Upload the selected file.
   * @param {FormGroup} form the form containing data of file to be uploaded
   */
  public upload(form: FormGroup): void {
    console.log('Uploaded');
    console.log(form.value);
    const newContent = this.generateNewContent(form);
    const formData = this.generateFormData(newContent);
    this._uploadService.uploadFile(formData).subscribe((results) => {
      console.log(results);
    }, (error) => {
      console.log(error);
    });
  }

}
