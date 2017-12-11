import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router} from '@angular/router';

import { User } from '../models/user';

import { ConfigService } from '../services/config/config.service';
import { UserService } from '../services/user/user.service';

/**
 * Component that handles sign in.
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private _form: FormGroup;
  private _emailErrorMessage;
  private _passwordErrorMessage;
  private _loginErrorMessage: String;
  private _user: User;
  private _loginInFailed: Boolean;

  /**
   * Contructs the component and inject all parameters.
   */
  public constructor(private _formBuilder: FormBuilder,
    private _router: Router,
    private _route: ActivatedRoute,
    private _configService: ConfigService,
    private _userService: UserService) {
  }

  /**
   * Angular runs after creating the component.
   */
  public ngOnInit(): void {
    this._loginErrorMessage = this._configService.ERROR_LOGIN_FAILED;
    this.createForm();
    this._user = {
      firstname: '',
      lastname: '',
      username: '',
      usernameOriginal: '',
      email: '',
      password: '',
      birthday: null,
      sex: '',
      verified: false
    };
    this._loginInFailed = true;
  }

  /**
   * Getter for _form.
   * @returns FormGroup the form to sign in with
   */
  public get form(): FormGroup {
    return this._form;
  }

  /**
   * Getter for _loginInFailed.
   * @returns Boolean true if user failed to log in
   */
  public get loginInFailed(): Boolean {
    return this._loginInFailed;
  }

  /**
   * Getter for loginErrorMessage.
   * @returns String error message when login failed
   */
  public get loginErrorMessage(): String {
    return this._loginErrorMessage;
  }

  /**
   * Getter for emailErrorMessage.
   * @returns String error message when email field is invalid
   */
  public get emailErrorMessage(): String {
    return this._emailErrorMessage;
  }

  /**
   * Getter for passwordErrorMessage.
   * @returns String error message when password field is invalid
   */
  public get passwordErrorMessage(): String {
    return this._passwordErrorMessage;
  }

  /**
   * Checks whether the Email input field has any
   * errors and if it does, set the error message accordingly.
   * @returns Boolean true if Email field is valid
   */
  public isEmailValid(): Boolean {
    const emailField = this._form.controls['email'];
    let validity = false;

    if (emailField.hasError('required')) {
      this._emailErrorMessage = this._configService.ERROR_REQUIRED;
    } else {
      validity = true;
    }

    return validity;
  }

  /**
   * Checks whether the Password input field has any
   * errors and if it does, set the error message accordingly.
   * @returns Boolean true if Password field is valid
   */
  public isPasswordValid(): Boolean {
    const passwordField = this.form.controls['password'];
    let validity = false;

    if (passwordField.hasError('required')) {
      this._passwordErrorMessage = this._configService.ERROR_REQUIRED;
    } else {
      validity = true;
    }

    return validity;
  }

    /**
   * Creates the form by using FormBuilder to initialize
   * FormGroup.
   */
  private createForm(): void {
    this._form = this._formBuilder.group({
      email: ['', [
        Validators.required,
      ]],
      password: ['', [
        Validators.required,
      ]]
    });
  }

  /**
   *
   * @param form the user inputs
   */
  public login(form: FormGroup): void {
    console.log('Login successful.');
    console.log(form.value);
    this._user.email = this.form.get('email').value;
    this._user.password = this.form.get('password').value;
    this._userService.loginUser(this._user).subscribe(
      results => {
        this._loginInFailed = true;
        this._user = results;
        this._router.navigate(['home'],  {
          relativeTo: this._route
        });
        console.log(results);
      },
      error => {
        this._loginInFailed = false;
        console.log(error);
      }
    );
  }

}
