import { Comment, Post } from '../posts/post.model';

export class User {
  id?: string;
  username: string;
  email: string;
  provider?: string;
  password: string;
  confirmed?: boolean;
  blocked?: boolean;
  posts: Post[];
  comments?: Comment[];
  created_by?: string;
  updated_by?: string

  constructor() {
    this.confirmed = false;
    this.blocked = false;
  }
}
