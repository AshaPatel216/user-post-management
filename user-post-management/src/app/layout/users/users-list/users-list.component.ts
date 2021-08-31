import { Component, OnDestroy, OnInit } from '@angular/core';
import { SharedService } from '../../../shared/shared.service';
import { User } from '../user.model';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html'
})
export class UsersListComponent implements OnInit{

  users: User[];
  usersCount: number;

  constructor(private userService: UsersService) {
    this.users = [];
    this.usersCount = 0;
  }

  ngOnInit(): void {
    this.getAllUserList();;
  }

  /**
   * Get all users list.
   */
  getAllUserList(): void {
    this.userService.getAllUsers().subscribe(
      res => {
        this.usersCount = res.length;
        if (this.usersCount > 0) {
          res.forEach((user: User) => {
            this.users.push({
              id: user.id,
              username: user.username,
              email: user.email,
              provider: '',
              password: '',
              resetPasswordToken: '',
              blocked: false,
              confirmed: false,
              created_by: '',
              updated_by: '',
              role: '',
              posts: null,
              comments: null
            });
          })
        }
      },
      err => {
        console.log('Something went wrong.')
      }
    );
  }
}
