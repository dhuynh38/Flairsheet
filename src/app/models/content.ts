import { Comment } from './comment';
import { Request } from './request';
import { Suggestion } from './suggestion';

/**
 * Model representing content.
 */
export interface Content {
  _id: string;
  title: string;
  description: string;
  author: string;
  contentType: string;
  major: string;
  minor: string;
  comments: Array<Comment>;
  suggestions: Array<Suggestion>;
  requests: Array<Request>;
  views: number;
  upvotes: number;
  downvotes: number;
  file: any;
}
