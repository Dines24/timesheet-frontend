import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiServiceService } from './../../api-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  time;
  constructor(private route: Router,  private api: ApiServiceService, ) { }

  ngOnInit() {
    this.time  = new Date();
    this.api.checkNotLogin();
   
  }
  

}
