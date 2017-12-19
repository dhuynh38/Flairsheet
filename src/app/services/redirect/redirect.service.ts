import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';

import { SessionService } from './../session/session.service';

@Injectable()
export class RedirectService implements CanActivate {

  private _redirectUrl: string;

  /**
   * Contructs the service and injects all parameters.
   */
  public constructor(private _sessionService: SessionService,
    private _router: Router) {
      this._redirectUrl = null;
    }


  /**
   * Getter for the redirectUrl.
   * @returns {string} the url the user should be redirected to after login
   */
  public get redirectUrl(): string {
    return this._redirectUrl;
  }

  /**
   * Setter for the redirectUrl.
   * @param {string} url the new url to set redirectUrl to
   */
  public set redirectUrl(url: string) {
    this._redirectUrl = url;
  }

  /**
   * Redirects users to the main page if they are not authenticated and
   * redirects users to the home page if they have already authenticated themselves.
   * It also stores the url of when the user goes directly to a link and needs to
   * login before they can access that link.
   * @param {ActivatedRouteSnapshot} route the current route (more detailed version of state)
   * @param {RouterStateSnapshot} state the current state
   * @returns {boolean} whether the route can be activated
   */
  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (state.url === '/' && this._sessionService.isUserLoggedIn()) {
      this._router.navigate(['home']);
      return false;
    } else if (state.url === '/' && !this._sessionService.isUserLoggedIn()) {
      return true;
    } else if (!this._sessionService.isUserLoggedIn()) {
      this._redirectUrl = state.url;
      this._router.navigate(['']);
      return false;
    } else {
      return true;
    }
  }

}
