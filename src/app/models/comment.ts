/**
 * Model representing a comment.
 */
export interface Comment {
  _id: string;
  content: string;
  author: string;
  comment: string;
  upvotes: number;
  downvotes: number;
}
