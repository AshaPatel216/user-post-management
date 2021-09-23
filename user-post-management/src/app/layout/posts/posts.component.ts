import { Component, OnInit, ViewChild } from '@angular/core';
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
    private sharedService: SharedService) {
    this.posts = [];
  }


  ngOnInit(): void {
    this.getAllPostsList();
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
      },
      err => { this.sharedService.errorResponse(); }
    )
  }


  showPostDetails(postId: string): void {
    console.log("Post Id" + postId);
    // change isSelected boolean
    this.posts.forEach(post => {
      post.id === postId ? post.isPostSelected = true : post.isPostSelected = false;
    })
  }
}
