import { Schema, model } from 'mongoose';

import Comment from './comment';
import Request from './request';
import Suggestion from './suggestion';

/**
 * Model representating what a User looks like in the
 * database.
 */
const contentSchema = new Schema({
  title: {
    type: String,
    required: true,
    lowercase: true
  },
  titleOriginal: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  contentType: {
    type: String,
    required: true,
  },
  major: {
    type: String,
    required: true,
    lowercase: true,
  },
  minor: {
    type: String,
    required: true,
    lowercase: true
  },
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment'
  }],
  suggestions: [{
    type: Schema.Types.ObjectId,
    ref: 'Suggestion'
  }],
  requests: [{
    type: Schema.Types.ObjectId,
    ref: 'Request'
  }],
  views: {
    type: Number,
    default: 0,
    min: 0
  },
  upvotes: {
    type: Number,
    default: 0,
    min: 0
  },
  downvotes: {
    type: Number,
    default: 0,
    min: 0
  },
  file: {
    type: Schema.Types.ObjectId,
    required: true
  },
});

contentSchema.index({ title: 1, author: 1 }, { unique: true });

export default model('Content', contentSchema);
