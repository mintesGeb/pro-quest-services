import { AuthService } from './auth.service';
import {
  AfterContentChecked,
  Component,
  DoCheck,
  OnChanges,
} from '@angular/core';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-root',
  template: `
    <!-- <app-home></app-home> -->
    <header>
      <a [routerLink]="['']">
        <img src="assets/images/mintesLogo.png" alt="" />
      </a>
      <h1 class="appname">Pro-Quest Services</h1>
      <div class="logout">
        <a
          class="highlighted-border"
          *ngIf="!isLoggedIn"
          [routerLink]="['', 'signup']"
          >Sign Up</a
        >
        <a
          class="highlighted-border"
          *ngIf="!isLoggedIn"
          [routerLink]="['', 'login']"
          >Login</a
        >

        <!-- <button
          *ngIf="isLoggedIn"
          class="highlighted-border btn btn-primary"
          (click)="showProfile()"
        >
          <img class="profilePic" src="./assets/images/blank-profile-picture.png" alt="">
        </button> -->
        <a *ngIf="isLoggedIn" [routerLink]="['', 'users', 'profile', email]"
          ><img
            class="profilePic"
            src="./assets/images/blank-profile-picture.png"
            alt=""
        /></a>
        <button
          *ngIf="isLoggedIn"
          class="highlighted-border btn btn-primary"
          (click)="handleLogout()"
        >
          Logout
        </button>
      </div>
    </header>

    <div class="i">
      <div class="i-left"></div>
      <div class="i-middle">
        <nav class="nav-div" *ngIf="isLoggedIn">
          <h3 *ngIf="firstname" class="welcome-user">
            <i>hi, {{ firstname }}</i>
          </h3>
          <div class="only-buttons">
            <a [routerLink]="['', 'give']"
              ><button
                (click)="giveClicked()"
                class="main-buttons"
                [ngClass]="{
                  'main-buttons-small': type === 'recieve'
                }"
              >
                Provide
              </button></a
            >
            <a [routerLink]="['', 'recieve']"
              ><button
                class="main-buttons"
                (click)="recieveClicked()"
                [ngClass]="{
                  'main-buttons-small': type === 'give'
                }"
              >
                Request
              </button></a
            >
          </div>
        </nav>
      </div>
      <div class="i-right">
        <a [routerLink]="['', 'users']"
          ><button
            *ngIf="isLoggedIn"
            class="btn btn-primary btn-lg showUsersBtn"
          >
            Show Users
          </button></a
        >
      </div>
    </div>
    <!-- <footer>copy right</footer> -->

    <router-outlet></router-outlet>
  `,
  styles: [
    `
      .welcome-user {
        margin-bottom: 20px;
      }
      .only-buttons {
        margin-top: 50px;
      }
      .i {
        display: flex;
        height: 30vh;
        /* margin-bottom: 50px; */
      }
      .i-middle {
        flex: 2;
        text-align: center;
      }
      .i-right {
        flex: 1;
        text-align: left;

        /* padding-left: 100px; */
        padding-top: 120px;
      }
      .profilePic {
        width: 50px;
        border-radius: 50%;
      }
      .showUsersBtn {
        margin-left: 30px;
      }
    `,
  ],
})
export class AppComponent implements DoCheck, AfterContentChecked {
  clicked = false;
  type!: string;
  selectedService = true;
  isLoggedIn = false;
  title = 'give-recieve-service-app-Frontend';
  firstname!: string;
  email!: string;

  constructor(private auth: AuthService) {
    // if(token){
    //   let myPayload = this.parseJwt(token);
    //   this.firstname = myPayload.firstname;
    //   if (token) {
    //     localStorage.setItem('payload', JSON.stringify(myPayload));
    //   }
    // }
  }
  parseJwt(token: any) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );

    return JSON.parse(jsonPayload);
  }

  handleLogout() {
    this.isLoggedIn = false;
    this.auth.logout();
    this.firstname = '';
    this.type = '';
  }
  giveClicked() {
    this.type = 'give';
  }
  recieveClicked() {
    this.type = 'recieve';
  }
  showProfile() {}
  ngDoCheck() {
    let logStatus = localStorage.getItem('isLoggedIn');
    if (logStatus === 'true') {
      this.isLoggedIn = true;
    }
    if (!this.firstname) {
      let token: any = localStorage.getItem('token');
      if (token) {
        let myPayload: any = jwt_decode(token);
        this.firstname = myPayload.firstname;
        this.email = myPayload.email;
        localStorage.setItem('payload', JSON.stringify(myPayload));
        // console.log(myPayload);
      }
    }
  }
  ngAfterContentChecked() {
    let token: any = localStorage.getItem('token');
    if (!token) {
      this.isLoggedIn = false;

      this.firstname = '';
      this.type = '';
    }
  }
}
