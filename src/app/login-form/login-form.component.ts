import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from './../api-service.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
username: any;
password: any;
c_password: any;
auth_token: any;
email: any;
date: any;
role: any;
fname;
lname;
  constructor(
    private apiService: ApiServiceService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    
  
  }

  login() {

    let data = {
      "password" : this.password,
      "email" : this.email
    }
    this.apiService.postData("login", data)
    .subscribe(
        result => {
          this.auth_token = result['access_token'];
          this.role = result['user']['role']; 
          this.fname = result['user']['fname'];
          this.lname = result['user']['lname']; 
          this.date = new Date();         
          localStorage.setItem("auth_token", this.auth_token);
          this.apiService.getToken(this.auth_token);
           localStorage.setItem("date", this.date);
           localStorage.setItem("role", this.role);
           localStorage.setItem("fname", this.fname);
           localStorage.setItem("lname", this.lname);
           this.router.navigate(['/dashboard']);
        },
        error => {
          console.error("error creating");
        }
    );
  }

  register() {

  }

}