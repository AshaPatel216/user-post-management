import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/internal/Subject';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  endPointUrl: string;

  headerLable: Subject<string>;

  constructor(private http: HttpClient) {
    this.endPointUrl = 'https://strapi-test.promactinfo.com';
    this.headerLable = new Subject<string>();

  }

  /**
   * Get list of all the users.
   */
  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.endPointUrl}/users`);
  }

  /**
   * Add User
   * @param user User object containing user details
   */
  addUser(user: User): Observable<User> {
    console.log(`${this.endPointUrl}/auth​/local​/register`);
    return this.http.post<User>(`${this.endPointUrl}/auth/local/register`, user);
  }
}
