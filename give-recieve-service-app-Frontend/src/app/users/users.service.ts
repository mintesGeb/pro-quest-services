import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  baseURL="http://localhost:1211/api/users/"

  constructor(private client :HttpClient) {

   }
   getAllUsers(){
     return this.client.get(this.baseURL)
   }
   getByEmail(email:string){
    return this.client.get(this.baseURL+email)
   }
   deleteUser(email:string){
    return this.client.delete(this.baseURL+email)
   }
   updateUser(email:string, data:any){
    return this.client.put(this.baseURL+email,data)
   }
  
}
