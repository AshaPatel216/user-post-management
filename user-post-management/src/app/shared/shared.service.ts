import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class SharedService {

  headerLable: Subject<string>;
  isLoaderLoading: Subject<boolean>;
  isUserLoggedIn: Subject<boolean>;

  constructor(private toastr: ToastrService) {
    this.headerLable = new Subject<string>();
    this.isLoaderLoading = new Subject<boolean>();
    this.isUserLoggedIn = new Subject<boolean>();
  }

  /**
   * Response error from backend.
   */
  errorResponse(): void {
    this.toastr.error('', 'Something went wrong.', {
      timeOut: 3000,
      extendedTimeOut: 5000,
      closeButton: true,
      toastClass: 'custom-toast ngx-toastr'
    });
  }

  /**
   * Success resposne
   */
  successResponse(message: string): void {
    this.toastr.success('', message , {
      timeOut: 3000,
      extendedTimeOut: 5000,
      closeButton: true,
      toastClass: 'custom-toast ngx-toastr'
    });
  }
}
