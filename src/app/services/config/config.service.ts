import { Injectable } from '@angular/core';

@Injectable()
export class ConfigService {

  private _ERROR_REQUIRED = 'Required';
  private _ERROR_MAX_LENGTH_20 = 'More than 20 characters';
  private _ERROR_MAX_LENGTH_30 = 'More than 30 characters';
  private _ERROR_MAX_LENGTH_40 = 'More than 40 characters';
  private _ERROR_PASS_MIN_LENGTH = 'Password less than 5 characters';
  private _ERROR_EMAIL_STRUCTURE = 'Invalid email';
  private _ERROR_PATTERN_A = 'Only a-z. \'-\' and \' \' in between';
  private _ERROR_PATTERN_B = 'Only a-z and 0-9';
  private _ERROR_DATE_FORMAT = 'Invalid Format. Use - or /';
  private _ERROR_DATE_RANGE = 'Out of allowed range or invalid';

  constructor() { }

  public get ERROR_REQUIRED(): String {
    return this._ERROR_REQUIRED;
  }

  public get ERROR_MAX_LENGTH_20(): String {
    return this._ERROR_MAX_LENGTH_20;
  }

  public get ERROR_MAX_LENGTH_30(): String {
    return this._ERROR_MAX_LENGTH_30;
  }

  public get ERROR_MAX_LENGTH_40(): String {
    return this._ERROR_MAX_LENGTH_40;
  }

  public get ERROR_PASS_MIN_LENGTH(): String {
    return this._ERROR_PASS_MIN_LENGTH;
  }

  public get ERROR_EMAIL_STRUCTURE(): String {
    return this._ERROR_EMAIL_STRUCTURE;
  }

  public get ERROR_PATTERN_A(): String {
    return this._ERROR_PATTERN_A;
  }

  public get ERROR_PATTERN_B(): String {
    return this._ERROR_PATTERN_B;
  }

  public get ERROR_DATE_FORMAT(): String {
    return this._ERROR_DATE_FORMAT;
  }

  public get ERROR_DATE_RANGE(): String {
    return this._ERROR_DATE_RANGE;
  }

}
