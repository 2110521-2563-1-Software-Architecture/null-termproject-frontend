import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule  } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  validateForm!: FormGroup;
  
  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private router: Router,
  ) {}

  submitForm(): void {
    console.log(this.validateForm.controls.userName.value);
    console.log(this.validateForm.controls.password.value);
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
      console.log(this.validateForm.controls[i]);
    }

    const {userName: username, password} = this.validateForm.value;
    this.authService.login({username, password});
  }


  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true]
    });

    this.authService.currentUser.subscribe({
      next: val => {
        if (val.username != null) {
          this.router.navigate(['dashboard'])
        }
      },
      error: err => {
        alert("Error logging in");
        console.error(err);
      }
    })
  }
}