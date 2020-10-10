import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
})
export class RegisterPageComponent implements OnInit {
  formGroup!: FormGroup;

  constructor(
    private authService: AuthenticationService,
    private fb: FormBuilder,
    private router: Router,
  ) {}

  submitForm(): void {
    // check error
    for (const field in this.formGroup.controls) {
      this.formGroup.controls[field].markAsDirty();
      this.formGroup.controls[field].updateValueAndValidity();
    }
    
    if (!this.formGroup.value.agree) {
      alert("Please accept agreement");
      return;
    }

    // stop if has error
    for (const field in this.formGroup.controls) {
      if (this.formGroup.controls[field].errors != null) {
        return;
      }
    }

    const { username, password } = this.formGroup.value;
    this.authService.register({
      username, password,
    })
    .then(_ => {
      this.router.navigate(['dashboard']);
    })
    .catch(err => {
      alert("Error Register");
      console.error(err);
    })
  }

  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() =>
      this.formGroup.controls.checkPassword.updateValueAndValidity()
    );
  }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.formGroup.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  };


  ngOnInit(): void {
    this.formGroup = this.fb.group({
      // email: [null, [Validators.email, Validators.required]],
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
      checkPassword: [null, [Validators.required, this.confirmationValidator]],
      // nickname: [null, [Validators.required]],
      // phoneNumberPrefix: ['+86'],
      // phoneNumber: [null, [Validators.required]],
      agree: [false],
    });
  }
}
