import { Component, inject } from '@angular/core';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  userService: UserService = inject(UserService);
  isUserLoggedIn = this.userService.isUserLoggedIn();
}
