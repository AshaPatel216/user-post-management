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

  constructor(private http: HttpClient) {
    this.endPointUrl = 'https://strapi-test.promactinfo.com';
    this.postTitleToShow = new Subject<string>();
  }

  /*
   * Get All Posts
   */
  getAllPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.endPointUrl}/posts`);
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

  getPostDetails(postId) {
    return this.http.get(`${this.endPointUrl}/posts`, postId);
  }


  addComment(comment) {
    return this.http.post(`${this.endPointUrl}/comments`, comment);
  }
}
