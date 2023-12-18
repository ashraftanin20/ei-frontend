import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private builder: FormBuilder, private userService: UserService, 
                private router: Router) { }

  registerForm: FormGroup = this.builder.group({
    username: this.builder.control('', Validators.required),
    password: this.builder.control('', [Validators.required, Validators.minLength(5)]),
    email: this.builder.control('', [Validators.required, Validators.email]),
  });

  submitRegistration() {
    if(this.registerForm.valid) {
      this.userService.registerUser(this.registerForm.value).then(res => {
        Swal.fire({
          icon: 'success',
          title: 'Registered Successfully, You can login now',
          showConfirmButton: false,
          timer: 1500,
        });
        this.router.navigate(['login']);
      }, err => {
        Swal.fire({
          icon: 'error',
          title: 'Registeration Failed, please try again later',
          showConfirmButton: false,
          timer: 1500,
        });
      })
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
