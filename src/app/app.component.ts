import { Component, OnInit } from '@angular/core';

/**
 * The root component that contains all other components.
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  private _userLoggedIn: boolean;

  /**
   * Angular runs after creating the component.
   */
  public ngOnInit(): void {
    this._userLoggedIn = false;
  }

  /**
   * Getter for _userLoggedIn.
   */
  public get userLoggedIn(): boolean {
    return this._userLoggedIn;
  }

}
