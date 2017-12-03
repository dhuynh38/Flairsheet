import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() iconClick: EventEmitter<null> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  /* Releases the iconClick event up the chain
  */
  emitIconClick() {
    this.iconClick.emit();
  }

}
