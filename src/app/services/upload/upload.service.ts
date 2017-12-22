import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { User } from '../../models/user';

import 'rxjs/add/operator/map';

import { Content } from '../../models/content';

/**
 * Service to send upload requests to backend.
 */
@Injectable()
export class UploadService {

  /**
   * Contructs the service and injects all parameters.
   */
  public constructor(private _http: HttpClient) {
  }

    /**
   * POST: Save user generated content to the database.
   * @param {FormData} formData the content to be stored in the database
   * @returns {Observable<Object>} an observable to observe for data
   * coming from the server
   */
  public uploadFile(formData: FormData): Observable<Object> {
    return this._http.post('/api/content/upload', formData)
      .map((res) => res['message']);
  }

}
