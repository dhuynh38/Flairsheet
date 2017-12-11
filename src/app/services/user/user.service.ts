import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../models/user';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';

/**
 * Service to make requests with users.
 */
@Injectable()
export class UserService {

  /**
   * Contructs the service and inject all parameters.
   */
  constructor(private _http: HttpClient) {
  }

  /**
   * POST: Save the user input into the database. The
   * server should respond with the same user in the database.
   * @param User the user to be stored in the database
   */
  public createUser(user: User): Observable<User> {
    return this._http
      .post('/api/user/create', user, {
        headers: new HttpHeaders().set('Authorization', 'my-auth-token')
      })
      .map((res) => res['results']);
  }

  /**
   * POST: Send the login request to the server. The
   * server should respond with the user from the database.
   * @param User the user to be stored in the database
   */
  public loginUser(user: User): Observable<User> {
    return this._http
      .post('/api/user/login', user, {
        headers: new HttpHeaders().set('Authorization', 'my-auth-token')
      })
      .map((res) => res['results']);
  }

}
