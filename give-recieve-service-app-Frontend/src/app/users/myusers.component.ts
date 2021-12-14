import { UsersService } from './users.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-myusers',
  template: `
    <div class="i">
      <div class="i-left"></div>
      <div class="i-middle">
      <h1>Service Users</h1>
      <a *ngFor="let user of users" [routerLink]="['', 'users', 'profile', user.email]">
      <h4 >
          {{ user.firstname }} {{ user.lastname }}
        </h4>
      </a>
        
        <!-- <a [routerLink]="['', 'users', 'profile', 'email']">User</a> -->
      </div>
      <div class="i-right"></div>
    </div>

    <router-outlet></router-outlet>
  `,
  styles: [],
})
export class MyusersComponent implements OnInit {
  users!: any;

  constructor(private userManager: UsersService) {
    userManager.getAllUsers().subscribe((users: any) => {
      this.users = users.data;
    });
  }

  ngOnInit(): void {}
}
