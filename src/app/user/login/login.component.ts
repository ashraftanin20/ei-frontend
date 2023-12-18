import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  userData: any;

  constructor(private builder: FormBuilder, private userService: UserService, 
    private router: Router) { }

  loginForm: FormGroup = this.builder.group({
    username: this.builder.control('', Validators.required),
    password: this.builder.control('', Validators.required),
  });

  loginUser() {
  if(this.loginForm.valid) {
  //   this.userService.getUserByCode(this.loginForm.value.username).subscribe(
  //     res => {
  //       this.userData = res;
  //       if(this.userData.password === this.loginForm.value.password) {
  //         if(this.userData.isActive) {
  //           sessionStorage.setItem('username', this.userData.id);
  //           sessionStorage.setItem('userrole', this.userData.role);
  //           this.router.navigate(['invoices']);
  //         } else {
  //           Swal.fire({
  //             icon: 'warning',
  //             title: 'Inactive user, please contact admin',
  //             showConfirmButton: false,
  //             timer: 1500,
  //           });
  //         }
  //       } else {
  //         Swal.fire({
  //           icon: 'error',
  //           title: 'Wrong Password!',
  //           showConfirmButton: false,
  //           timer: 1500,
  //         });
  //       }
  //     }
  //   )
    this.userService.loginService(this.loginForm.value.username, this.loginForm.value.password)
    .then((res) => {
      Swal.fire({
        icon: 'success',
        title: 'Login Success!',
        showConfirmButton: false,
        timer: 1500,
      });
        console.log("Token:", res.token);
        sessionStorage.setItem('token', res.token);
        this.router.navigate(['invoices']);
    }); 
  } else {
    Swal.fire({
          icon: 'warning',
          title: 'Please Enter valid data!',
          showConfirmButton: false,
          timer: 1500,
        });
  }
  }
}
