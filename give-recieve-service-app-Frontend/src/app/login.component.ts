import { AuthService } from './auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  template: `
    <!-- Default form login -->
    <div class="authForm">
      <form
        [formGroup]="loginForm"
        (ngSubmit)="onSubmit()"
        class="text-center border border-light p-5 "
      >
        <h3 class="general-margin">Sign in</h3>

        <!-- Email -->
        <input
          type="email"
          id="defaultLoginFormEmail"
          class="form-control mb-4"
          placeholder="E-mail"
          formControlName="email"
        />

        <!-- Password -->
        <input
          type="password"
          id="defaultLoginFormPassword"
          class="form-control mb-4"
          placeholder="Password"
          formControlName="password"
        />

        <div class="d-flex justify-content-around">
          <div>
            <!-- Forgot password -->
            <a href="">Forgot password?</a>
          </div>
        </div>

        <!-- Sign in button -->
        <button
          mdbBtn
          color="info"
          block="true"
          class="my-4 btn btn-primary general-margin"
          type="submit"
        >
          Sign in
        </button>

        <!-- Register -->
        <p>
          Not a member?
          <a href="">Register</a>
        </p>
      </form>
    </div>
    <!-- Default form login -->
  `,
  styles: [
    `
      .authForm {
        width: 300px;
        text-align: auto;
        margin: 20px auto 20px;
      }
    `,
  ],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {}

  initializeLoginForm() {
    this.loginForm = this.fb.group({
      email: 'zol@tem',
      password: '1253345dsd76',
    });
  }
  onSubmit() {
    // console.log(this.loginForm.value);
    this.auth.login(this.loginForm.value).subscribe((data: any) => {
      console.log(data);
      if (data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('isLoggedIn', 'true');
        this.router.navigate(['']);
      }
    });
  }
  ngOnInit(): void {
    this.initializeLoginForm();
  }
}
