
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GivenServicesComponent } from './given-services.component';
import { GivenServiceComponent } from './given-service.component';
import { RouterModule } from '@angular/router';
import { AddGiveServiceComponent } from './add-give-service.component';
import { RecieveModule } from '../recieve/recieve.module';
import { CatagoryPipe } from './catagory.pipe';

@NgModule({
  declarations: [
    GivenServicesComponent,
    GivenServiceComponent,
    AddGiveServiceComponent,
    CatagoryPipe,
    

  ],
  imports: [
   
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: '', component: GivenServicesComponent },
      { path: 'service/:id', component: GivenServiceComponent },
      // { path: 'add-service/:type', component: AddGiveServiceComponent },
    ]),
  ],
})
export class GiveModule {}
