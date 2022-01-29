// This service sends login HTTP POST requests to back - end.

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private http: HttpClient) {  }

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
