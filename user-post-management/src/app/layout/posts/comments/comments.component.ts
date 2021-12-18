import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TokenStorageService } from '../../../core/token-storage.service';
import { SharedService } from '../../../shared/shared.service';
import { UsersService } from '../../users/users.service';
import { Comment, Post } from '../post.model';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html'
})
export class CommentsComponent implements OnInit {

  @Input() postComments: Comment[];

  postId: string;

  postCommentList: Comment[];
  totalCommentsCount: number;
  newComment: Comment;

  constructor(private userService: UsersService,
    private sharedService: SharedService,
    private tokenStorageService: TokenStorageService,
    private postService: PostsService,
    private route: ActivatedRoute) {
    this.totalCommentsCount = 0;
    this.sharedService.isLoaderLoading.next(true);
    this.newComment = new Comment();

    this.route.params.subscribe(params => {
      console.log(params['postId'])
      this.postId = params['postId'];
    });

    console.log(this.postId);
  }

  /**
   * Call on data change
   * @param changes detect the old to new value changes for comments
   */
  ngOnChanges(changes: SimpleChanges) {
    if (changes.postComments && changes.postComments.currentValue) {
      this.postCommentList = changes.postComments.currentValue;
      console.log(this.postCommentList);
      this.totalCommentsCount = this.postCommentList.length;
      this.getUserDetailsForComment();
    }
  }

  ngOnInit(): void {
  
     
    
  }

  /**
   * Get user name for the comments created by user
   */
  getUserDetailsForComment(): void {
    this.postCommentList.forEach(comment => {
      if (comment.user !== null) {
        this.userService.getUserDetailsById(comment.user).subscribe(
          res => {
            comment.userName = res.username;
          },
          err => {
            this.sharedService.errorResponse();
            this.sharedService.isLoaderLoading.next(false);
          }
        );
      }
      this.sharedService.isLoaderLoading.next(false);
    });
  }

  addComment(addCommentForm: NgForm): void {
    const userId = this.tokenStorageService.loggedInUserId
    this.newComment.user = userId;
    this.newComment.post = this.postId;
    this.postService.addComment(this.newComment).subscribe(res => {
      this.sharedService.successResponse('Comment added successfully.');
      addCommentForm.resetForm();

      this.updatePostList();
    },
      err => { this.errorResponse(); });
  }

  /**
   * Error response
   */
  errorResponse(): void {
    this.sharedService.errorResponse();
    this.sharedService.isLoaderLoading.next(false);
  }

  updatePostList(): void {
    this.postCommentList = [];
    this.postService.getPostDetails(this.postId).subscribe(res => {
      // ArrayBuffer to JSON
      const response: Post[] = JSON.parse(JSON.stringify(res));
      response.forEach(post => {
        if (post.id == this.postId) {
          post.comments.forEach(comment => {
            this.postCommentList.push({
              id: comment.id,
              commentText: comment.commentText,
              user: comment.user,
              post: comment.post
            });
          });
        }
      })
    });
  }
}
