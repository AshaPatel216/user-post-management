import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { TokenStorageService } from './core/token-storage.service';
import { User } from './layout/users/user.model';
import { SharedService } from './shared/shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'user-post-management';
  hasUserLoggedIn: boolean;
  currentLoggedInUser: User;
  LoggedInUserName: string;
  isLoaderLoading: boolean;

  constructor(private tokenStorageService: TokenStorageService,
    private sharedService: SharedService,
    private router: Router) {

    this.hasUserLoggedIn = false;

    // Get LogeedIn user Token and details
    if (this.tokenStorageService.getToken()) {
      this.hasUserLoggedIn = true;
      this.sharedService.isUserLoggedIn.next(true);
      const user = this.tokenStorageService.getUser();
      this.LoggedInUserName = user.username;
      this.tokenStorageService.loggedInUserId = user.id;
    }

    // If user is not logged in then redirect back to login screen
    else {
      this.sharedService.isUserLoggedIn.next(false);
      this.router.navigate(['/login']);
    }

    // Get information about user login
    this.sharedService.isUserLoggedIn.subscribe(res => {
      this.hasUserLoggedIn = res;
    })

    this.isLoaderLoading = false;

    //Fetch loader value from different components and show common loader
    this.sharedService.isLoaderLoading.subscribe(res => {
      this.isLoaderLoading = res;
    });

  }

  ngOnInit() {
   
  }
}
