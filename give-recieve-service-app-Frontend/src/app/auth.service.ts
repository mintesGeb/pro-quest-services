import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl: string = 'http://localhost:1211/users/';

  constructor(private router: Router, private client: HttpClient) {}
  login(cred: { email: string; password: string }) {
    return this.client.post(this.baseUrl + 'login', cred);

    //process login and route to another comp
  }
  logout() {
    // localStorage.removeItem("token");
    // localStorage.removeItem("payload");
    // localStorage.removeItem("isLoggedIn")
    // localStorage.removeItem("timestamp")
    // localStorage.removeItem("isLoggedIn")
    localStorage.clear();
    // route home
    this.router.navigate(['']);
  }
  signup(userInfo: any) {
    return this.client.post(this.baseUrl+"signup",userInfo) 
    
  }
}
