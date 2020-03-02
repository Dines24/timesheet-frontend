import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ApiServiceService } from './../api-service.service';
import { ToastrService } from 'ngx-toastr';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-single-project',
  templateUrl: './single-project.component.html',
  styleUrls: ['./single-project.component.css']
})
export class SingleProjectComponent implements OnInit {
  sub;
  id;
  project;
  prodhrdArr1:any;
  conprodArr2;
  prodhrdArr3;
  conprodArr4;
  essttime;
  taskForm;
  tasks;
  formtype = 'add';
  url = 'addtask';
  document:'';
  documents;
  projectusers;
  departments;
  task;
  status;
  
  constructor(private _Activatedroute:ActivatedRoute,
    private _router:Router, private formBuilder: FormBuilder,private apiService: ApiServiceService, private toastr: ToastrService) {
      this.taskForm = this.formBuilder.group({
        taskname: '',
        taskdescription: '',
        department: '',
        assign: '',
        start_date: '',
        time_duration: '',
       
       
      });

  }

  ngOnInit() {
    this.sub=this._Activatedroute.paramMap.subscribe(params => { 
       this.id = params.get('id');        
   });

   this.getProject();
   this.getTask();
   this.projectUsers();
   this.departmentList();
  }
    getProject(){
      var mmx
      var hh1
      var mm3
      this.apiService.getDataAuth('getproject?project_id='+this.id)
    .subscribe(
      (res: any) => {
        if(res.status == 200){
          this.project = res.data[0];
          this.documents = this.project.document.split('/');
          this.document = this.documents[1];
          var prodhrd1 = this.project.designing_est_time;
          var prodhrd2 = this.project.ios_est_time;
          var prodhrd3 = this.project.development_est_time;
          var prodhrd4 = this.project.android_est_time;
          this.prodhrdArr1 = prodhrd1.split(":");
          this.conprodArr2 = prodhrd2.split(":");
          this.prodhrdArr3 = prodhrd3.split(":");
          this.conprodArr4 = prodhrd4.split(":");


           hh1 = parseInt(this.prodhrdArr1[0]) + parseInt(this.conprodArr2[0]) + parseInt(this.prodhrdArr3[0]) + parseInt(this.conprodArr4[0]);
          var mm1 = parseInt(this.prodhrdArr1[1]) + parseInt(this.conprodArr2[1]) + parseInt(this.prodhrdArr3[1]) + parseInt(this.conprodArr4[1]);
          
          if (mm1 > 59) {
            var mm2 = mm1 % 60;
             mmx = mm1 / 60;
              mm3 = parseInt(mmx);//add into hour
             hh1 = parseInt(hh1) + parseInt(mm3);
            var mm1 = mm2;
        }
        this.essttime = hh1 + ':' + mm1 ;

        }
      },
      error => {
        console.error("error creating");
      }
    );

    }

    onSubmit(customerData) {

      var data = {task_name: customerData.taskname ,
          project_id: this.project.id,
          description: customerData.taskdescription,
          department: customerData.department,
          assign_to: customerData.assign,
          start_time: customerData.start_date,
          duration: customerData.time_duration,
          task_id:  ''};
  
      if(this.formtype == 'update'){
        data = {task_name: customerData.taskname,          
          project_id: this.project.id,
          description: customerData.taskdescription,
          task_id:  this.task.id,
          department: customerData.department,
          assign_to: customerData.assign,
          start_time: customerData.start_date,
          duration: customerData.time_duration};
     }
  
      this.apiService.postDataAuth(this.url, data)
      .subscribe(
        (res: any) => {
            this.getProject();
            this.getTask();
            this.formtype = 'add';
            this.url = 'addtask';
            document.getElementById("close").click();
            this.toastr.success( 'Task created successfully.', 'Success');
           
          },
          error => {
            console.error("error creating");
          }
      );
      this.taskForm.reset();
    }

    getTask(){
      this.apiService.getDataAuth("tasklist?project_id="+this.id)
      .subscribe(
        (res: any) => {
            if(res.status == 200){
              this.tasks = res.data;
            }
          },
          error => {
          }
      );
  
    }

    projectUsers(){
      
      this.apiService.getDataAuth("getprojectuser?project_id="+this.id)
      .subscribe(
        (res: any) => {
            if(res.status == 200){
              this.projectusers = res.data;
             
            }
          },
          error => {
            console.error("error creating");
          }
      );

    }

    departmentList(){
      this.apiService.getDataAuth("departments")
      .subscribe(
        (res: any) => {
            if(res.status == 200){
              this.departments = res.data;
            }
          },
          error => {
            console.error("error creating");
          }
      );
    }

    deleteTask(taskid){
      var data = { task_id:taskid};
     
      this.apiService.postDataAuth('deletetask', data)
      .subscribe(
        (res: any) => {
            this.getTask();
           
            this.toastr.success( 'Task deleted successfully.', 'Success');
          },
          error => {
            console.error("error creating");
          }
      );
      
    }

    editTask(taskid){
      this.task =  this.tasks.find(o => o.id == taskid);
      
      this.taskForm.setValue({
       
        taskname: this.task.task_name,
        taskdescription: this.task.description,
        department: this.task.department,
        assign: this.task.assign_to,
        start_date: this.task.start_date,
        time_duration: this.task.duration,
  
      })
      document.getElementById("openModel").click();
      this.formtype = 'update';
      this.url = 'addtask';
    }

    completeProject(projectid){
      var data = { project_id:projectid};
     let clickedElement;
      this.apiService.postDataAuth('completeproject', data)
      .subscribe(
        (res: any) => {
          this.getProject();
           
            this.toastr.success( 'Project status updated successfully.', 'Success');
          },
          error => {
            console.error("error creating");
          }
      );
      
    }

}
