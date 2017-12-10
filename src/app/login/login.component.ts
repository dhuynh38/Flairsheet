import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, NgForm } from '@angular/forms';

/**
 * Component that handles sign in.
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  /**
   * Contructs the component and inject all parameters.
   */
  public constructor() { }

  /**
   * Angular runs after creating the component.
   */
  public ngOnInit(): void {
    this.form = new FormGroup({
      'email': new FormControl(),
      'password': new FormControl()
    });
  }

  public printMyForm(): void {
    console.log(this.form);
  }

  public register(form: FormGroup): void {
    console.log('Registration successful.');
    console.log(form.value);
  }

}
