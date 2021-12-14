import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray } from '@angular/forms';
@Component({
  selector: 'app-signup',
  template: `
  <!-- Default form register -->
  <div class="authForm">
    <form
      [formGroup]="signUpForm"
      class="text-center border border-light p-5"
      (ngSubmit)="onSubmit()"
    >
      <h3 class="general-margin">Sign up</h3>

      <div class="form-row mb-4">
        <div class="col">
          <!-- First name -->
          <input
            type="text"
            id="defaultRegisterFormFirstName"
            class="form-control"
            placeholder="First name"
            formControlName="firstname"
          />
        </div>
        <div class="col">
          <!-- Last name -->
          <input
            type="text"
            id="defaultRegisterFormLastName"
            class="form-control"
            placeholder="Last name"
            formControlName="lastname"
          />
        </div>
      </div>

      <!-- E-mail -->
      <input
        type="email"
        id="defaultRegisterFormEmail"
        class="form-control mb-4"
        placeholder="E-mail"
        formControlName="email"
      />

      <!-- Password -->
      <input
        type="password"
        id="defaultRegisterFormPassword"
        class="form-control"
        placeholder="Password"
        aria-describedby="defaultRegisterFormPasswordHelpBlock"
        formControlName="password"
      />
      <small
        id="defaultRegisterFormPasswordHelpBlock"
        class="form-text text-muted mb-4"
      >
        At least 8 characters and 1 digit
      </small>

      <!-- Phone number -->
      <input
        type="text"
        id="defaultRegisterPhonePassword"
        class="form-control"
        placeholder="Phone number"
        aria-describedby="defaultRegisterFormPhoneHelpBlock"
        formControlName="phone"
      />
      <small
        id="defaultRegisterFormPhoneHelpBlock"
        class="form-text text-muted mb-4"
      >
        Optional - for two-step authentication </small
      ><br />

      <!-- Sign up button -->
      <button
        
        color="info"
        block="true"
        class="general-margin btn btn-primary"
        type="submit"
      >
        Sign up
      </button>

      <hr />

      <!-- Terms of service -->
      <p>
        By clicking <em>Sign up</em> you agree to our
        <a href="" target="_blank">terms of service</a>
      </p>
    </form>
  </div>
  <!-- Default form register -->
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

export class SignupComponent implements OnInit {
  signUpForm!: FormGroup;

  constructor(private auth:AuthService, private fb: FormBuilder, private router:Router) {}

  initializeSignUpForm() {
    this.signUpForm = this.fb.group({
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      phone: '',
    });
  }
  onSubmit() {
    console.log(this.signUpForm.value);
    this.auth.signup(this.signUpForm.value).subscribe(data=>{
      console.log(data);
    })
    setTimeout(()=>{

      this.auth.login(this.signUpForm.value).subscribe((data:any)=>{
        // console.log(data);
        if (data.token) {
          localStorage.setItem('token', data.token);
          localStorage.setItem('isLoggedIn', 'true');
          this.router.navigate(['']);
        }
      })
    },500)
    
    
  }
  ngOnInit(): void {
    this.initializeSignUpForm();
  }
}
