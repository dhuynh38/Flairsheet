import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {

  userLoggedIn = false;

  /* Checks to see if the user is logged in.
   * @returns {boolean} true if the user is logged in
  */
  isUserLoggedIn() {
    return this.userLoggedIn;
  }

}
