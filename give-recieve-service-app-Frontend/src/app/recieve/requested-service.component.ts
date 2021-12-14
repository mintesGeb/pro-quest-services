import { GivenServiceService } from './../give/given-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, DoCheck, OnInit } from '@angular/core';
declare const L: any;
@Component({
  selector: 'app-requested-service',
  template: `
    <div class="i">
      <div class="i-left">
        <div class="checkUser" *ngIf="isCreator">
          <button class="circle-button btn btn-primary" (click)="editClicked()">
            Edit</button
          ><br />
          <button
            class="general-margin circle-button btn btn-primary"
            (click)="removeService()"
          >
            Delete
          </button>
        </div>
        <div id="map">hi</div>
      </div>
      <div class="i-middle">
        <div class="service-detail">

        
        <div
          class="deco-lone"
          [ngClass]="{
            'catagory-marker-yellow': service.service.catagory === 'food',
            'catagory-marker-blue': service.service.catagory === 'hygine',
            'catagory-marker-red': service.service.catagory === 'pets',
            'catagory-marker-green':
              service.service.catagory === 'entertainment',
            'catagory-marker-purple': service.service.catagory === 'religion',
            'catagory-marker-grey': service.service.catagory === 'education'
          }"
        >
          {{ service.service.catagory | catagory }}
        </div >
        <h3 class="title">{{ service.service.title }}</h3>

        <p class="sub-title">{{ service.service.detail }}</p>
        $ <span class="h3">{{ service.hourlyPayment }}</span> per hour by
        <a
          ><p class="author">
            {{ service.firstname }} {{ service.lastname }}
          </p></a
        >
        <p>{{ service.createdAt | date: 'medium' }}</p>
        </div>
        <div class="comments" (click)="showComments = !showComments">
          Comments
        </div>
        <div *ngIf="showComments" class="commentContainer">
          <div *ngFor="let comment of comments">
            <div class="eachComment">
              <a> {{ comment.firstname }} {{ comment.lastname }} </a>
              <p>
                {{ comment.comment }}
              </p>
            </div>
          </div>
          <div>
            <input
              class="commentInput"
              type="text"
              (keyup)="commenting($event)"
            /><br />
            <button class="btn btn-primary" (click)="postComment()">
              Comment
            </button>
          </div>
        </div>
      </div>
      <div class="i-right">
        <div *ngIf="!isCreator">
          <button
            *ngIf="!service.fulfilled"
            class="btn btn-primary circle-button acceptoffer"
            (click)="acceptOffer()"
          >
            Accept
          </button>
          <button
            *ngIf="service.fulfilled"
            class="btn btn-primary circle-button fulfilledoffer"
            (click)="fulfilledOffer()"
          >
            Fulfilled
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
    .service-detail{
      backgroundColor:#EEEBDD
    }

      #map {
        width: 80%;
        height: 80%;
      }
    `,
  ],
})
export class RequestedServiceComponent implements OnInit, DoCheck {
  isCreator!: boolean;
  user!: any;
  showComments = false;
  id: any;
  service!: any;
  comments: any;
  newComment: any;
  title = 'Update a Service';

  commenting(e: any) {
    this.newComment = e.target.value;
  }
  postComment() {
    let payload: any = localStorage.getItem('payload');
    let userData = JSON.parse(payload);
    let myData = {
      firstname: userData.firstname,
      lastname: userData.lastname,
      comment: this.newComment,
    };
    this.comments.push(myData);
    this.receive.postComment(this.id, myData).subscribe((data) => {
      console.log(data);
    });
  }

  editClicked() {
    this.router.navigate(['', 'update-service', 'request'], {
      state: { data: this.service, msg: this.title },
    });
  }

  constructor(
    private ar: ActivatedRoute,
    private receive: GivenServiceService,
    private router: Router
  ) {
    this.ar.paramMap.subscribe((params: any) => {
      this.id = params.get('id');

      this.receive.getCourseById(params.get('id')).subscribe((service: any) => {
        this.service = service.data;
        this.comments = this.service.comment;

        this.showMap(this.service);
        if (
          this.service.firstname === this.user.firstname &&
          this.service.lastname === this.user.lastname
        ) {
          this.isCreator = true;
        }
      });
    });
  }
  showMap(service: any) {
    let coords = service.location.coords;
    let myMap = L.map('map').setView([coords.latitude, coords.longitude], 13);

    L.tileLayer(
      'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWludGVzNCIsImEiOiJja3g2Y2htdDcya3ZqMnZwMnZ6ZnJtcXZjIn0.rI21ie3tyJCsjxxxoNLO1g',
      {
        attribution:
          'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'your.mapbox.access.token',
      }
    ).addTo(myMap);

    let marker = L.marker([coords.latitude, coords.longitude]).addTo(myMap);

    marker
      .bindPopup(
        `<b>${service.service.title}</b><br>by <b>${service.firstname}</b>`
      )
      .openPopup();

    let myPopup = L.popup()
      .setLatLng([coords.latitude, coords.longitude])
      .setContent(`${service.service.title} by <b>${service.firstname}</b>`)
      .openOn(myMap);
  }

  removeService() {
    let confirm = prompt('Are you sure? Type "yes" to confirm');
    console.log(confirm);
    if (confirm === 'yes') {
      this.receive.deleteById(this.id).subscribe((ser: any) => {
        if (ser.success) {
          this.router.navigate(['', 'recieve']);
        }
      });
    }
  }
  acceptOffer() {
    this.receive
      .updateUserAndService(this.user._id, this.service._id, {})
      .subscribe((data: any) => {
        console.log(data);
      });
    this.service.fulfilled = true;
    console.log('accepted offer');
  }
  fulfilledOffer() {
    console.log('fulfilled offer');
  }

  ngOnInit(): void {
    this.isCreator = false;

    let payload: any = localStorage.getItem('payload');
    this.user = JSON.parse(payload);
  }
  ngDoCheck() {
    // console.log(
    //   this.service.firstname !== this.user.firstname &&
    //     this.service.lastname !== this.user.lastname
    // );
    if (
      this.service.firstname !== this.user.firstname ||
      this.service.lastname !== this.user.lastname
    ) {
      this.isCreator = false;
    }
    console.log(this.service.fulfilled);
  }
}
