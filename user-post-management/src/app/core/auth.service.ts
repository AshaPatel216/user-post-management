// This service sends login HTTP POST requests to back - end.

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { User } from '../layout/users/user.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  authUrl: string;

  constructor(private http: HttpClient) {
    this.authUrl = 'https://strapi-test.promactinfo.com/auth';
  }

  /**
  * Login to the system
  * @param userEmail email of the user
  * @param userPassword password of the user
  */
  login(userEmail: string, userPassword: string){
    return this.http.post('https://strapi-test.promactinfo.com/auth/local', {
      identifier: userEmail,
      password: userPassword,
    }, httpOptions);
  }

}