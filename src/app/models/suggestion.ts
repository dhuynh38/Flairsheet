/**
 * Model representing a suggestion.
 */
export interface Suggestion {
  _id: string;
  content: string;
  author: string;
  suggestion: string;
  upvotes: number;
  downvotes: number;
}
