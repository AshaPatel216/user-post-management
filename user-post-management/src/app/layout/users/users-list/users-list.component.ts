import { Component, OnDestroy, OnInit } from '@angular/core';
import { SharedService } from '../../../shared/shared.service';
import { User } from '../user.model';
import { UsersService } from '../users.service';

import { ToastrService } from 'ngx-toastr';
import { TokenStorageService } from '../../../core/token-storage.service';


@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html'
})
export class UsersListComponent implements OnInit, OnDestroy {

  users: User[];
  usersCount: number;
  loggedInUserId: string;

  constructor(private userService: UsersService,
    private sharedService: SharedService,
    private tokenStorageService: TokenStorageService) {
    this.users = [];
    this.usersCount = 0;
    this.loggedInUserId = '';
    this.sharedService.isLoaderLoading.next(true);
    this.loggedInUserId = this.tokenStorageService.loggedInUserId;
  }

  ngOnInit(): void {
    // Fetch all user's list
    this.getAllUserList();
  }

  ngOnDestroy(): void {
    this.sharedService.isLoaderLoading.next(false);
  }

  /**
   * Get all users list.
   */
  getAllUserList(): void {
    this.sharedService.isLoaderLoading.next(true);
    this.userService.getAllUsers().subscribe(
      res => {
        this.getUserListResponse(res);
      },
      err => {
        this.errorResponse();
      }
    );
  }

  /**
   * Response of the user list
   * @param res Response from backend.
   */
  getUserListResponse(res: User[]): void {
    this.usersCount = res.length;
    if (this.usersCount > 0) {
      res.forEach((user: User) => {
        this.users.push({
          id: user.id,
          username: user.username,
          email: user.email,
          password: '',
          posts: null,
          comments: null
        });
      })
    }
    this.sharedService.isLoaderLoading.next(false);
  }

  /**
   * Delete user.
   * @param userId Id of the user that needs to be deleted
   */
  deleteUser(userId: string): void {
    this.sharedService.isLoaderLoading.next(true);
    this.userService.deleteUser(userId).subscribe(
      res => {
        this.sharedService.successResponse('User deleted successfully.');
        this.sharedService.isLoaderLoading.next(false);
        this.users = [];
        this.getAllUserList();
      },
      err => {
        this.errorResponse();
      }
    );
  }

  /**
   * Error response
   */
  errorResponse(): void {
    this.sharedService.errorResponse();
    this.sharedService.isLoaderLoading.next(false);
  }
}

