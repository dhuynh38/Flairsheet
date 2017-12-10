import { Component, OnInit } from '@angular/core';

/**
 * Component that handles when url is unknown.
 */
@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit {

  /**
   * Contructs the component and inject all parameters.
   */
  public constructor() { }

  /**
   * Angular runs after creating the component.
   */
  public ngOnInit(): void {
  }

}
