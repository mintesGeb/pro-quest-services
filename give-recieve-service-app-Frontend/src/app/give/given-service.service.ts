import { HttpClient } from '@angular/common/http';
import { ThrowStmt } from '@angular/compiler';
import { Injectable } from '@angular/core';
import axios from "axios";

@Injectable({
  providedIn: 'root',
})
export class GivenServiceService {
  baseURL = 'http://localhost:1211/services/';

  constructor(private client: HttpClient) {}

  getCity(url: any) {
    return this.client.get(url);
    //  axios.get(url).then(data=>{
    //   return(data.data.results[0].locations[0].adminArea5);
    // })
  }

  getAllProvideServices(city:string,data: number = 1) {
    return this.client.get(this.baseURL + 'provide' + '?page=' + data+"&city="+city);
  }
  postComment(id: any, data: any) {
    return this.client.post(this.baseURL + id + '/comment', data);
  }
  getAllRequestServices(data: number = 1) {
    return this.client.get(this.baseURL + 'request' + '?page=' + data);
  }
  getCourseById(id: any) {
    return this.client.get(this.baseURL + id);
  }
  addService(id: any, data: any, type: string) {
    // console.log(data);
    return this.client.post(this.baseURL + id + '?type=' + type, data);
  }
  deleteById(id: any) {
    return this.client.delete(this.baseURL + id);
  }
  updateService(id: any, data: any) {
    return this.client.put(this.baseURL + id, data);
  }
  updateUserAndService(userId: any, sid: any, data: any) {
    return this.client.put(
      this.baseURL + userId + '/' + sid + '?type=accepted',
      data
    );
  }
}
