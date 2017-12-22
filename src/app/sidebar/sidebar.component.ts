import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router} from '@angular/router';

import { SessionService } from './../services/session/session.service';

/**
 * Component that handles the sidebar.
 */
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  @Input() loggedIn: boolean;
  @Output() sideMenuClick: EventEmitter<null> = new EventEmitter();

  /**
   * Contructs the component and inject all parameters.
   */
  public constructor(private _router: Router,
    private _sessionService: SessionService) { }

  /**
   * Angular runs after creating the component.
   */
  public ngOnInit(): void {
  }

  /**
   * Releases the sideMenuClick event up the chain
   */
  public emitSideMenuClick(): void {
    this.sideMenuClick.emit();
  }

  /**
   * Clears the token in storage and sends the user back to
   * the log in screen.
   */
  public logout(): void {
    this._sessionService.deleteToken();
    this._router.navigate(['']);
  }

}
