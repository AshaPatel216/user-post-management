import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { SharedService } from '../../../shared/shared.service';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html'
})
export class PostDetailsComponent implements OnInit {

  postId: string;
  post: Post;
  postTitleToShow: string;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private postService: PostsService,
    private sharedService: SharedService) {

    this.postTitleToShow = 'Post 1';
    this.postId = '';
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

  }

  ngOnInit(): void {
    this.sharedService.isLoaderLoading.next(true);
  }

  /**
   * Get post details
   */
  getPostDetails(): void {
    this.postService.getPostDetails(this.postId).subscribe(res => {
      const response: Post[] = JSON.parse(JSON.stringify(res));
      response.forEach(post => {

        if (this.postId == post.id) {
          this.post = post;
        }
      })

      this.sharedService.isLoaderLoading.next(false);
    },
      err => {
        this.sharedService.errorResponse();
        this.sharedService.isLoaderLoading.next(false);
      });
  }
}
