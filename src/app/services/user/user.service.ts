import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../models/user';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {

  constructor(private http: HttpClient) { }

  /**
   * POST: Save the user input into the database.
   * @param User the user to be stored in the database
   */
  public createUser(user: User): Observable<any> {
    return this.http
      .post('/api/user', user, {
        headers: new HttpHeaders().set('Authorization', 'my-auth-token')
      });
  }

}
