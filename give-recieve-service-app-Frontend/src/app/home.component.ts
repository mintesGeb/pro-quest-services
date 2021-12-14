import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  template: `
    <!-- <p>
      home works!
    </p> -->
    <img *ngIf="isLoggedIn" src="assets/images/service.jpg" alt="" />
    <div class="i">
      <div class="i-left"></div>
      <div class="i-middle">
        <h1>Welcome Home</h1>
        <h3 *ngIf="!isLoggedIn">
          Please <b>login</b> or <b>Signup</b> to use our services
        </h3>
      </div>
      <div class="i-right"></div>
    </div>
   
  `,
  styles: [
    `
      img {
        width: 100%;
      }
      .i {
        height: 200px;
      }
    `,
  ],
})
export class HomeComponent implements OnInit {
  isLoggedIn!: boolean;
  constructor() {}

  ngOnInit(): void {
    let check = localStorage.getItem('isLoggedIn');
    if (check === 'true') {
      this.isLoggedIn = true;
    }
  }
}
