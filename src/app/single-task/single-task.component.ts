import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ApiServiceService } from './../api-service.service';
import { ToastrService } from 'ngx-toastr';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-single-task',
  templateUrl: './single-task.component.html',
  styleUrls: ['./single-task.component.css']
})
export class SingleTaskComponent implements OnInit {
  sub;
  id;
  tasks;
  constructor(private _Activatedroute:ActivatedRoute,
    private _router:Router, private formBuilder: FormBuilder,private apiService: ApiServiceService, private toastr: ToastrService) { }

  ngOnInit() {
    this.sub=this._Activatedroute.paramMap.subscribe(params => { 
      // console.log(params);
        this.id = params.get('id');        
    });
 
    this.getTask();
  }

  getTask(){
    this.apiService.getDataAuth("gettask?task_id="+this.id)
    .subscribe(
      (res: any) => {
          console.log(res);
          if(res.status == 200){
            this.tasks = res.data[0];
            console.log('asds', this.tasks);
            
           
          }
        },
        error => {
          console.error("error creating");
        }
    );

  }

  completeTask(taskid){
    var data = { task_id:taskid};
    this.apiService.postDataAuth('completetask', data)
    .subscribe(
      (res: any) => {
        this.getTask();
    
          this.toastr.success( 'Project status updated successfully.', 'Success');
        },
        error => {
          console.error("error creating");
        }
    );
    
  }

}
