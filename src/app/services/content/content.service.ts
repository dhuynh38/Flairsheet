import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Content } from '../../models/content';
import { User } from '../../models/user';

import 'rxjs/add/operator/map';

/**
 * Service to retreive content from the database.
 */
@Injectable()
export class ContentService {

  /**
   * Contructs the service and injects all parameters.
   */
  public constructor(private _http: HttpClient) {
  }

  /**
   * GET: Gets all content from the databse.
   * @returns {Observable<Object[]>} an observable to obtain for data
   * coming from the server
   */
  public getContent(): Observable<Object[]> {
    return this._http
      .get('/api/content/')
      .map((res) => res['data']);
  }

  /**
   * GET: Gets content from database based on specific id.
   * @returns {Observable<Content>} an observable to obtain for data
   * coming from the server
   */
  public getContentWithId(contentId: any): Observable<Content> {
    return this._http
      .get('/api/content/' + contentId)
      .map((res) => res['data']);
  }

}
