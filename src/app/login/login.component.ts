import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router} from '@angular/router';

import { User } from '../models/user';

import { ConfigService } from '../services/config/config.service';
import { RedirectService } from '../services/redirect/redirect.service';
import { SessionService } from '../services/session/session.service';
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
  private _emailErrorMessage: string;
  private _passwordErrorMessage: string;
  private _loginErrorMessage: string;
  private _user: User;
  private _loginInFailed: boolean;

  /**
   * Contructs the component and injects all parameters.
   */
  public constructor(private _formBuilder: FormBuilder,
    private _router: Router,
    private _route: ActivatedRoute,
    private _configService: ConfigService,
    private _redirectService: RedirectService,
    private _sessionService: SessionService,
    private _userService: UserService) {
  }

  /**
   * Angular runs after creating the component.
   */
  public ngOnInit(): void {
    this._loginErrorMessage = this._configService.ERROR_LOGIN_FAILED;
    this.createForm();
    this._user = {
      _id: '',
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
   * @returns {FormGroup} the form to sign in with
   */
  public get form(): FormGroup {
    return this._form;
  }

  /**
   * Getter for _loginInFailed.
   * @returns {boolean} true if user failed to log in
   */
  public get loginInFailed(): boolean {
    return this._loginInFailed;
  }

  /**
   * Getter for loginErrorMessage.
   * @returns {string} error message when login failed
   */
  public get loginErrorMessage(): string {
    return this._loginErrorMessage;
  }

  /**
   * Getter for emailErrorMessage.
   * @returns {string} error message when email field is invalid
   */
  public get emailErrorMessage(): string {
    return this._emailErrorMessage;
  }

  /**
   * Getter for passwordErrorMessage.
   * @returns {string} error message when password field is invalid
   */
  public get passwordErrorMessage(): string {
    return this._passwordErrorMessage;
  }

  /**
   * Checks whether the Email input field has any
   * errors and if it does, set the error message accordingly.
   * @returns {boolean} true if Email field is valid
   */
  public isEmailValid(): boolean {
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
   * @returns {boolean} true if Password field is valid
   */
  public isPasswordValid(): boolean {
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
   * Logs the user into the app.
   * @param {FormGroup} form the user inputs
   */
  public login(form: FormGroup): void {
    this._user.email = this.form.get('email').value;
    this._user.password = this.form.get('password').value;
    this._userService.loginUser(this._user).subscribe((results) => {
      this._loginInFailed = true;
      this._sessionService.storeToken(results);
      if (this._redirectService.redirectUrl !== null) {
        this._router.navigate([this._redirectService.redirectUrl]);
        this._redirectService.redirectUrl = null;
      } else {
        this._router.navigate(['home']);
      }
    }, (error) => {
      this._loginInFailed = false;
      console.log(error);
    });
  }

}
