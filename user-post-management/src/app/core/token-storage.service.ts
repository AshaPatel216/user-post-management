// TokenStorageService to manages token and user information (username, email, roles) inside Browser’s Session Storage.

import { Injectable } from '@angular/core';
import { User } from '../layout/users/user.model';
import { SharedService } from '../shared/shared.service';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  loggedInUserId: string;

  constructor(private shareService: SharedService) {
    this.loggedInUserId = '';
  }

  /**
   * Logout.
   */
  logout() {
    window.sessionStorage.clear();
    this.shareService.isUserLoggedIn.next(false);
  }

  /**
   * get Token.
   */
  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  /**
   * Save token
   * @param token Token fetched from login API response.
   */
  public saveToken(token: string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  /**
   * get LoggedIn user data.
   */
  public getUser(): User {
    return JSON.parse(sessionStorage.getItem(USER_KEY));
  }

  /**
   * Save LoggedIn user data.
   * @param user
   */
  public saveUser(user) {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

}
