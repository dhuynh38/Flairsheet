import { Component, OnInit } from '@angular/core';

import { UserService } from './../services/user/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  /**
   * Contructs the component and injects all parameters.
   */
  public constructor(private userService: UserService) { }

  /**
   * Angular runs after creating the component.
   */
  public ngOnInit() {
    this.userService.getUsers().subscribe(res => {
      console.log(res);
    },
    err => {
      console.log(err);
    }
  );
  }

}
