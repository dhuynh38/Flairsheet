import { AbstractControl, ValidatorFn } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

import * as moment from 'moment';

import { User } from '../models/user';

import { ConfigService } from '../services/config/config.service';
import { RedirectService } from '../services/redirect/redirect.service';
import { SessionService } from '../services/session/session.service';
import { UserService } from '../services/user/user.service';

/**
 * Component that handles registering a new user.
 */
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  private _form: FormGroup;
  private _startDate: moment.Moment;
  private _sexes: Array<Object>;
  private _firstNameErrorMessage: string;
  private _lastNameErrorMessage: string;
  private _usernameErrorMessage: string;
  private _emailErrorMessage: string;
  private _passwordErrorMessage: string;
  private _birthdayErrorMessage: string;
  private _sexErrorMessage: string;
  private _minDate: moment.Moment;
  private _maxDate: moment.Moment;

  private user: User;

  /**
   * Contructs the component and injects all parameters.
   */
  public constructor(private _adapter: DateAdapter<any>,
    private _formBuilder: FormBuilder,
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
    this.createForm();
    this._startDate = moment('1990-01-01');
    this._sexes = [
      {value: 'male', viewValue: 'Male'},
      {value: 'female', viewValue: 'Female'},
    ];
    this._adapter.setLocale(navigator.language || 'en-US');
    this._maxDate = moment().subtract(13, 'years');
    this._minDate = moment().subtract(120, 'years');
    this.user = {
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
  }

  /**
   * Getter for form.
   * @returns {FormGroup} the form the user is filling out
   */
  public get form(): FormGroup {
    return this._form;
  }

  /**
   * Getter for startDate.
   * @returns {moment.Moment} the start date for the calendar
   */
  public get startDate(): moment.Moment {
    return this._startDate;
  }

  /**
   * Getter for sexes.
   * @returns {Array<Object>} the array containing all slectable sexes
   */
  public get sexes(): Array<Object> {
    return this._sexes;
  }

  /**
   * Getter for firstNameErrorMessage.
   * @returns {string} the error message for first name field.
   */
  public get firstNameErrorMessage(): string {
    return this._firstNameErrorMessage;
  }

  /**
   * Getter for lastNameErrorMessage.
   * @returns {string} the error message for last name field.
   */
  public get lastNameErrorMessage(): string {
    return this._lastNameErrorMessage;
  }

  /**
   * Getter for usernameErrorMessage.
   * @returns {string} the error message for username field.
   */
  public get usernameErrorMessage(): string {
    return this._usernameErrorMessage;
  }

  /**
   * Getter for emailErrorMessage.
   * @returns {string} the error message for email field.
   */
  public get emailErrorMessage(): string {
    return this._emailErrorMessage;
  }

  /**
   * Getter for passwordErrorMessage.
   * @returns {string} the error message for password field.
   */
  public get passwordErrorMessage(): string {
    return this._passwordErrorMessage;
  }

  /**
   * Getter for birthdayErrorMessage.
   * @returns {string} the error message for birthday field.
   */
  public get birthdayErrorMessage(): string {
    return this._birthdayErrorMessage;
  }

  /**
   * Getter for sexErrorMessage.
   * @returns {string} the error message for sex field.
   */
  public get sexErrorMessage(): string {
    return this._sexErrorMessage;
  }

  /**
   * Getter for minDate.
   * @returns {moment.Moment} the min date for the calendar
   */
  public get minDate(): moment.Moment {
    return this._minDate;
  }

  /**
   * Getter for maxDate.
   * @returns {moment.Moment} the max date for the calendar
   */
  public get maxDate(): moment.Moment {
    return this._maxDate;
  }

  /**
   * Creates the form by using FormBuilder to initialize
   * FormGroup.
   */
  private createForm(): void {
    this._form = this._formBuilder.group({
      firstname: ['', [
        Validators.required,
        Validators.maxLength(20),
        Validators.pattern('^[a-zA-Z]+(( |-)[a-zA-Z]+)*$')
      ]],
      lastname: ['', [
        Validators.required,
        Validators.maxLength(20),
        Validators.pattern('^[a-zA-Z]+(( |-)[a-zA-Z]+)*$')
      ]],
      username: ['', [
        Validators.required,
        Validators.maxLength(20),
        Validators.pattern('[a-zA-Z0-9]*')
      ]],
      email: ['', [
        Validators.required,
        Validators.maxLength(50),
        Validators.email
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(5),
      ]],
      birthday: ['', [
        Validators.required,
        this.dateFormatValidator(),
        this.dateRangeValidator()
      ]],
      sex: ['', [
        Validators.required
      ]],
    });
  }

  /**
   * Checks whether the First Name input field has any
   * errors and if it does, set the error message accordingly.
   * @returns {boolean} true if First Name field is valid
   */
  public isFirstNameValid(): boolean {
    const firstnameField = this._form.controls['firstname'];
    let validity = false;

    if (firstnameField.hasError('required')) {
      this._firstNameErrorMessage = this._configService.ERROR_REQUIRED;
    } else if (firstnameField.hasError('maxlength')) {
      this._firstNameErrorMessage = this._configService.ERROR_MAX_LENGTH_20;
    } else if (firstnameField.hasError('pattern')) {
      this._firstNameErrorMessage = this._configService.ERROR_PATTERN_A;
    } else {
      validity = true;
    }

    return validity;
  }

  /**
   * Checks whether the Last Name input field has any
   * errors and if it does, set the error message accordingly.
   * @returns {boolean} true if Last Name field is valid
   */
  public isLastNameValid(): boolean {
    const lastnameField = this._form.controls['lastname'];
    let validity = false;

    if (lastnameField.hasError('required')) {
      this._lastNameErrorMessage = this._configService.ERROR_REQUIRED;
    } else if (lastnameField.hasError('maxlength')) {
      this._lastNameErrorMessage = this._configService.ERROR_MAX_LENGTH_20;
    } else if (lastnameField.hasError('pattern')) {
      this._lastNameErrorMessage = this._configService.ERROR_PATTERN_A;
    } else {
      validity = true;
    }

    return validity;
  }

  /**
   * Checks whether the Username input field has any
   * errors and if it does, set the error message accordingly.
   * @returns {boolean} true if Username field is valid
   */
  public isUsernameValid(): boolean {
    const usernameField = this._form.controls['username'];
    let validity = false;

    if (usernameField.hasError('required')) {
      this._usernameErrorMessage = this._configService.ERROR_REQUIRED;
    } else if (usernameField.hasError('maxlength')) {
      this._usernameErrorMessage = this._configService.ERROR_MAX_LENGTH_20;
    } else if (usernameField.hasError('pattern')) {
      this._usernameErrorMessage = this._configService.ERROR_PATTERN_B;
    } else {
      validity = true;
    }

    return validity;
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
    } else if (emailField.hasError('maxlength')) {
      this._emailErrorMessage = this._configService.ERROR_MAX_LENGTH_40;
    } else if (emailField.hasError('email')) {
      this._emailErrorMessage = this._configService.ERROR_EMAIL_STRUCTURE;
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
    const passwordField = this._form.controls['password'];
    let validity = false;

    if (passwordField.hasError('required')) {
      this._passwordErrorMessage = this._configService.ERROR_REQUIRED;
    } else if (passwordField.hasError('minlength')) {
      this._passwordErrorMessage = this._configService.ERROR_PASS_MIN_LENGTH;
    } else {
      validity = true;
    }

    return validity;
  }

  /**
   * Checks whether the Date of Birth input field has any
   * errors and if it does, set the error message accordingly.
   * @returns {boolean} true if Date of Birth field is valid
   */
  public isBirthdayValid(): boolean {
    const birthdayField = this._form.controls['birthday'];
    let validity = false;

    if (birthdayField.hasError('required')) {
      this._birthdayErrorMessage = this._configService.ERROR_REQUIRED;
    } else if (birthdayField.hasError('dateformat')) {
      this._birthdayErrorMessage = this._configService.ERROR_DATE_FORMAT;
    } else if (birthdayField.hasError('daterange')) {
      this._birthdayErrorMessage = this._configService.ERROR_DATE_RANGE;
    } else {
      validity = true;
    }

    return validity;
  }

  /**
   * Checks whether the Sex input field has any
   * errors and if it does, set the error message accordingly.
   * @returns {boolean} true if Sex field is valid
   */
  public isSexValid(): boolean {
    const sexField = this._form.controls['sex'];
    let validity = false;

    if (sexField.hasError('required')) {
      this._sexErrorMessage = this._configService.ERROR_REQUIRED;
    } else {
      validity = true;
    }

    return validity;
  }

  /**
   * Returns a validator to checks whether the Date is
   * in a valid format.
   * @returns {ValidatorFn} a validator function to validate the date format
   */
  private dateFormatValidator(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {
      let validDateFormat = false;
      if (control.value) {
        const localeDateFormat = moment.localeData().longDateFormat('l');
        const longDateFormats = [
          localeDateFormat,
          localeDateFormat.replace('YYYY', 'YY'),
          localeDateFormat.split('/').join('-'),
          localeDateFormat.replace('YYYY', 'YY').split('/').join('-')
        ];

        validDateFormat = moment(control.value._i, longDateFormats, true).isValid()
          || (control.value._i.year && control.value._i.month && control.value._i.date) ;
      }
      return !validDateFormat ? {'dateformat': {value: control.value}} : null;
    };
  }

  /**
   * Returns a validator to check whether the Date is
   * within the valid dates.
   * @returns {ValidatorFn} a validator function to validate the date range
   */
  private dateRangeValidator(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {
      let withinRange = false;
      this._maxDate = moment().subtract(13, 'years');
      this._minDate = moment().subtract(120, 'years');

      if (control.value) {
        withinRange = control.value.isBetween(this._minDate, this._maxDate);
      }
      return !withinRange ? {'daterange': {value: control.value}} : null;
    };
  }


  /**
   * Registers a user in the database based on the values of
   * the inputs.
   * @param {FormGroup} form the form coming from the user
   */
  public register(form: FormGroup): void {
    this.user.firstname = this._form.get('firstname').value;
    this.user.lastname = this._form.get('lastname').value;
    this.user.usernameOriginal = this._form.get('username').value;
    this.user.username = this.user.usernameOriginal.toLowerCase();
    this.user.email = this._form.get('email').value;
    this.user.password = this._form.get('password').value;
    this.user.birthday = this._form.get('birthday').value.toDate();
    this.user.sex = this._form.get('sex').value;
    this.user.verified = false;
    this._userService.createUser(this.user).subscribe((results) => {
      this._sessionService.storeToken(results);
      if (this._redirectService.redirectUrl !== null) {
        this._router.navigate([this._redirectService.redirectUrl]);
        this._redirectService.redirectUrl = null;
      } else {
        this._router.navigate(['home']);
      }
      console.log(results);
    }, (error) => {
      console.log(error);
    });
  }


}
