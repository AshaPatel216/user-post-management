import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../core/token-storage.service';
import { SharedService } from '../shared/shared.service';
import { User } from './users/user.model';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html'
})
export class LayoutComponent implements OnInit {
  title = 'user-post-management';
  isUserLoggedIn: boolean;
  currentLoggedInUser: User;
  LoggedInUserName: string;

  constructor(private tokenStorageService: TokenStorageService,
    private sharedService: SharedService) {

    if (this.tokenStorageService.getToken()) {
      this.isUserLoggedIn = true;
      const user = this.tokenStorageService.getUser();
      this.LoggedInUserName = user.username;
      this.tokenStorageService.loggedInUserId = user.id;
    }
  }

  ngOnInit() { }
}
