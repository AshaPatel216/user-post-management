import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class SharedService {

  headerLable: Subject<string>;
  isLoaderLoading: Subject<boolean>;

  constructor() {
    this.headerLable = new Subject<string>();
    this.isLoaderLoading = new Subject<boolean>();
  }

}
