/**
 * Model representing a request.
 */
export interface Request {
  _id: string;
  content: string;
  author: string;
  request: string;
  upvotes: number;
  downvotes: number;
}
