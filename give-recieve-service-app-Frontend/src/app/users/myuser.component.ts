import { GivenServiceService } from './../give/given-service.service';
import { UsersService } from './users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, DoCheck, OnInit } from '@angular/core';

@Component({
  selector: 'app-myuser',
  template: `
    <div class="i">
      <div class="i-left">
        <div class="checkUser" *ngIf="isCreator">
          <button class=" btn btn-primary btn-lg" (click)="editUser()">
            Edit</button
          ><br />
          <button
            class="general-margin btn btn-primary btn-lg"
            (click)="deleteUser()"
          >
            Delete
          </button>
        </div>
        
      </div>
      <div class="i-middle">
        <div>
          

          Fullname:
          <h3 class="userInfo">{{ myuser.firstname }} {{ myuser.lastname }}</h3>
          Email:
          <h4 class="userInfo">{{ myuser.email }}</h4>
          Phone:
          <h4 class="userInfo">{{ myuser.phone }}</h4>
        </div>
      </div>
      <div class="i-right">
      <button class="general-margin btn btn basic" (click)="showServices()">My Services</button>
      <button class="btn btn basic" (click)="showRequests()">My Requests</button>
      <div *ngIf="showingServices">
        <div *ngFor="let ser of myServices">

          <p>{{ser.service.title}}</p>
        </div>

      </div>
      <div *ngIf="showingRequests">
        <p>Showing Rquests</p>
      </div>
      </div>
    </div>
  `,
  styles: [
    `
      .userInfo {
        color: #14279b;
      }
      .i{
        height:200px
      }
    `,
  ],
})
export class MyuserComponent implements OnInit, DoCheck {
  isCreator!: boolean;
  email!: string;
  myuser!: any;
  user!: any;
  edittedData!: any;
  showingServices=false
  showingRequests=false
  myUserProvided!:any;
  myUserRequested!:any;
  myServices!:any[]
  myRequests!:any[]

  showServices(){
    this.showingServices=true;
  this.showingRequests=false;
  // console.log (this.myuser.provided)
  this.myuser.provided.forEach((id:any) => {
    console.log(id);
    
    this.service.getCourseById(id).subscribe((serv:any)=>{
      if(serv.data){
        console.log(serv.data);
        this.myServices=[...this.myServices,(serv.data)]
      }
    })

  });
  console.log(this.myServices);

  }
  showRequests(){
    this.showingServices=false
    this.showingRequests=true
    console.log (this.myuser.requested)
  }

  constructor(
    private ar: ActivatedRoute,
    private userManager: UsersService,
    private router: Router,
    private service: GivenServiceService
  ) {
    this.ar.paramMap.subscribe((params: any) => {
      this.email = params.get('email');
      console.log(this.email);
    });
  }

  deleteUser() {
    let confirm = prompt('Are you sure? Type "yes" to confirm');
    console.log(confirm);
    if (confirm === 'yes') {
      this.userManager.deleteUser(this.email).subscribe((deleted: any) => {
        if (deleted.success) {
          this.router.navigate(['']);
        }
      });
    }
  }
  editUser() {
    this.router.navigate(['', 'users', 'edit-profile', this.email], {
      state: this.myuser,
    });
  }

  ngOnInit(): void {
    this.isCreator = false;

    let payload: any = localStorage.getItem('payload');
    this.user = JSON.parse(payload);

    this.userManager.getByEmail(this.email).subscribe((myUser: any) => {
      this.myuser = myUser.data;
      console.log(myUser.data);

      if (
        this.myuser.firstname === this.user.firstname &&
        this.myuser.lastname === this.user.lastname
      ) {
        this.isCreator = true;
      }
    });
console.log(this.myuser.provided);
    this.myuser.provided.forEach((id:any) => {
      console.log(id);
      
      // this.service.getCourseById(id).subscribe((serv:any)=>{
      //   console.log(serv.data)
      // })
    });
  }

  ngDoCheck() {
    if (
      this.myuser.firstname !== this.user.firstname ||
      this.myuser.lastname !== this.user.lastname
    ) {
      this.isCreator = false;
    }
  }
}
