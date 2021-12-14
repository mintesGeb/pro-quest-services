import { CatagoryPipe } from './catagory.pipe';
import { AddGiveServiceComponent } from './../give/add-give-service.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestedServiceComponent } from './requested-service.component';
import { RequestedServicesComponent } from './requested-services.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    RequestedServiceComponent,
    RequestedServicesComponent,
    CatagoryPipe
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path:"",component:RequestedServicesComponent},
      {path:"service/:id", component:RequestedServiceComponent},
  ])]
})
export class RecieveModule { }
