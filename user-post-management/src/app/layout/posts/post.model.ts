import { User } from '../users/user.model';

export class Post {
  id: string;
  description: string;
  totalComment: number;
  isPostSelected?: boolean;
  comments: Comment[];
  media: Media[];
  user?: User;
}

export class AddPost {
  id: string;
  description: string;
  totalComment: number;
  isPostSelected?: boolean;
  comments: Comment[];
  media: Media[];
  user?: string;
}

export class Media {
  id: string;
  name: string;
  alternativeText?: string;
  caption?: string;
  width?: 0;
  height?: 0;
  formats?: {};
  hash?: string;
  ext?: string;
  mime?: string;
  size?: 0;
  url: string;
}

export class Comment {
  id: string;
  commentText: string;
  user: string
  userName?: string;
  post?: string;
}
