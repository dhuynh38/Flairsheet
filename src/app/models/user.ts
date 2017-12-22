/**
 * Model representing a user.
 */
export interface User {
  _id: string;
  firstname: string;
  lastname: string;
  username: string;
  usernameOriginal: string;
  email: string;
  password: string;
  birthday: Date;
  sex: string;
  verified: boolean;
}
