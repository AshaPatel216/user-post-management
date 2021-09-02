import { Component, OnDestroy, OnInit } from '@angular/core';
import { SharedService } from '../../../shared/shared.service';
import { User } from '../user.model';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html'
})
export class UsersListComponent implements OnInit, OnDestroy{

  users: User[];
  usersCount: number;

  constructor(private userService: UsersService,
    private sharedService: SharedService) {
    this.users = [];
    this.usersCount = 0;
    this.sharedService.isLoaderLoading.next(true);
  }

  ngOnInit(): void {
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
      },
      err => {
        console.log('Something went wrong.');
        this.sharedService.isLoaderLoading.next(false);
      }
    );
  }
}
