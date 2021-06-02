import { Injectable } from '@angular/core';
import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employee } from './employee';
const headers = { 'content-type': 'application/json' }  
@Injectable({
  providedIn: 'root'
})
export class DataService {
  url: string;
  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
    this.url = baseUrl + 'api/Employees'
  }
  getTableData() {
    return this.http.get(this.url);
  }
  getDataById(id: any) {
    return this.http.get(this.url+"/"+id);
  }
  addData(data:any) {
    return this.http.post<Employee>(this.url, data, { 'headers': headers });
  }
  putData(data: any, id: any) {
    return this.http.put(this.url+"/"+id, data);
  }
  deleteData(id: any) {
    return this.http.delete(this.url + "/"+id)
  }
}
