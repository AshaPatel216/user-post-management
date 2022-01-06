import { Component, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { TokenStorageService } from '../../core/token-storage.service';
import { SharedService } from '../../shared/shared.service';
import { User } from '../users/user.model';
import { UsersService } from '../users/users.service';
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
  postUserDetails: User;
  tempPostList: Post[];

  constructor(private postsService: PostsService,
    private sharedService: SharedService,
    private router: Router,
    private route: ActivatedRoute,
    private userService: UsersService,
    private tokenStorageService: TokenStorageService) {
    this.posts = [];
    this.sharedService.isLoaderLoading.next(true);

    this.currentRouteId = '';
    this.tempPostId = '';
    this.isMyPostVisible = false;
    this.postUserDetails = new User();
    this.tempPostList = [];

    this.postsService.isMyPostsVisible.subscribe(res => {
      this.isMyPostVisible = res;
      if (res) {
        // this.posts = [];
        this.getMyPosts();
      }
    });

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (event.urlAfterRedirects !== '/post') {
          this.currentRouteId = event.url.substring(event.url.indexOf('/post') + 6);
        }
      }
    });

    this.postsService.posts.subscribe(res => {
      console.log(this.isMyPostVisible);
      if (res) {
        //this.posts = res;
        //this.posts.forEach(post => {
        //  post.totalComment = post.comments.length;
        //})
        //this.getSelectedPostDetails();

        this.getAllPostsList();
        // update my posts only when my posts visible
        if (this.isMyPostVisible) {
          this.getMyPosts();
        }
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
    this.posts = [];
    this.postsService.getAllPosts().subscribe(
      res => {
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

          this.postUserDetails = new User();

         // this.postUserDetails = post.user;

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

       // this.postUserDetails = new User();

      //  this.postUserDetails = post.user;

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



    this.posts.forEach((post, index) => {
      if (post.id == this.currentRouteId) {
        this.postsService.postTitleToShow.next(`Post ${index + 1}`);
        this.router.navigate(['post', post.id]);
      }

      else {
        if (index === 0 && post.id !== this.currentRouteId) {

          this.postsService.postTitleToShow.next(`Post ${index + 1}`);
          this.router.navigate(['post', post.id]);
        }
      }
      //if (index === 0 && post.id !== this.currentRouteId) {
      //  post.isPostSelected = true;
      //  this.router.navigate(['post', post.id]);
      //}
    });

    console.log("current route: " + this.currentRouteId)

    //this.userService.getUserDetailsById(this.tokenStorageService.loggedInUserId).subscribe(res => {
    //  console.log(res.posts.length)
    //  res.posts.forEach((post, index) => {
    //    this.comments = [];

    //    res.comments.forEach(comment => {
    //      if (comment.post === post.id) {
    //        this.comments.push(
    //          {
    //            'id': comment.id,
    //            'commentText': comment.commentText,
    //            'user': comment.user
    //          }
    //        )
    //      }
    //    })

    //    this.posts.push(
    //      {
    //        'id': post.id,
    //        'description': post.description,
    //        'comments': this.comments,
    //        'totalComment': this.comments.length,
    //        'isPostSelected': false,
    //        'media': []
    //      }
    //    );

    //  });

    //  console.log(this.posts);
    //  //this.posts[0].isPostSelected = true;

    //  this.posts.map((post, index) => {
    //    if (post.id == this.currentRouteId) {
    //      post.isPostSelected = true;
    //      this.postsService.postTitleToShow.next(`Post ${index + 1}`);
    //    }
    //    //if (index === 0 && post.id !== this.currentRouteId) {
    //    //  post.isPostSelected = true;
    //    //  this.router.navigate(['post', post.id]);
    //    //}
    //  });

    //  this.router.navigate(['post', this.currentRouteId]);

    //  // this.postsService.postTitleToShow.next(`Post 1`);
    //  this.sharedService.isLoaderLoading.next(false);
    //},
    //  err => {
    //    this.sharedService.errorResponse();
    //  })
  }
}
