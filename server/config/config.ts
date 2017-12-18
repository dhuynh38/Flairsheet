/**
 * A class to store all of the constants within the server.
 */
export default class Config {

  private _mongoUrlProd = 'mongodb://flair.admin:flairadmin7@127.0.0.1:27017/flairsheet';
  private _mongoUrlDev = 'mongodb://127.0.0.1:27017/flairsheet';
  private _mongoUrlLab = 'mongodb://flairadmin:123456789@ds161146.mlab.com:61146/flairsheet';
  private _tokenExpirationTime = '30 days';

  /**
   * Getter for the mongoUrlProd. It returns the url for the
   * production environment.
   * @returns string the url string itself
   */
  public get mongoUrlProd(): string {
    return this._mongoUrlProd;
  }

  /**
   * Getter for the mongoUrlDev. It returns the url for the
   * development environment.
   * @returns string the url string itself
   */
  public get mongoUrlDev(): string {
    return this._mongoUrlDev;
  }

  /**
   * Getter for the mongoUrlLab. It returns the url for the
   * lab environment.
   * @returns string the url string itself
   */
  public get mongoUrlLab(): string {
    return this._mongoUrlLab;
  }

  /**
   * Getter for the tokenExpirationTime.
   * @returns string the time before a token will expire
   */
  public get tokenExpirationTime(): string {
    return this._tokenExpirationTime;
  }

}
