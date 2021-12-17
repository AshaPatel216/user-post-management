import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html'
})
export class LoaderComponent implements OnInit {

  isLoaderLoading: boolean;

  constructor(private sharedService: SharedService) {
    this.isLoaderLoading = false;

    this.sharedService.isLoaderLoading.subscribe(res => {
      this.isLoaderLoading = res;
    });
  }

  ngOnInit(): void {
  }

}
