import { Injectable } from '@angular/core';

/**
 * Service to handle file type validation.
 */
@Injectable()
export class FileService {

  private _allowedImageType: Array<string>;
  private _allowedVideoType: Array<string>;
  private _allowedAudioType: Array<string>;
  private _allowedApplicationType: Array<string>;

  /**
   * Contructs the service and injects all parameters.
   */
  constructor() {
    this._allowedImageType = [
      'image/jpg',
      'image/jpeg',
      'image/png'
    ];
    this._allowedVideoType = [
      'video/mp4',
      'video/quicktime'
    ];
    this._allowedAudioType = [
      'audio/mp4',
      'audio/mp3',
      'audio/mpeg',
      'audio/wav'
    ];
    this._allowedApplicationType = [
      'application/pdf'
    ];
  }

  /**
   * Checks to see if a mime type is valid and allowed.
   * @param: {string} the mimen type to check
   * @returns: {boolean} true if the mime type is allowed
   */
  public isMimeTypeValid(content: string): boolean {
    if (content.includes('image')) {
      return this._allowedImageType.indexOf(content) !== -1;
    } else if (content.includes('video')) {
      return this._allowedVideoType.indexOf(content) !== -1;
    } else if (content.includes('audio')) {
      return this._allowedAudioType.indexOf(content) !== -1;
    } else if (content.includes('application')) {
      return this._allowedApplicationType.indexOf(content) !== -1;
    }
  }

}
