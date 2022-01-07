import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { TokenStorageService } from '../../core/token-storage.service';
import { SharedService } from '../../shared/shared.service';
import { Post, Comment } from './post.model';
import { PostsService } from './posts.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html'
})
export class PostsComponent implements OnInit, OnDestroy {

  posts: Post[];
  comments: Comment[];
  currentRouteId: string;
  tempPostId: string;
  isMyPostVisible: boolean;
  tempPostList: Post[];

  constructor(private postsService: PostsService,
    private sharedService: SharedService,
    private router: Router,
    private tokenStorageService: TokenStorageService) {

    this.posts = [];
    this.sharedService.isLoaderLoading.next(true);

    this.currentRouteId = '';
    this.tempPostId = '';

    this.tempPostList = [];

    this.isMyPostVisible = false;

    // fetch id from the current route and make a post as selected
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (event.urlAfterRedirects !== '/post') {
          this.currentRouteId = event.url.substring(event.url.indexOf('/post') + 6);
        }
        if (event.urlAfterRedirects === '/post') {
          this.getAllPostsList();
        }
        this.posts.forEach(post => {
          if (this.currentRouteId == post.id) {
            post.isPostSelected = true;
          }
        })
      }
    });

    // get my posts
    this.postsService.isMyPostsVisible.subscribe(res => {
      this.isMyPostVisible = res;
      if (res) {
        this.getMyPosts();
      }
    });


    // update post list when edit delete operation perform
    this.postsService.posts.subscribe(res => {
      if (res) {   
        this.getAllPostsList();       
      }
    })
  }


  ngOnInit(): void {
    this.getAllPostsList();
    this.sharedService.headerLable.next('posts'); 
  }

  ngOnDestroy(): void {
    this.currentRouteId = '';
    this.sharedService.headerLable.next('');
  }

  /**
   * Get All Post
   */
  getAllPostsList(): void {
    this.sharedService.isLoaderLoading.next(true);
    this.postsService.getAllPosts().subscribe(
      res => {
        this.posts = [];
        res.forEach((post) => {
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
              'isPostSelected': false,
              'media': [],
              'user': post.user
            }
          );
        });

        this.getSelectedPostDetails();
        if (this.isMyPostVisible) {
          this.getMyPosts();
        }

        this.sharedService.isLoaderLoading.next(false);
      },
      err => {
        this.sharedService.isLoaderLoading.next(false);
        this.sharedService.errorResponse();
      }
    )

  }

  /**
   * Make post name active in left side list when first time page loaded or page reloaded.
   */
  getSelectedPostDetails(): void {

    // redirect to the first post id when routing is '/post'
    if (this.currentRouteId === '') {
      this.posts[0].isPostSelected = true;

      this.posts.map((post) => {
        if (post.isPostSelected) {
          this.router.navigate(['post', post.id]);
        }
      });
    }

    else {
      this.router.navigate(['post', this.currentRouteId]);
      this.posts.forEach((post, index) => {
        this.tempPostId = post.id;
        if (this.tempPostId == this.currentRouteId) {
          post.isPostSelected = true;
          this.postsService.postTitleToShow.next(`Post ${index + 1}`);
        }
        else {
          post.isPostSelected = false;
        }
      });
    }

  }

  /**
   * Make selected post as active
   * @param postId Id of the selected post
   */
  showPostDetails(postId: string, index: number): void {
    // change isSelected boolean
    this.posts.forEach(post => {
      if (post.id === postId) {
        post.isPostSelected = true;
        this.postsService.postTitleToShow.next(`Post ${index + 1}`);
      }
      else {
        post.isPostSelected = false;
      }
    })
  }

  /**
   * Go to add new post page.
   */
  addNewPost(): void {
    this.sharedService.isLoaderLoading.next(true);
    this.posts.map(post => {
      if (post.isPostSelected) {
        post.isPostSelected = false;
      }
    });
    this.sharedService.isLoaderLoading.next(false);
    this.router.navigate(['/post/add']);
  }

  /**
   * List loggedin user's Post
   */
  getMyPosts(): void {
    this.tempPostList = this.posts;
    this.posts = [];

    this.tempPostList.forEach(post => {
      if (post.user !== null && post.user.id === this.tokenStorageService.loggedInUserId) {
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
            'isPostSelected': false,
            'media': [],
            'user': post.user
          }
        );
      }
    })

    // change route, Post label and isSelected value as per the route id
    this.posts.forEach((post, index) => {
      if (post.id == this.currentRouteId) {
        post.isPostSelected = true;
        this.postsService.postTitleToShow.next(`Post ${index + 1}`);
        this.router.navigate(['post', post.id]);
      }

      else {
        if (index === 0 && post.id !== this.currentRouteId) {
          this.postsService.postTitleToShow.next(`Post ${index + 1}`);
          this.router.navigate(['post', post.id]);
        }
      }
     
    });

    this.sharedService.isLoaderLoading.next(false);
  }
}
