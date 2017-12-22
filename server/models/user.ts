import { Schema, model } from 'mongoose';

/**
 * Model representating what a User looks like in the
 * database.
 */
const userSchema = new Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    lowercase: true,
    unique: true
  },
  usernameOriginal: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  birthday: {
    type: Date,
    required: true
  },
  sex: {
    type: String,
    required: true
  },
  verified: {
    type: Boolean,
    default: false
  },
  myContents: [{
    type: Schema.Types.ObjectId,
    ref: 'Content'
  }],
  myComments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment'
  }],
  mySuggestions: [{
    type: Schema.Types.ObjectId,
    ref: 'Suggestion'
  }],
  myRequests: [{
    type: Schema.Types.ObjectId,
    ref: 'Request'
  }],
});

export default model('User', userSchema);
