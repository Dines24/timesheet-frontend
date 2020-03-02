import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiServiceService } from './../../api-service.service';
@Component({
  selector: 'app-authheader',
  templateUrl: './authheader.component.html',
  styleUrls: ['./authheader.component.css']
})
export class AuthheaderComponent implements OnInit {
  time;
  fname;
  lname;
  constructor(private route: Router, private api: ApiServiceService) { }

  ngOnInit() {
    this.api.checkLogin();
    this.time  = new Date();
    this.fname = window.localStorage.getItem('fname');
    this.lname = window.localStorage.getItem('lname');
  }

}
