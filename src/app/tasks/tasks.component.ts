import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ApiServiceService } from './../api-service.service';
import { ToastrService } from 'ngx-toastr';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  tasks;
  constructor(private _Activatedroute:ActivatedRoute,
    private _router:Router, private formBuilder: FormBuilder,private apiService: ApiServiceService, private toastr: ToastrService) { }

  ngOnInit() {
    this.getTasks();
  }

  getTasks(){
    this.apiService.getDataAuth("taskshistory")
    .subscribe(
      (res: any) => {
          if(res.status == 200){
            this.tasks = res.data;
          }
        },
        error => {
          console.error("error creating");
        }
    );

  }

}
