import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {

  /**
   * Intercepts any requests sent to the backend and attaches a
   * token key to it to authenticate the user.
   * @param {HttpRequest<any>} req the request to intercept
   * @param {HttpHandler} next the next handler that the request will go to before being sent
   * @returns {Observable<HttpEvent<any>>} the observable that allows the HttpEvent
   * to watched after interception
   */
  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const tokenKey = localStorage.getItem('key');

    if (tokenKey) {
      const cloned = req.clone({
          headers: req.headers.set('Authorization', 'Bearer ' + tokenKey)
      });

      return next.handle(cloned);
    } else {
      return next.handle(req);
    }
  }

}
