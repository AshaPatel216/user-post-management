import { Component, OnInit } from '@angular/core';
import { NavigationCancel, Router } from '@angular/router';
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
    private sharedService: SharedService,
    private router: Router) {

    this.isUserLoggedIn = false;

    if (this.tokenStorageService.getToken()) {
      this.isUserLoggedIn = true;
      this.sharedService.isUserLoggedIn.next(true);
      const user = this.tokenStorageService.getUser();
      this.LoggedInUserName = user.username;
      this.tokenStorageService.loggedInUserId = user.id;
    }

    else {
      this.sharedService.isUserLoggedIn.next(false);
      this.router.navigate(['/login']);
    }

    this.sharedService.isUserLoggedIn.subscribe(res => {
      this.isUserLoggedIn = res;
    })
  }

  ngOnInit() { }
}
