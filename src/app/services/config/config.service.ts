import { Injectable } from '@angular/core';

/**
 * Service to provide all of the constants.
 */
@Injectable()
export class ConfigService {

  private _ERROR_REQUIRED = 'Required';
  private _ERROR_MAX_LENGTH_20 = 'More than 20 characters';
  private _ERROR_MAX_LENGTH_40 = 'More than 40 characters';
  private _ERROR_MAX_LENGTH_50 = 'More than 50 characters';
  private _ERROR_MAX_LENGTH_250 = 'More than 250 characters';
  private _ERROR_PASS_MIN_LENGTH = 'Password less than 5 characters';
  private _ERROR_EMAIL_STRUCTURE = 'Invalid email';
  private _ERROR_PATTERN_A = 'Only a-z. \'-\' and \' \' in between';
  private _ERROR_PATTERN_B = 'Only a-z and 0-9';
  private _ERROR_DATE_FORMAT = 'Invalid Format. Use - or /';
  private _ERROR_DATE_RANGE = 'Out of allowed range or invalid';
  private _ERROR_LOGIN_FAILED = 'Invalid email or password';
  private _ERROR_INVALID_MIME_TYPE = 'Invalid or unsupported file type';

  /**
   * Contructs the service and injects all parameters.
   */
  constructor() { }

  /**
   * Getter for ERROR_REQUIRED.
   * @returns {string} the string constant.
   */
  public get ERROR_REQUIRED(): string {
    return this._ERROR_REQUIRED;
  }

  /**
   * Getter for ERROR_MAX_LENGTH_20.
   * @returns {string} the string constant.
   */
  public get ERROR_MAX_LENGTH_20(): string {
    return this._ERROR_MAX_LENGTH_20;
  }

  /**
   * Getter for ERROR_MAX_LENGTH_40.
   * @returns {string} the string constant.
   */
  public get ERROR_MAX_LENGTH_40(): string {
    return this._ERROR_MAX_LENGTH_40;
  }

  /**
   * Getter for ERROR_MAX_LENGTH_50.
   * @returns {string} the string constant.
   */
  public get ERROR_MAX_LENGTH_50(): string {
    return this._ERROR_MAX_LENGTH_50;
  }

  /**
   * Getter for ERROR_MAX_LENGTH_50.
   * @returns {string} the string constant.
   */
  public get ERROR_MAX_LENGTH_250(): string {
    return this._ERROR_MAX_LENGTH_250;
  }

  /**
   * Getter for ERROR_PASS_MIN_LENGTH.
   * @returns {string} the string constant.
   */
  public get ERROR_PASS_MIN_LENGTH(): string {
    return this._ERROR_PASS_MIN_LENGTH;
  }

  /**
   * Getter for ERROR_EMAIL_STRUCTURE.
   * @returns {string} the string constant.
   */
  public get ERROR_EMAIL_STRUCTURE(): string {
    return this._ERROR_EMAIL_STRUCTURE;
  }

  /**
   * Getter for ERROR_PATTERN_A.
   * @returns {string} the string constant.
   */
  public get ERROR_PATTERN_A(): string {
    return this._ERROR_PATTERN_A;
  }

  /**
   * Getter for ERROR_PATTERN_B.
   * @returns {string} the string constant.
   */
  public get ERROR_PATTERN_B(): string {
    return this._ERROR_PATTERN_B;
  }

  /**
   * Getter for ERROR_DATE_FORMAT.
   * @returns {string} the string constant.
   */
  public get ERROR_DATE_FORMAT(): string {
    return this._ERROR_DATE_FORMAT;
  }

  /**
   * Getter for ERROR_DATE_RANGE.
   * @returns {string} the string constant.
   */
  public get ERROR_DATE_RANGE(): string {
    return this._ERROR_DATE_RANGE;
  }

  /**
   * Getter for ERROR_LOGIN_FAILED.
   * @returns {string} the string constant.
   */
  public get ERROR_LOGIN_FAILED(): string {
    return this._ERROR_LOGIN_FAILED;
  }

  /**
   * Getter for ERROR_INVALID_MIME_TYPE.
   * @returns {string} the string constant.
   */
  public get ERROR_INVALID_MIME_TYPE(): string {
    return this._ERROR_INVALID_MIME_TYPE;
  }

}
