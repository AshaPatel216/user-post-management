import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from '../../../core/token-storage.service';
import { SharedService } from '../../../shared/shared.service';
import { User } from '../../users/user.model';
import { UsersService } from '../../users/users.service';
import { AddPost, Comment, Media, Post } from '../post.model';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html'
})
export class AddPostComponent {

  imageFileName: string;

  uploadedImages: Media[];
  post: AddPost;
  posts: Post[];
  allPostComments: Comment[];
  postUserDetails: User;

  constructor(private postService: PostsService,
    private sharedService: SharedService,
    private router: Router,
    private tokenStorageService: TokenStorageService) {
    this.imageFileName = '';
    this.uploadedImages = [];
    this.post = new AddPost();
    this.posts = [];
    this.allPostComments = [];
    this.postUserDetails = new User();
  }

  /**
   * Upload Image when it is selected
   * @param files
   */
  onImageSelected(files: File[]): void {
    this.sharedService.isLoaderLoading.next(true);

    const file: File = files[0];

    if (file) {
      this.imageFileName = file.name;

      const formData: FormData = new FormData();

      formData.append('files', file);

      this.postService.uploadImage(formData).subscribe(
        (res: Media) => {
          this.sharedService.isLoaderLoading.next(false);
          this.sharedService.successResponse("Image uploaded successfully.");
          this.showUploadedImages(res);
        },

        err => {
          this.sharedService.errorResponse();
          this.sharedService.isLoaderLoading.next(false);
        }
      );
    }
  }

  /**
   * Show uploaded images for post
   * @param res Image response
   */
  showUploadedImages(res: Media): void {
    this.uploadedImages.push(
      {
        'id': res[0].id,
        'name': res[0].name,
        'url': res[0].url
      }
    )
  }

  /**
   * Create Post
   */
  createPost(): void {
    this.sharedService.isLoaderLoading.next(true);
    this.post.media = [];
    this.post.comments = [];
    this.post.user = this.tokenStorageService.loggedInUserId;

    this.uploadedImages.forEach(
      image => {
        this.post.media.push(
          {
            'id': image.id,
            'name': image.name,
            'url': image.url
          }
        )
      }
    )

    this.postService.createPost(this.post).subscribe(
      (res: Post) => {
        this.sharedService.successResponse("Post created successfully.");
        this.updatePostList();
        this.sharedService.isLoaderLoading.next(false);
        this.router.navigate(['/post/', res.id]);
      },
      err => {
        this.sharedService.errorResponse();
        this.sharedService.isLoaderLoading.next(false);
      }
    );

  }

  /**
   * Update Post list after creation
   */
  updatePostList(): void {
    this.posts = [];
    this.postService.posts.next([]);
  }
}
