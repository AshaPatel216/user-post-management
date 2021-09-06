import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/internal/Subject';
import { User } from './user.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

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
    return this.http.get<User[]>(`${this.endPointUrl}/users`, httpOptions);
  }

  /**
   * Add User
   * @param user User object containing user details
   */
  addUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.endPointUrl}/auth/local/register`, user, httpOptions);
  }

  /**
   * Delete user
   * @param userId Id of the user that needs to be deleted
   */
  deleteUser(userId: string) {
    return this.http.delete(`${this.endPointUrl}/users/${userId}`);
  }

  /**
   * Get user details by id.
   * @param userId Id to fetch user details by id
   */
  getUserDetailsById(userId: string): Observable<User>{
    return this.http.get<User>(`${this.endPointUrl}/users/${userId}`);
  }

  editUserDetails(userId: String, user: User) {
    return this.http.put(`${this.endPointUrl}/users/${userId}`, user);
  }
}
