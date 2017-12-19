import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { User } from '../../models/user';

import 'rxjs/add/operator/map';

/**
 * Service to make requests with users.
 */
@Injectable()
export class UserService {

  /**
   * Contructs the service and injects all parameters.
   */
  public constructor(private _http: HttpClient) {
  }

  /**
   * POST: Save the user input into the database. The
   * server should respond with the same user in the database.
   * @param {User} user the user to be stored in the database
   * @returns {Observable<User>} an observable to observe for data
   * coming from the server
   */
  public createUser(user: User): Observable<Object> {
    return this._http
      .post('/api/user/create', user)
      .map((res) => res['token']);
  }

  /**
   * POST: Send the login request to the server. The
   * server should respond with the user from the database.
   * @param {User} user the user to be stored in the database
   * @returns {Observable<User>} an observable to observe for data
   * coming from the server
   */
  public loginUser(user: User): Observable<Object> {
    return this._http
      .post('/api/user/login', user)
      .map((res) => res['token']);
  }

  /**
   * GET: Gets all the users from the databse.
   * @returns {Observable<User>} an observable to obtain for data
   * coming from the server
   */
  public getUsers(): Observable<User> {
    return this._http
      .get('/api/user/')
      .map((res) => res['data']);
  }

}
