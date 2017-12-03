import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  @Input() loggedIn: boolean;
  @Output() sideMenuClick: EventEmitter<null> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  /* Releases the sideMenuClick event up the chain
  */
  emitSideMenuClick() {
    this.sideMenuClick.emit();
  }

}
