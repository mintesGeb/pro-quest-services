import { GivenServiceService } from './give/given-service.service';
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
  constructor(private gs:GivenServiceService) {

  }
  getlocation (){
    let gs =this.gs
    let key = 'HkNMLlrytjUgy3XYLEdlIdKA09yvLFLH';
    
    navigator.geolocation.getCurrentPosition((x:any)=>{
      localStorage.setItem('latitude', x.coords.latitude);
      localStorage.setItem('longitude', x.coords.longitude);
        localStorage.setItem('timestamp', x.timestamp);

      gs.getCity('http://mapquestapi.com/geocoding/v1/reverse?key=' +
      key+
      '&location=' +x.coords.latitude +
      ',' +x.coords.longitude).subscribe((data: any) => {
        localStorage.setItem('city', (data.results[0].locations[0].adminArea5));
      });
        
    })
  }

  ngOnInit(): void {
    this.getlocation ()
    let check = localStorage.getItem('isLoggedIn');
    if (check === 'true') {
      this.isLoggedIn = true;
    }
  }
}
