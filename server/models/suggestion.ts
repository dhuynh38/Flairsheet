import { Schema, model } from 'mongoose';

/**
 * Model representating what a Suggestion looks like in the
 * database.
 */
const suggestionSchema = new Schema({
  content: {
    type: Schema.Types.ObjectId,
    ref: 'Content',
    required: true
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  suggestion: {
    type: String,
    required: true
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
});

export default model('Suggestion', suggestionSchema);
