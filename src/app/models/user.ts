/**
 * Model representing a user.
 */
export interface User {
  firstname: String;
  lastname: String;
  username: String;
  usernameOriginal: String;
  email: String;
  password: String;
  birthday: Date;
  sex: String;
  verified: boolean;
}
