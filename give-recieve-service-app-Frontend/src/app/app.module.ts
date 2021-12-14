import { LoginGuard } from './login.guard';
import { ManageHeaderInterceptor } from './manage-header.interceptor';
import { AddGiveServiceComponent } from './give/add-give-service.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomeComponent } from './home.component';
import {HttpClientModule, HTTP_INTERCEPTORS} from "@angular/common/http"
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SignupComponent } from './signup.component';
import { LoginComponent } from './login.component';
import { CatagoryPipe } from './catagory.pipe';
import { UsersComponent } from './users.component';
// import  {AgmCoreModule} from '@agm/core'

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SignupComponent,
    LoginComponent,
    CatagoryPipe,
    UsersComponent,
  ],
  imports: [
    // AgmCoreModule,
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {path:"",component:HomeComponent},
      {path:"home", redirectTo:""},
      {path:"login",component:LoginComponent},
      {path:"signup",component:SignupComponent},
      {path:"add-service/:type",component:AddGiveServiceComponent},
      {path:"update-service/:type",component:AddGiveServiceComponent},
      // {path:"users", component:UsersComponent},
      {path:"give", loadChildren:()=>import ("./give/give.module").then(m=>m.GiveModule),canActivate:[LoginGuard]},
      {path:"recieve", loadChildren:()=>import ("./recieve/recieve.module").then(m=>m.RecieveModule),canActivate:[LoginGuard]},
      {path:"users", loadChildren:()=>import("./users/users.module").then(m=>m.UsersModule), canActivate:[LoginGuard]}

    ])
  ],
  providers: [{provide:HTTP_INTERCEPTORS, useClass:ManageHeaderInterceptor,multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
