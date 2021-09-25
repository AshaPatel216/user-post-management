import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../../shared/shared.service';
import { Post, Comment } from './post.model';
import { PostsService } from './posts.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html'
})
export class PostsComponent implements OnInit {

  posts: Post[];
  comments: Comment[];

  constructor(private postsService: PostsService,
    private sharedService: SharedService,
    private router: Router) {
    this.posts = [];
    this.sharedService.isLoaderLoading.next(true);
    this.getAllPostsList();
  }


  ngOnInit(): void {
    this.sharedService.headerLable.next('posts');
  }

  ngOnDestroy(): void {
    this.sharedService.headerLable.next('');
  }

  getAllPostsList(): void {
    this.postsService.getAllPosts().subscribe(
      res => {
        res.forEach((post, index) => {
          this.comments = [];
          if (post.comments.length > 0 || post.comments !== null) {
            post.comments.forEach(comment => {
              this.comments.push(
                {
                  'id': comment.id,
                  'commentText': comment.commentText,
                  'user': comment.user
                }
              );
            });
          }
          this.posts.push(
            {
              'id': post.id,
              'description': post.description,
              'comments': this.comments,
              'totalComment': this.comments.length,
              'isPostSelected': index === 0 ? true : false
            }
          );
        });
        this.posts.map(post => {
          if (post.isPostSelected) {
            this.router.navigate(['post', post.id]);
          }
        });
        this.sharedService.isLoaderLoading.next(false);
      },
      err => {
        this.sharedService.isLoaderLoading.next(false);
        this.sharedService.errorResponse();
      }
    )
  }


  showPostDetails(postId: string): void {
    // change isSelected boolean
    this.posts.forEach(post => {
      post.id === postId ? post.isPostSelected = true : post.isPostSelected = false;
    })
  }

  addNewPost(): void {
    this.sharedService.isLoaderLoading.next(true);
    this.posts.map(post => {
      if (post.isPostSelected) {
        post.isPostSelected = false;
      }
    });
    this.sharedService.isLoaderLoading.next(false);
    this.router.navigate(['/post/add']);
    window.location.reload;
  }
}
