import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private userService: UsersService,
    private sharedService: SharedService) {

    this.userId = '';

    this.isShowPasswordChecked = false;
    this.isShowConfirmPasswordChecked = false;
    this.isPassowrdConfirmPasswordMatch = true;
    this.confirmPassword = '';
    this.pageHeaderLable = '';

    this.userId = this.activatedRoute.snapshot.params['id'];

    this.userId === undefined ? this.isUserAddPage = true : this.isUserAddPage = false;
    this.isUserAddPage ? this.pageHeaderLable = 'Add user' : this.pageHeaderLable = 'Edit user';

    // Create new object for add new user
    if (this.isUserAddPage) {
      this.user = new User();
    }
  }

  ngOnInit(): void {
  }

  /**
   * Add/Edit the user details
   */
  addEditUser(): void {
 
    this.sharedService.isLoaderLoading.next(true);
    this.userService.addUser(this.user).subscribe(
      res => {
        this.sharedService.isLoaderLoading.next(false);
        console.log("User created successfully.");
        this.goToUserListPage();
      },
      err => {
        this.sharedService.isLoaderLoading.next(false);
        console.log("Something wnt wrong!");
      }
    );
  }

  /**
   * Redirect to the user list page.
   */
  goToUserListPage(): void {
    this.router.navigateByUrl('main/user/list');
  }
}
