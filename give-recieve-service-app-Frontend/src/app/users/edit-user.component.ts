import { HttpClient } from '@angular/common/http';
import { AuthService } from './../auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UsersService } from './users.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-user',
  template: `
    <div class="i">
      <div class="i-left"></div>
      <div class="i-middle">
        <h2>Edit Profile</h2>
        <form [formGroup]="myEditForm" (ngSubmit)="onSubmit()">
          <input
            type="text"
            class="form-control"
            placeholder="Firstname"
            formControlName="firstname"
          />
          <span *ngIf="myEditForm.get('firstname')?.touched && !myEditForm.get('firstname')?.valid">Firstname is required</span>

          <input
            type="text"
            class="form-control"
            placeholder="Lastname"
            formControlName="lastname"
          />
          <span *ngIf="myEditForm.get('lastname')?.touched && !myEditForm.get('lastname')?.valid">Lastname is required</span>

          <input
            type="text"
            class="form-control"
            placeholder="Phone"
            formControlName="phone"
          />
          <span *ngIf="myEditForm.get('phone')?.touched && !myEditForm.get('phone')?.valid">Phone is required</span>
          <br />
          <button class=" btn btn-primary btn-md">Submit</button>
        </form>
      </div>
      <div class="i-right"></div>
    </div>
  `,
  styles: [`
  span{
    color:red;
  }`],
})
export class EditUserComponent implements OnInit {
  myEditForm!: FormGroup;
  email!: any;
  myUser!: any;
  edittedData!: any;

  constructor(
    private userManager: UsersService,
    private router: Router,
    private ar: ActivatedRoute,
    private fb: FormBuilder,
    private auth: AuthService,
    private hc: HttpClient
  ) {
    this.ar.paramMap.subscribe((params: any) => {
      this.email = params.get('email');
      console.log(this.email);
      let extras: any = this.router.getCurrentNavigation()?.extras;
      this.myUser = extras['state'];
      console.log(this.myUser);
    });
  }

  updateUser() {}
  initializeForm() {
    this.myEditForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      phone: ['', Validators.required],
    });
    this.myEditForm.get('firstname')?.setValue(this.myUser.firstname);
    this.myEditForm.get('lastname')?.setValue(this.myUser.lastname);
    this.myEditForm.get('phone')?.setValue(this.myUser.phone);
  }
  onSubmit() {
    // console.log();
    let confirmation: any = confirm(
      'You have to log back in to apply the changes. Is that ok?'
    );
    if (confirmation) {
      this.hc
        .patch(
          'http://localhost:1211/services/' + this.myUser.firstname+"-"+this.myUser.lastname,
          this.myEditForm.value
        )
        .subscribe((data: any) => {
          console.log(data);
        });

      this.userManager
        .updateUser(this.email, this.myEditForm.value)
        .subscribe((editted: any) => {
          console.log(editted);
          if (editted.success) {
            this.auth.logout();
            this.router.navigate(['', 'login']);
          }
        });
    }
  }

  ngOnInit(): void {
    this.initializeForm();
  }
}
