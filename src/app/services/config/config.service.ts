import { Injectable } from '@angular/core';

/**
 * Service to provide all of the constants.
 */
@Injectable()
export class ConfigService {

  private _ERROR_REQUIRED = 'Required';
  private _ERROR_MAX_LENGTH_20 = 'More than 20 characters';
  private _ERROR_MAX_LENGTH_40 = 'More than 40 characters';
  private _ERROR_PASS_MIN_LENGTH = 'Password less than 5 characters';
  private _ERROR_EMAIL_STRUCTURE = 'Invalid email';
  private _ERROR_PATTERN_A = 'Only a-z. \'-\' and \' \' in between';
  private _ERROR_PATTERN_B = 'Only a-z and 0-9';
  private _ERROR_DATE_FORMAT = 'Invalid Format. Use - or /';
  private _ERROR_DATE_RANGE = 'Out of allowed range or invalid';
  private _ERROR_LOGIN_FAILED = 'Invalid email or password';

  /**
   * Contructs the service and inject all parameters.
   */
  constructor() { }

  /**
   * Getter for ERROR_REQUIRED.
   * @returns String the string constant.
   */
  public get ERROR_REQUIRED(): String {
    return this._ERROR_REQUIRED;
  }

  /**
   * Getter for ERROR_MAX_LENGTH_20.
   * @returns String the string constant.
   */
  public get ERROR_MAX_LENGTH_20(): String {
    return this._ERROR_MAX_LENGTH_20;
  }

  /**
   * Getter for ERROR_MAX_LENGTH_40.
   * @returns String the string constant.
   */
  public get ERROR_MAX_LENGTH_40(): String {
    return this._ERROR_MAX_LENGTH_40;
  }

  /**
   * Getter for ERROR_PASS_MIN_LENGTH.
   * @returns String the string constant.
   */
  public get ERROR_PASS_MIN_LENGTH(): String {
    return this._ERROR_PASS_MIN_LENGTH;
  }

  /**
   * Getter for ERROR_EMAIL_STRUCTURE.
   * @returns String the string constant.
   */
  public get ERROR_EMAIL_STRUCTURE(): String {
    return this._ERROR_EMAIL_STRUCTURE;
  }

  /**
   * Getter for ERROR_PATTERN_A.
   * @returns String the string constant.
   */
  public get ERROR_PATTERN_A(): String {
    return this._ERROR_PATTERN_A;
  }

  /**
   * Getter for ERROR_PATTERN_B.
   * @returns String the string constant.
   */
  public get ERROR_PATTERN_B(): String {
    return this._ERROR_PATTERN_B;
  }

  /**
   * Getter for ERROR_DATE_FORMAT.
   * @returns String the string constant.
   */
  public get ERROR_DATE_FORMAT(): String {
    return this._ERROR_DATE_FORMAT;
  }

  /**
   * Getter for ERROR_DATE_RANGE.
   * @returns String the string constant.
   */
  public get ERROR_DATE_RANGE(): String {
    return this._ERROR_DATE_RANGE;
  }

  /**
   * Getter for ERROR_LOGIN_FAILED.
   * @returns String the string constant.
   */
  public get ERROR_LOGIN_FAILED(): String {
    return this._ERROR_LOGIN_FAILED;
  }

}
