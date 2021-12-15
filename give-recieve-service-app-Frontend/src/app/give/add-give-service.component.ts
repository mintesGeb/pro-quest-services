import { Observable } from 'rxjs';
import { GivenServiceService } from './given-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-give-service',
  template: `
    <div class="i">
      <div class="i-left"></div>
      <div class="i-middle">
        <!-- <form [formGroup]="addServiceForm" (ngSubmit)="onSubmit()">
          <input
            type="text"
            class="form-control"
            placeholder="Firstname"
            formControlName="firstname"
          />
          <input
            type="text"
            class="form-control"
            
            placeholder="Lastname"
            formControlName="lastname"
          />

          <div formGroupName="services">
            <input
              type="text"
              class="form-control"
              placeholder="Title"
              formControlName="title"
            />

            <input
              type="text"
              class="form-control"
              placeholder="Detail"
              formControlName="detail"
            />
            <label for=""> Catagory: </label>

            <select
            class="form-control"
              formControlName="catagory"
              (change)="selectCatagory($event)"
            >
              <option *ngFor="let c of catagories" [ngValue]="c">
                {{ c }}
              </option>
            </select>
          </div>
          <input
            type="text"
            class="form-control"
            placeholder="HourlyCharge"
            formControlName="hourlyPayment"
          />

          <button type="submit" class="btn btn-primary">Submit</button>
        </form> -->
        <h1>{{ title }}</h1>
        <form [formGroup]="addServiceForm" (ngSubmit)="onSubmit()">
          <input
            class="form-control"
            formControlName="firstname"
            placeholder="firstname"
          />
          <input
            class="form-control"
            formControlName="lastname"
            placeholder="lastname"
          />
          <div formGroupName="service">
            <span
              *ngIf="
                addServiceForm.get('service')?.touched &&
                !addServiceForm.get('service')?.valid
              "
              >All service fields are required</span
            >
            <input
              class="form-control"
              formControlName="title"
              placeholder="title"
            />

            <textarea
              class="form-control"
              formControlName="detail"
              placeholder="detail"
            ></textarea>

            <label class="form-control category" for=""> Catagory: </label>

            <select
              class="form-control"
              formControlName="catagory"
              (change)="selectCatagory($event)"
            >
              <option
                *ngFor="let c of catagories; let i = index"
                [ngValue]="c"
                placeholder="food"
              >
                {{ c }}
              </option>
            </select>
            <span
              *ngIf="
                addServiceForm.get('service')?.touched &&
                !addServiceForm.get('service')?.valid
              "
              >-------------------</span
            >
          </div>
          <input
            class="form-control"
            formControlName="hourlyPayment"
            placeholder="hourlyPayment"
          />
          <span
            *ngIf="
              addServiceForm.get('hourlyPayment')?.touched &&
              !addServiceForm.get('hourlyPayment')?.valid
            "
            >This field is required</span
          ><br />
          <button class="general-margin btn btn-primary btn-lg">Submit</button>
        </form>
      </div>
      <div class="i-right"></div>
    </div>
  `,
  styles: [
    `
      .category {
        border: none;
      }
      .i {
        display: flex;
        height: 50vh;
      }
      .i-right {
        flex: 1;
        align-items: center;
        justify-content: center;
      }
      .i-middle {
        flex: 1;
        align-items: center;
        justify-content: center;
        text-align: center;
      }
      .i-left {
        flex: 1;
        align-items: center;
        justify-content: center;
      }
      span {
        color: red;
      }
    `,
  ],
})
export class AddGiveServiceComponent implements OnInit {
  city!:string;
  user!: any;
  title!: string;
  addServiceForm!: FormGroup;
  serviceType!: string;
  service!: any;
  catagories: string[] = [
    'food',
    'hygine',
    'pets',
    'entertainment',
    'religion',
    'education',
  ];
  geoLocation = { coords: {}, timestamp: '' };
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private ar: ActivatedRoute,
    private provide: GivenServiceService
  ) {
    this.ar.paramMap.subscribe((params: any) => {
      this.serviceType = params.get('type');
      console.log(this.serviceType);
      const extras: any = this.router.getCurrentNavigation()?.extras;
      if (extras) {
        this.service = extras['state']['data'];
        this.title = extras['state']['msg'];
        console.log(this.service, this.title);
      }
    });
    let payload: any = localStorage.getItem('payload');
    this.user = JSON.parse(payload);
    console.log(this.user);
  }
  initializeForm() {
    this.addServiceForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      service: this.fb.group({
        title: ['', Validators.required],
        detail: ['', Validators.required],
        catagory: ['', Validators.required],
      }),
      type: this.serviceType,
      hourlyPayment: ['', Validators.required],
    });
    if (this.user) {
      this.addServiceForm.get('firstname')?.setValue(this.user.firstname);
      this.addServiceForm.get('lastname')?.setValue(this.user.lastname);
      this.addServiceForm.get('firstname')?.disable();
      this.addServiceForm.get('lastname')?.disable();
    }
    if (this.service) {
      this.addServiceForm.get('firstname')?.setValue(this.service.firstname);
      this.addServiceForm.get('lastname')?.setValue(this.service.lastname);
      this.addServiceForm.get('service')?.setValue(this.service.service);
      this.addServiceForm
        .get('hourlyPayment')
        ?.setValue(this.service.hourlyPayment);
    }
  }
  selectCatagory(e: any) {
    this.addServiceForm.patchValue({
      catagory: e.target.value,
    });
  }

  onSubmit() {
    console.log(this.addServiceForm.value);
    let myData = this.addServiceForm.value;
    if (!myData.firstname) {
      myData.firstname = this.user.firstname;
      myData.lastname = this.user.lastname;
    }
    let sendRequest;
    if (this.title.includes('Add')) {
      console.log('add');
      sendRequest = this.provide.addService(
        this.user._id,
        { ...myData, location: {...this.geoLocation, city:this.city} },
        this.serviceType + 'd'
      );
    } else {
      console.log('edit');
      sendRequest = this.provide.updateService(this.service._id, {
        ...myData,
        location: this.geoLocation,
      });
    }
    sendRequest.subscribe((data: any) => {
      console.log(data);
      if (data.success) {
        this.router.navigate([
          '',
          this.serviceType === 'provide' ? 'give' : 'recieve',
        ]);
      }
    });

    console.log(this.geoLocation);
    this.user = null;
  }
  getCity() {
    let lat = localStorage.getItem('latitude');
    let lng = localStorage.getItem('longitude');
 
let url='http://mapquestapi.com/geocoding/v1/reverse?key=q5N7YWFQnHlQCfx0KyD5d1qoATAAFezV&location='+lat+','+lng;
    this.provide.getCity(url).subscribe((data:any)=>{
      this.city=(data.results[0].locations[0].adminArea5);
    })
    
  }
  fetchLocation() {
    let x = navigator.geolocation.getCurrentPosition(
      function (x: any) {
        alert('Location accessed');
        console.log(x);

        localStorage.setItem('latitude', x.coords.latitude);
        localStorage.setItem('longitude', x.coords.longitude);
        localStorage.setItem('timestamp', x.timestamp);
      },
      function () {
        alert('User not allowed');
      },
      { timeout: 10000 }
    );
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
    this.initializeForm();
    this.fetchLocation();
    this.getCity();
  }
}
