import { HttpClient } from '@angular/common/http';
import { ThrowStmt } from '@angular/compiler';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GivenServiceService {
  baseURL = 'http://localhost:1211/services/';

  constructor(private client: HttpClient) {}

  getAllProvideServices(data:number=1) {
    return this.client.get(this.baseURL + 'provide' + '?page='+data);
  }
  postComment(id: any, data: any) {
    return this.client.post(this.baseURL + id + '/comment', data);
  }
  getAllRequestServices(data:number=1) {
    return this.client.get(this.baseURL + 'request' + '?page='+data);
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
