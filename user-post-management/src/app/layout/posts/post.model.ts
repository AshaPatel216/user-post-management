export class Post {
  id: string;
  description: string;
  totalComment: number;
  isPostSelected?: boolean;
  comments: Comment[];
  media: Media[];
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
}
