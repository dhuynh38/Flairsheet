import { Schema, model } from 'mongoose';

/**
 * Model representating what a Request looks like in the
 * database.
 */
const requestSchema = new Schema({
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
  request: {
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

export default model('Request', requestSchema);
