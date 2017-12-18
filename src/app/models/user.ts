/**
 * Model representing a user.
 */
export interface User {
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
