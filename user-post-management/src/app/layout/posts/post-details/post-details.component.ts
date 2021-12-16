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

  constructor(private router: Router,
    private route: ActivatedRoute,
    private postService: PostsService,
    private sharedService: SharedService) {

    this.postId = '';
    this.post = new Post();
    this.route.params.subscribe(params => {
      this.postId = params['postId'];
      this.getPostDetails();
    });
    
  }

  ngOnInit(): void {
    this.sharedService.isLoaderLoading.next(true);
  }

  getPostDetails(): void {
    this.postService.getPostDetails(this.postId).subscribe(res => {
      const response: Post[] = JSON.parse(JSON.stringify(res));
      response.forEach(post => {

        if (this.postId == post.id) {
          this.post = post;
        }
      })

      console.log(this.post)

      this.sharedService.isLoaderLoading.next(false);
    },
      err => {
        this.sharedService.errorResponse();
        this.sharedService.isLoaderLoading.next(false);
      });
  }
}
