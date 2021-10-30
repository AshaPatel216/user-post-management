import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from './post.model';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  endPointUrl: string;

  constructor(private http: HttpClient) {
    this.endPointUrl = 'https://strapi-test.promactinfo.com';
  }

  /*
   * Get All Posts
   */
  getAllPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.endPointUrl}/posts`);
  }

  uploadImage(formData) {
    return this.http.post(`${this.endPointUrl}/upload`, formData);
  }

  createPost(post) {
    return this.http.post(`${this.endPointUrl}/posts`, post)
  }
}
