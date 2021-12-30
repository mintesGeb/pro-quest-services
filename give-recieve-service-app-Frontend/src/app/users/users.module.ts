import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyusersComponent } from './myusers.component';
import { MyuserComponent } from './myuser.component';
import { EditUserComponent } from './edit-user.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    MyusersComponent,
    MyuserComponent,
    EditUserComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {path:"",component:MyusersComponent},
      {path:"profile/:email",component:MyuserComponent},
      {path:'edit-profile/:email',component:EditUserComponent}
    ])
  ],
})
export class UsersModule { }
