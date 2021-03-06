import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth.service';
import { TokenStorageService } from '../../core/token-storage.service';
import { SharedService } from '../../shared/shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {


  userEmail: string;
  userPassowrd: string;
  isUserLoggedIn: boolean;
  isLogInFailed: boolean;
  isShowPasswordChecked: boolean;

  userData: any;

  constructor(private sharedService: SharedService,
    private authService: AuthService,
    private tokenStorageService: TokenStorageService,
    private router: Router) {
    this.userEmail = '';
    this.userPassowrd = '';
    this.isUserLoggedIn = false;
    this.isLogInFailed = false;
    this.isShowPasswordChecked = false;
    this.tokenStorageService.logout();
  }

  /**
   * user login
   */
  login(): void {
    this.sharedService.isLoaderLoading.next(true);
    this.authService.login(this.userEmail, this.userPassowrd).subscribe(
      res => {
        this.userData = res;
        this.tokenStorageService.saveToken(this.userData.jwt);
        this.tokenStorageService.saveUser(this.userData.user);

        this.isUserLoggedIn = true;
        this.sharedService.isLoaderLoading.next(false);

        this.goToDashboard();
      },
      err => {
        this.isUserLoggedIn = false;
        if (err.status === 400) {
          this.isLogInFailed = true;
        }
        else {
          this.sharedService.errorResponse();
        }
        this.sharedService.isLoaderLoading.next(false);
        this.tokenStorageService.logout();
      }
    );
  }

  /**
   * Go to dashboard.
   */
  goToDashboard(): void {
    this.sharedService.isUserLoggedIn.next(true);
    this.router.navigateByUrl('user');
  }
}
