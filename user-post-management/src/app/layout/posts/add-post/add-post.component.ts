import { HttpClient, HttpEvent, HttpEventType, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { TokenStorageService } from '../../../core/token-storage.service';
import { SharedService } from '../../../shared/shared.service';
import { Media, Post } from '../post.model';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html'
})
export class AddPostComponent implements OnInit {

  imageFileName: string;

  uploadedImages: Media[];
  post: Post;

  constructor(private postService: PostsService,
    private sharedService: SharedService,
    private router: Router) {
    this.imageFileName = '';
    this.uploadedImages = [];
    this.post = new Post();
  }

  ngOnInit(): void {
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

  showUploadedImages(res: Media) {
    this.uploadedImages.push(
      {
        'id': res[0].id,
        'name': res[0].name,
        'url': res[0].url
      }
    )
  }

  createPost(): void {
    this.sharedService.isLoaderLoading.next(true);
    this.post.media = [];
    this.post.comments = [];
   
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
        this.sharedService.isLoaderLoading.next(false);
        this.router.navigate(['/post/', res.id]);
      },
      err => {
        this.sharedService.errorResponse();
        this.sharedService.isLoaderLoading.next(false);
      }
    );
    
  }
}
