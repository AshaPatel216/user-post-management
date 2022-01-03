import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Post } from './post.model';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  endPointUrl: string;
  postTitleToShow: Subject<string>;
  posts: Subject<Post[]>;

  constructor(private http: HttpClient) {
    this.endPointUrl = 'https://strapi-test.promactinfo.com';
    this.postTitleToShow = new Subject<string>();
    this.posts = new Subject<Post[]>();
  }

  /*
   * Get All Posts
   */
  getAllPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.endPointUrl}/posts?_limit=-1`);
  }

  /**
   * Upload post image
   * @param formData file data to upload
   */
  uploadImage(formData) {
    return this.http.post(`${this.endPointUrl}/upload`, formData);
  }

  /**
   * Create Post
   * @param post Post object
   */
  createPost(post) {
    return this.http.post(`${this.endPointUrl}/posts`, post)
  }

  /**
   * Get post details for specific post
   * @param postId If of the Post
   */
  getPostDetails(postId) {
    return this.http.get(`${this.endPointUrl}/posts?_limit=-1`, postId);
  }

  /**
   * Add comment
   * @param comment Object of the comment
   */
  addComment(comment) {
    return this.http.post(`${this.endPointUrl}/comments`, comment);
  }

  /**
   * edit the comment
   * @param commentId Id of the comment to be edited
   */
  editComment(commentId, updatedComment) {
    return this.http.put(`${this.endPointUrl}/comments/${commentId}`, updatedComment);
  }

  /**
   * delete the comment
   * @param commentId Id of the comment to be deleted
   */
  deleteComment(commentId) {
    return this.http.delete(`${this.endPointUrl}/comments/${commentId}`);
  }
}
