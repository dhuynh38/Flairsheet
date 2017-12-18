import { AbstractControl, ValidatorFn } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

import * as moment from 'moment';

import { User } from '../models/user';

import { ConfigService } from '../services/config/config.service';
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

  form: FormGroup;
  startDate: any;
  sexes: Array<Object>;
  firstNameErrorMessage: string;
  lastNameErrorMessage: string;
  usernameErrorMessage: string;
  emailErrorMessage: string;
  passwordErrorMessage: string;
  birthdayErrorMessage: string;
  sexErrorMessage: string;
  minDate: any;
  maxDate: any;

  private user: User;

  /**
   * Contructs the component and injects all parameters.
   */
  public constructor(private adapter: DateAdapter<any>,
    private formBuilder: FormBuilder,
    private _router: Router,
    private _route: ActivatedRoute,
    private configService: ConfigService,
    private _sessionService: SessionService,
    private userService: UserService) {
  }

  /**
   * Angular runs after creating the component.
   */
  public ngOnInit(): void {
    this.createForm();
    this.startDate = moment('1990-01-01');
    this.sexes = [
      {value: 'male', viewValue: 'Male'},
      {value: 'female', viewValue: 'Female'},
    ];
    this.adapter.setLocale(navigator.language || 'en-US');
    this.maxDate = moment().subtract(13, 'years');
    this.minDate = moment().subtract(120, 'years');
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
   * Creates the form by using FormBuilder to initialize
   * FormGroup.
   */
  private createForm(): void {
    this.form = this.formBuilder.group({
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
   * @returns Boolean true if First Name field is valid
   */
  public isFirstNameValid(): Boolean {
    const firstnameField = this.form.controls['firstname'];
    let validity = false;

    if (firstnameField.hasError('required')) {
      this.firstNameErrorMessage = this.configService.ERROR_REQUIRED;
    } else if (firstnameField.hasError('maxlength')) {
      this.firstNameErrorMessage = this.configService.ERROR_MAX_LENGTH_20;
    } else if (firstnameField.hasError('pattern')) {
      this.firstNameErrorMessage = this.configService.ERROR_PATTERN_A;
    } else {
      validity = true;
    }

    return validity;
  }

  /**
   * Checks whether the Last Name input field has any
   * errors and if it does, set the error message accordingly.
   * @returns Boolean true if Last Name field is valid
   */
  public isLastNameValid(): Boolean {
    const lastnameField = this.form.controls['lastname'];
    let validity = false;

    if (lastnameField.hasError('required')) {
      this.lastNameErrorMessage = this.configService.ERROR_REQUIRED;
    } else if (lastnameField.hasError('maxlength')) {
      this.lastNameErrorMessage = this.configService.ERROR_MAX_LENGTH_20;
    } else if (lastnameField.hasError('pattern')) {
      this.lastNameErrorMessage = this.configService.ERROR_PATTERN_A;
    } else {
      validity = true;
    }

    return validity;
  }

  /**
   * Checks whether the Username input field has any
   * errors and if it does, set the error message accordingly.
   * @returns Boolean true if Username field is valid
   */
  public isUsernameValid(): Boolean {
    const usernameField = this.form.controls['username'];
    let validity = false;

    if (usernameField.hasError('required')) {
      this.usernameErrorMessage = this.configService.ERROR_REQUIRED;
    } else if (usernameField.hasError('maxlength')) {
      this.usernameErrorMessage = this.configService.ERROR_MAX_LENGTH_20;
    } else if (usernameField.hasError('pattern')) {
      this.usernameErrorMessage = this.configService.ERROR_PATTERN_B;
    } else {
      validity = true;
    }

    return validity;
  }

  /**
   * Checks whether the Email input field has any
   * errors and if it does, set the error message accordingly.
   * @returns Boolean true if Email field is valid
   */
  public isEmailValid(): Boolean {
    const emailField = this.form.controls['email'];
    let validity = false;

    if (emailField.hasError('required')) {
      this.emailErrorMessage = this.configService.ERROR_REQUIRED;
    } else if (emailField.hasError('maxlength')) {
      this.emailErrorMessage = this.configService.ERROR_MAX_LENGTH_40;
    } else if (emailField.hasError('email')) {
      this.emailErrorMessage = this.configService.ERROR_EMAIL_STRUCTURE;
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
      this.passwordErrorMessage = this.configService.ERROR_REQUIRED;
    } else if (passwordField.hasError('minlength')) {
      this.passwordErrorMessage = this.configService.ERROR_PASS_MIN_LENGTH;
    } else {
      validity = true;
    }

    return validity;
  }

  /**
   * Checks whether the Date of Birth input field has any
   * errors and if it does, set the error message accordingly.
   * @returns Boolean true if Date of Birth field is valid
   */
  public isBirthdayValid(): Boolean {
    const birthdayField = this.form.controls['birthday'];
    let validity = false;

    if (birthdayField.hasError('required')) {
      this.birthdayErrorMessage = this.configService.ERROR_REQUIRED;
    } else if (birthdayField.hasError('dateformat')) {
      this.birthdayErrorMessage = this.configService.ERROR_DATE_FORMAT;
    } else if (birthdayField.hasError('daterange')) {
      this.birthdayErrorMessage = this.configService.ERROR_DATE_RANGE;
    } else {
      validity = true;
    }

    return validity;
  }

  /**
   * Checks whether the Sex input field has any
   * errors and if it does, set the error message accordingly.
   * @returns Boolean true if Sex field is valid
   */
  public isSexValid(): Boolean {
    const sexField = this.form.controls['sex'];
    let validity = false;

    if (sexField.hasError('required')) {
      this.sexErrorMessage = this.configService.ERROR_REQUIRED;
    } else {
      validity = true;
    }

    return validity;
  }

  /**
   * Returns a validator to checks whether the Date is
   * in a valid format.
   * @returns ValidatorFn a validator function to validate the date format
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
   * @returns ValidatorFn a validator function to validate the date range
   */
  private dateRangeValidator(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {
      let withinRange = false;
      this.maxDate = moment().subtract(13, 'years');
      this.minDate = moment().subtract(120, 'years');

      if (control.value) {
        withinRange = control.value.isBetween(this.minDate, this.maxDate);
      }
      return !withinRange ? {'daterange': {value: control.value}} : null;
    };
  }


  /**
   * Registers a user in the database based on the values of
   * the inputs.
   */
  public register(form: FormGroup): void {
    this.user.firstname = this.form.get('firstname').value;
    this.user.lastname = this.form.get('lastname').value;
    this.user.usernameOriginal = this.form.get('username').value;
    this.user.username = this.user.usernameOriginal.toLowerCase();
    this.user.email = this.form.get('email').value;
    this.user.password = this.form.get('password').value;
    this.user.birthday = this.form.get('birthday').value.toDate();
    this.user.sex = this.form.get('sex').value;
    this.user.verified = false;
    console.log('Registration successful.');
    console.log(this.user);
    this.userService.createUser(this.user).subscribe((results) => {
      this._sessionService.storeToken(results);
      this._router.navigate(['home'],  {
        relativeTo: this._route,
        replaceUrl: true
      });
      console.log(results);
    }, (error) => {
      console.log(error);
    });
  }


}
