import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class SharedService {

  headerLable: Subject<string>;

  constructor() {
    this.headerLable = new Subject<string>();
  }

}
