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
    this.endPointUrl = 'https://strapi-test.promactinfo.com/';
    this.headerLable = new Subject<string>();

  }

  /**
   * Get list of all the users.
   */
  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.endPointUrl}/users`);
  }
}
