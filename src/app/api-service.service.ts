import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import {  Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  baseUrl = "http://172.16.16.60/timesheetbackend/api/auth/";
  token: any;
  checkStatus = new BehaviorSubject<boolean>(false);
  isUserLogedIn = this.checkStatus.asObservable();
  constructor(private http: HttpClient, private route : Router) {
   }
   checkLogin(){
    const token = localStorage.getItem('auth_token');
    if(token){ this.checkStatus.next(true);}
    else{ this.checkStatus.next(false); 
          this.route.navigate(['/login']);
    }
  }
  checkNotLogin(){
    const token = localStorage.getItem('auth_token');
    if(token){ this.checkStatus.next(true);
      this.route.navigate(['/dashboard']);}
    else{ this.checkStatus.next(false); 
          
    }
  }
   postData(url, data) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Access-Control-Allow-Origin': '*',
        // 'Authorization': 'Bearer '+this.token
      })
    };
    return this.http.post(this.baseUrl+url, data, httpOptions);
    }
    
    postDataAuth(url, data) {
      this.getAuthToken();
      let checkToken  = this.sendToken();
      if(!checkToken){
        this.route.navigate(['/login']);
      }
      const httpOptions = {
        headers: new HttpHeaders({
          // 'Content-Type':  'application/json',
          'Access-Control-Allow-Origin': '*',
          'Authorization': 'Bearer '+this.token
        })
      };
      return this.http.post(this.baseUrl+url, data, httpOptions);
    }
    getDataAuth(url) {
      this.getAuthToken();
      let checkToken  = this.sendToken();
      if(!checkToken){
        this.route.navigate(['/login']);
      }
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Access-Control-Allow-Origin': '*',
          'Authorization': 'Bearer '+this.token
        })
      };
      return this.http.get(this.baseUrl+url,  httpOptions);
    }

    getToken(token) {
      this.token = token;
    }
    getAuthToken() {
      this.token = localStorage.getItem('auth_token');
    }
    sendToken() {
      return this.token;
    }
}