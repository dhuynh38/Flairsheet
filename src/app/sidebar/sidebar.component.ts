import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

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
  public constructor() { }

  /**
   * Angular runs after creating the component.
   */
  public ngOnInit(): void {
  }

  /* Releases the sideMenuClick event up the chain
  */
  public emitSideMenuClick(): void {
    this.sideMenuClick.emit();
  }

}
