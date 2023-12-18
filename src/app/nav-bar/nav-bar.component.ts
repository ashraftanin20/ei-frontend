import { Component, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements DoCheck{

  userLogin = false;
  constructor(private userService: UserService) {}
  ngDoCheck(): void {
    if(this.userService.isUserLoggedIn()) {
      this.userLogin = true;
    } else {
      this.userLogin = false;
    }
  }

  logoutUser() {
    sessionStorage.removeItem("token");
  }


}
