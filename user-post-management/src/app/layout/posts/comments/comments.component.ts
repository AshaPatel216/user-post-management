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

  // get post comment from parent component
  @Input() postComments: Comment[];

  postId: string;

  postCommentList: Comment[];
  totalCommentsCount: number;
  newComment: Comment;
  selectedCommentIndexToEdit: number;
  editCommentText: string;
  updatedComment: Comment;
  isMyPostVisible: boolean;
  updatedMyPost: Post[];

  constructor(private userService: UsersService,
    private sharedService: SharedService,
    private tokenStorageService: TokenStorageService,
    private postService: PostsService,
    private route: ActivatedRoute) {
    this.totalCommentsCount = 0;
    this.postService.totalPostComments.next(this.totalCommentsCount);
    this.sharedService.isLoaderLoading.next(true);
    this.newComment = new Comment();
    this.selectedCommentIndexToEdit = -1;
    this.editCommentText = '';
    this.updatedMyPost = [];
    this.route.params.subscribe(params => {
      this.postId = params['postId'];
    });

    this.updatedComment = new Comment();

    this.postService.isMyPostsVisible.subscribe(res => {
      this.isMyPostVisible = res;
    });
  }

  /**
   * Call on data change
   * @param changes detect the old to new value changes for comments when select another post
   */
  ngOnChanges(changes: SimpleChanges) {
    if (changes.postComments && changes.postComments.currentValue) {
      this.postCommentList = changes.postComments.currentValue;
      this.totalCommentsCount = this.postCommentList.length;
      this.postService.totalPostComments.next(this.totalCommentsCount);
      this.getUserDetailsForComment();
    }
  }

  ngOnInit(): void {}

  /**
   * Get user name for the comments created by user
   */
  getUserDetailsForComment(): void {
    this.sharedService.isLoaderLoading.next(true);

    this.postCommentList.forEach(comment => {
      if (comment.user !== null) {
        this.userService.getUserDetailsById(comment.user).subscribe(
          res => {
            comment.userName = res.username;
          },
          err => {
            this.sharedService.errorResponse();
          }
        );
      }
    });
    this.sharedService.isLoaderLoading.next(false);

  }

  /**
   * Add comment and reset the input value
   * @param addCommentForm From values for creating new comment
   */
  addComment(addCommentForm: NgForm): void {
    this.sharedService.isLoaderLoading.next(true);
    const userId = this.tokenStorageService.loggedInUserId
    this.newComment.user = userId;
    this.newComment.post = this.postId;
    this.postService.addComment(this.newComment).subscribe(res => {
      this.sharedService.successResponse('Comment added successfully.');
      addCommentForm.resetForm();
      this.sharedService.isLoaderLoading.next(false);
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

  /**
   * Update post list and comments to view latest records
   */
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
      this.sharedService.isLoaderLoading.next(false);

      this.getUserDetailsForComment();
      this.totalCommentsCount = this.postCommentList.length;
      this.postService.totalPostComments.next(this.totalCommentsCount);
      this.postService.posts.next([]);
    },
      err => { this.errorResponse(); });
  }

  /**
   * Open input box to edit the specific comment
   * @param index Index of the selected comment to edit
   * @param selectedCommentText Old comment text
   */
  openEditCommentInput(index: number, selectedCommentText: string): void {
    this.editCommentText = selectedCommentText;
    this.selectedCommentIndexToEdit = index;
  }

  /**
   * Edit the comment
   * @param editCommentForm Form to be reset
   * @param commentId Id of the comment
   * @param commentText Comment text
   * @param user User by whom post will be edited
   */
  editComment(editCommentForm: NgForm, commentId: string, commentText: string, user: string): void {

    this.updatedComment = new Comment();
    this.updatedComment.id = commentId;
    this.updatedComment.commentText = commentText;
    this.updatedComment.user = user;

    this.postService.editComment(commentId, this.updatedComment).subscribe(res => {
      this.sharedService.successResponse('Comment updated successfully.');
      this.sharedService.isLoaderLoading.next(true);
      this.updatePostList();
    },
      err => { this.errorResponse(); });

    this.selectedCommentIndexToEdit = -1;
    editCommentForm.resetForm();
    this.updatePostList();
  }

  /**
   * Delete comment
   * @param comment Comment to be deleted
   */
  deleteComment(comment: Comment): void {
    this.sharedService.isLoaderLoading.next(true);
    this.postService.deleteComment(comment.id).subscribe(res => {
      this.sharedService.successResponse('Comment deleted successfully.');
      this.updatePostList();
    },
      err => { this.errorResponse(); });
  }
}
