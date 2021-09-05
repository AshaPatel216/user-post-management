import { Component } from '@angular/core';
import { TokenStorageService } from './core/token-storage.service';
import { User } from './layout/users/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'user-post-management';

  constructor() {
  }
}
