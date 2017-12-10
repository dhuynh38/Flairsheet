import { Schema, model } from 'mongoose';

/**
 * Model representating what a User looks like in the
 * database.
 */
export default model('User', new Schema({
  firstname: {
    type: String,
    default: '',
    required: true,
  },
  lastname: {
    type: String,
    default: '',
    required: true
  },
  username: {
    type: String,
    default: '',
    required: true,
    lowercase: true,
    unique: true
  },
  usernameOriginal: {
    type: String,
    default: '',
    required: true
  },
  email: {
    type: String,
    default: '',
    required: true,
    lowercase: true,
    unique: true
  },
  password: {
    type: String,
    default: null,
    required: true
  },
  birthday: {
    type: Date,
    default: Date.now,
    required: true
  },
  sex: {
    type: String,
    default: '',
    required: true
  },
  verified: {
    type: Boolean,
    default: false,
    required: true
  }
}));
