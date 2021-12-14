import { Router } from '@angular/router';
import { GivenServiceService } from './../give/given-service.service';
import { Component, OnInit } from '@angular/core';

declare const L: any;

@Component({
  selector: 'app-requested-services',
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
              'each-accepted': s.fulfilled,
              'each-expired': s.expired
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
                'each-accepted': s.fulfilled,
                'each-expired': s.expired
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

    <!-- <a [routerLink]="['', 'recieve', 'service']">Service</a> -->
    <router-outlet></router-outlet>
  `,
  styles: [
    `
      #map {
        width: 100%;
        height: 90%;
      }
    `,
  ],
})
export class RequestedServicesComponent implements OnInit {
  page!: number;
  services!: any;

  isSearching!: boolean;
  searchResult!: any;
  constructor(private recieve: GivenServiceService, private router: Router) {}

  handleClick(s: any) {
    console.log(s);
    this.router.navigate(['', 'recieve', 'service', s._id]);
  }

  addService() {
    this.router.navigate(['', 'add-service', 'request'], {
      state: { msg: 'Add a Service' },
    });
  }
  searching(e: any) {
    this.isSearching = true;
    this.searchResult = this.services.filter((ser: any) =>
      ser.service.title.toLowerCase().includes(e.target.value.toLowerCase())
    );

    if (!e.target.value) {
      this.isSearching = false;
    }
  }
  previousGroup() {
    if (this.page > 1) {
      this.recieve
        .getAllRequestServices(this.page - 1)
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
      this.recieve
        .getAllRequestServices(this.page + 1)
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
  showMap(service: any) {
    let coords = service.location.coords;
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

    let marker = L.marker([coords.latitude, coords.longitude]).addTo(map);

    marker
      .bindPopup(
        `<b>${service.service.title}</b><br>by <b>${service.firstname}</b>`
      )
      .openPopup();

    let myPopup = L.popup()
      .setLatLng([coords.latitude, coords.longitude])
      .setContent(`${service.service.title} by <b>${service.firstname}</b>`)
      .openOn(map);
  }
  checkDate(service: any) {
    let today: any = new Date();
    let dateCreated: any = new Date(service.createdAt);
    let diffInMilliSec = Math.abs(today - dateCreated) / 1000;
    let days = Math.floor(diffInMilliSec / 86400);
    if (days > 2) {
      console.log(service.service.title, service._id);
      service.expired = true;
    } else service.expired = false;
  }

  ngOnInit(): void {
    this.recieve.getAllRequestServices().subscribe((services: any) => {
      this.services = services.data;
      this.page = 1;
      console.log(this.services);
      this.services.forEach((service: any) => {
        this.showMap(service);
      });
    });
  }
}
