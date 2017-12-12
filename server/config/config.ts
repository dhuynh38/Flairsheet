/**
 * A class to store all of the constants within the server.
 */
export default class Config {

  private _mongoUrl = 'mongodb://flair.admin:flairadmin7@127.0.0.1:27017/flairsheet';

  /**
   * Getter for the mongoUrl
   * @returns string the url string itself
   */
  public get mongoUrl(): string {
    return this._mongoUrl;
  }

}
