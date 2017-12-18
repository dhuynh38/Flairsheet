import { Injectable } from '@angular/core';

import * as moment from 'moment';

/**
 * Service to store information in local storage.
 */
@Injectable()
export class SessionService {

  /**
   * Contructs the service and injects all parameters.
   */
  public constructor() { }

  /**
   * Stores a token in the browser's local storage for later use.
   * @param token the token object to be stored
   */
  public storeToken(token): void {
    const numberOfDays = JSON.parse(token.expiresIn.split(' ')[0]);
    const expirationDate = moment().add(numberOfDays, 'days').toISOString();

    localStorage.setItem('key', token.key);
    localStorage.setItem('expirationDate', expirationDate);
  }

  /**
   * Stores a token in the browser's local storage for later use.
   */
  public deleteToken(): void {
    localStorage.removeItem('key');
    localStorage.removeItem('expirationDate');
  }

  /**
   * Gets the expiration date of the user's session.
   * @returns moment the data and time of when the session will expire
   */
  public getTokenExpirationDate(): moment.Moment {
    const expirationDate = localStorage.getItem('expirationDate');
    return moment(expirationDate);
  }

  /**
   * Checks to see if a user has been authenticated and is logged in.
   * @returns boolean true if user is logged in
   */
  public isUserLoggedIn(): boolean {
    return moment().isBefore(this.getTokenExpirationDate());
  }

}
