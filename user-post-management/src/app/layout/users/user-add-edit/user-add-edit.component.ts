import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TokenStorageService } from '../../../core/token-storage.service';
import { SharedService } from '../../../shared/shared.service';
import { User } from '../user.model';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-user-add-edit',
  templateUrl: './user-add-edit.component.html'
})
export class UserAddEditComponent implements OnInit {

  isShowPasswordChecked: boolean;
  isShowConfirmPasswordChecked: boolean;

  user: User;
  isUserAddPage: boolean;
  userId: string;
  confirmPassword: string;
  pageHeaderLable: string;

  isPassowrdConfirmPasswordMatch: boolean;
  loggedInUserId: string;

  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private userService: UsersService,
    private sharedService: SharedService,
    private tokenStorageService: TokenStorageService) {

    this.userId = '';

    this.isShowPasswordChecked = false;
    this.isShowConfirmPasswordChecked = false;
    this.isPassowrdConfirmPasswordMatch = true;
    this.confirmPassword = '';
    this.pageHeaderLable = '';

    this.userId = this.activatedRoute.snapshot.params['id'];

    this.userId === undefined ? this.isUserAddPage = true : this.isUserAddPage = false;
    this.isUserAddPage ? this.pageHeaderLable = 'Add user' : this.pageHeaderLable = 'Edit user';

    this.user = new User();

    this.loggedInUserId = this.tokenStorageService.loggedInUserId;

    // Get existing user data to edit.
    if (!this.isUserAddPage) {
      this.getExistingUserData();
    }
  }

  ngOnInit(): void {
  }

  /**
   * Add/Edit the user details
   */
  addEditUser(): void {
    this.sharedService.isLoaderLoading.next(true);

    if (this.isUserAddPage) {

      this.userService.addUser(this.user).subscribe(
        res => {
          this.sharedService.isLoaderLoading.next(false);
          this.sharedService.successResponse('User created successfully.'); 
          this.goToUserListPage();
        },
        err => {
          this.errorResponse();
        }
      );
    }

    else {
      this.userService.editUserDetails(this.userId, this.user).subscribe(
        res => {
          this.sharedService.isLoaderLoading.next(false);
          this.sharedService.successResponse('User updated successfully.'); 
          this.goToUserListPage();
        },
        err => {
          this.errorResponse();
        }
      );
    }
  }

  /**
   * Redirect to the user list page.
   */
  goToUserListPage(): void {
    this.router.navigateByUrl('user/list');
  }

  /**
   * Get user detail to edit
   */
  getExistingUserData(): void {
    this.sharedService.isLoaderLoading.next(true);
    this.userService.getUserDetailsById(this.userId).subscribe(
      res => {
        this.user.id = res.id;
        this.user.username = res.username;
        this.user.email = res.email;
        this.sharedService.isLoaderLoading.next(false);
      },
      err => {
        this.errorResponse();
      }
    )
  }

  /**
   * Error response
   */
  errorResponse(): void {
    this.sharedService.errorResponse();
    this.sharedService.isLoaderLoading.next(false);
  }
}
