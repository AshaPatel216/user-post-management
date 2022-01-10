import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from '../../../shared/shared.service';
import { Comment, Post } from '../post.model';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html'
})
export class PostDetailsComponent implements OnInit {

  postId: string;
  post: Post;
  postTitleToShow: string;
  postImages: Array<Object>;
  postComments: Comment[];

  constructor(private route: ActivatedRoute,
    private postService: PostsService,
    private sharedService: SharedService) {

    this.sharedService.isLoaderLoading.next(true);
    this.postTitleToShow = 'Post 1';
    this.postId = '';
    this.postComments = [];
    this.post = new Post();

    this.route.params.subscribe(params => {
      this.postId = params['postId'];
      this.getPostDetails();
    });

    this.postService.postTitleToShow.subscribe(res => {
      if (res) {
        this.postTitleToShow = res;
      }
    });

    this.postImages = [];

  }

  ngOnInit(): void {  
    this.sharedService.isLoaderLoading.next(true);
  }
 
  /**
   * Get post details
   */
  getPostDetails(): void {
    this.sharedService.isLoaderLoading.next(true);
    this.postService.getPostDetails(this.postId).subscribe(res => {
      // ArrayBuffer to JSON
      const response: Post[] = JSON.parse(JSON.stringify(res));
      console.log("Details: " + response.length)

      response.forEach(post => { 
        if (this.postId == post.id) {
          this.post = post;
        }
      })

      // empty postImages of old post and push new post images as per the selected post.
      this.postImages = [];

      this.post.media.forEach(image => {
        this.postImages.push({
          image: `https://strapi-test.promactinfo.com/${image.url}`,
          thumbImage: `https://strapi-test.promactinfo.com/${image.url}`,
        });
      });
      this.sharedService.isLoaderLoading.next(false);
    },
      err => {
        this.sharedService.errorResponse();
        this.sharedService.isLoaderLoading.next(false);
      });
  }
}
