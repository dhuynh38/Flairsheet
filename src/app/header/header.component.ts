import { Component, EventEmitter, OnInit, Output } from '@angular/core';

/**
 * Component that handles the header.
 */
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() iconClick: EventEmitter<null> = new EventEmitter();

  /**
   * Contructs the component and inject all parameters.
   */
  public constructor() { }

  /**
   * Angular runs after creating the component.
   */
  public ngOnInit(): void {
  }

  /**
   * Releases the iconClick event up the chain.
   */
  public emitIconClick(): void {
    this.iconClick.emit();
  }

}
