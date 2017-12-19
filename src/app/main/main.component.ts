import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';

/**
 * Component that handles the main page when visiting the app.
 */
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  /**
   * Contructs the component and injects all parameters.
   */
  public constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
      'flare',
      sanitizer.bypassSecurityTrustResourceUrl('assets/svg/flare.svg'));
    iconRegistry.addSvgIcon(
      'visibility',
      sanitizer.bypassSecurityTrustResourceUrl('assets/svg/visibility.svg'));
    iconRegistry.addSvgIcon(
      'supervisor_account',
      sanitizer.bypassSecurityTrustResourceUrl('assets/svg/supervisor_account.svg'));
  }

  /**
   * Angular runs after creating the component.
   */
  public ngOnInit(): void {
  }

}
