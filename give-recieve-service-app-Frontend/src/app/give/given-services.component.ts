import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { GivenServiceService } from './given-service.service';
import { Component, DoCheck, OnInit } from '@angular/core';
declare const L: any;

// import { Loader } from "@googlemaps/js-api-loader"
// declare var google:any;

@Component({
  selector: 'app-given-services',
  template: `
    <div class="i">
      <div class="i-left">
        <button class="circle-button btn btn-primary" (click)="addService()">
          +</button
        ><br />

        <button class="prevBtn btn btn-basic btn-lg" (click)="previousGroup()">
          << Previous
        </button>
      </div>
      <div class="i-middle" *ngIf="!isSearching; else search">
        <div class="each" *ngFor="let s of services">
          <div
            *ngIf="!s.expired"
            [ngClass]="{
              'each-expired': s.expired,
              'each-accepted': s.fulfilled
            }"
          >
            <div (click)="handleClick(s)">
              <h3 class="title">{{ s.service.title }}</h3>

              by
              <p class="sub-title">{{ s.firstname }} {{ s.lastname }}</p>
              <p>{{ s.createdAt | date: 'medium' }}</p>
            </div>
            <div
              [ngClass]="{
                'catagory-marker-yellow': s.service.catagory === 'food',
                'catagory-marker-blue': s.service.catagory === 'hygine',
                'catagory-marker-red': s.service.catagory === 'pets',
                'catagory-marker-green': s.service.catagory === 'entertainment',
                'catagory-marker-purple': s.service.catagory === 'religion',
                'catagory-marker-grey': s.service.catagory === 'education'
              }"
            ></div>
          </div>
        </div>
      </div>
      <ng-template #search>
        <div class="i-middle">
          <div class="each" *ngFor="let s of searchResult">
            <div
              *ngIf="!s.expired"
              [ngClass]="{
                'each-expired': s.expired,
                'each-accepted': s.fulfilled
              }"
            >
              <div (click)="handleClick(s)">
                <h3 class="title">{{ s.service.title }}</h3>

                by
                <p class="sub-title">{{ s.firstname }} {{ s.lastname }}</p>
                <p>{{ s.createdAt | date: 'medium' }}</p>
              </div>
              <div
                [ngClass]="{
                  'catagory-marker-yellow': s.service.catagory === 'food',
                  'catagory-marker-blue': s.service.catagory === 'hygine',
                  'catagory-marker-red': s.service.catagory === 'pets',
                  'catagory-marker-green':
                    s.service.catagory === 'entertainment',
                  'catagory-marker-purple': s.service.catagory === 'religion',
                  'catagory-marker-grey': s.service.catagory === 'education'
                }"
              ></div>
            </div>
          </div>
        </div>
      </ng-template>
      <div class="i-right">
        <input
          class="input form-control form-control-sm"
          placeholder="search service"
          (keyup)="searching($event)"
        />
        <button class="nextBtn btn btn-basic btn-lg" (click)="nextGroup()">
          Next >>
        </button>
        <div id="map"></div>
      </div>
    </div>
    <!-- <a [routerLink]="['', 'give', 'service','id']">Service</a> -->
    <router-outlet></router-outlet>
  `,
  styles: [
    `
      #map {
        width: 100%;
        height: 70%;
      }
    `,
  ],
})
export class GivenServicesComponent implements OnInit, DoCheck {
  services!: any[];
  dateNow = new Date();
  page!: number;
  searchResult!: any;
  isSearching!: boolean;
  geoLocation!: any;
  city!: any;

  constructor(
    private provide: GivenServiceService,
    private router: Router,
    private client: HttpClient
  ) {
    this.city = localStorage.getItem("city")
  }

  searching(e: any) {
    console.log(e.target.value);
    this.isSearching = true;
    this.searchResult = this.services.filter(
      (ser) =>
        (this.searchResult = ser.service.title
          .toLowerCase()
          .includes(e.target.value.toLowerCase()))
    );
    console.log(this.searchResult);
    if (!e.target.value) {
      this.isSearching = false;
    }
  }

  checkLocation(position: { coords: { latitude: string; longitude: string } }) {
    // navigator.geolocation.watchPosition()
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    console.log(lat, lon);
    // this.displayLocation(lat, lon);
  }

  displayLocation(latitude: string, longitude: string) {
    // console.log(latitude,longitude);
  }

  showMap(service: any) {
    let coords = service[0].location.coords;
    let map = L.map('map').setView([coords.latitude, coords.longitude], 13);

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
    ).addTo(map);

    service.forEach((element: any) => {
      let mycoords = element.location.coords;

      let marker = L.marker([mycoords.latitude, mycoords.longitude]).addTo(map);

      marker.bindPopup(`<b>${element.service.title}</b><br>`).openPopup();
    });
  }
  previousGroup() {
    if (this.page > 1) {
      this.provide
        .getAllProvideServices(this.city, this.page - 1)
        .subscribe((services: any) => {
          this.services = services.data;
          this.services.forEach((service: any) => {
            this.checkDate(service);
          });
          this.page--;
        });
    }
  }
  nextGroup() {
    if (this.page >= 1) {
      this.provide
        .getAllProvideServices(this.city, this.page + 1)
        .subscribe((services: any) => {
          if (services.data) {
            this.services = services.data;
            this.services.forEach((service: any) => {
              this.checkDate(service);
            });
          }
          this.page++;
        });
    }
  }

  handleClick(s: any) {
    console.log(s);
    this.router.navigate(['', 'give', 'service', s._id]);
  }

  addService() {
    this.router.navigate(['', 'add-service', 'provide'], {
      state: { msg: 'Add a Service' },
    });
  }

  checkDate(service: any) {
    let today: any = new Date();
    let dateCreated: any = new Date(service.createdAt);
    let diffInMilliSec = Math.abs(today - dateCreated) / 1000;
    let days = Math.floor(diffInMilliSec / 86400);
    if (days > 2) {
      service.expired = true;
      console.log(service.service.title, service._id);
    }
  }
  getCity() {
    let lat = localStorage.getItem('latitude');
    let lng = localStorage.getItem('longitude');
    let key = 'HkNMLlrytjUgy3XYLEdlIdKA09yvLFLH';

    let url =
      'http://mapquestapi.com/geocoding/v1/reverse?key=' +
      key +
      '&location=' +
      lat +
      ',' +
      lng;

    this.provide.getCity(url).subscribe((data: any) => {
      localStorage.setItem('city', JSON.stringify(data.results[0].locations[0].adminArea5));
    });
    let city:any=localStorage.getItem('city');
    this.city = JSON.parse(city)
  }

  fetchLocation() {
    let myLocation: any = {
      coords: {
        latitude: localStorage.getItem('latitude'),
        longitude: localStorage.getItem('longitude'),
      },
      timestamp: localStorage.getItem('timestamp'),
    };
    this.geoLocation = { ...myLocation };
  }

  ngOnInit(): void {
    // this.fetchLocation();

    console.log(this.city);
    this.provide.getAllProvideServices(this.city).subscribe((services: any) => {
      console.log(services.data);

      this.services = services.data;
      this.page = 1;

      // this.showMap(this.services);
      this.services.forEach((service: any) => {
        // this.checkLocation(service.location);
        this.checkDate(service);
      });
    });
  }
  ngDoCheck() {}
}
