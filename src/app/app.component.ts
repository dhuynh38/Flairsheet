import { Component, OnInit } from '@angular/core';

import { SessionService } from './services/session/session.service';

/**
 * The root component that contains all other components.
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  /**
   * Contructs the component and injects all parameters.
   */
  public constructor(private sessionService: SessionService) {
  }

  /**
   * Angular runs after creating the component.
   */
  public ngOnInit(): void {
  }

  /**
   * Checks whether the user is logged in.
   * @returns {boolean} true if the user is logged in.
   */
  public isUserLoggedIn(): boolean {
    return this.sessionService.isUserLoggedIn();
  }

}
