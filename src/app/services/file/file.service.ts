import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
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
  public constructor(private _http: HttpClient,
    private _domSanitizer: DomSanitizer) {
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

  /**
   * GET: Gets one file's raw data based on given fileId.
   * @param {string} fileId the fileId of the file to be retreived
   * @param {string} contentType the content type of the file to be retreived
   * @returns {Observable<any>} an observable containing
   * raw binary data of the file or a url to a blob of the data
   */
  public getFileWithId(fileId: string, contentType: string): Observable<any> {
    return this._http
      .get('/api/file/' + fileId, {
        responseType: 'arraybuffer'
      })
      .map((res) => {
        if (!contentType.includes('pdf')) {
          const blob = new Blob([res]);
          const blobUrl = URL.createObjectURL(blob);
          return this._domSanitizer.bypassSecurityTrustResourceUrl(blobUrl);
        }
        return res;
      });
  }
}
