import { Component, OnInit, ɵConsole } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ApiServiceService } from './../../api-service.service';
import { ToastrService } from 'ngx-toastr';
declare var $: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  projectsstatus :any;
  projects;
  tasks;
  departments;
  departmentid;
  projectdescription= {'project_name':'', 'project_description':''};
  constructor(private apiService: ApiServiceService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router) { }

  ngOnInit() {
    this.projectsStatus();
    this.projectList();
    this.departmentList();
  }

  projectsStatus(){
    this.apiService.getDataAuth("getprojectsstatus")
    .subscribe(
      (res: any) => {
          if(res.status == 200){
            this.projectsstatus = res;
            
          }
        },
        error => {
          console.error("error creating");
        }
    );
  }

  projectList(){
    this.apiService.getDataAuth("projectlist")
    .subscribe(
      (res: any) => {
          if(res.status == 200){
            this.projects = res.data;
            if(this.projects.length >0){
              this.projectdescription = this.projects[0];
            }
            
            for(let i=0; i< this.projects.length; i++){
              this.projects[i].show = 0;
            }
            
          }
        },
        error => {
          console.error("error creating");
        }
    );
  }
  
  projectDescription(projectid){
    
    this.projectdescription = this.projects.find(x => x.id === projectid);

  }

  departmentTask(departmentid){
    
    var data = { department_id:departmentid};
    
    this.apiService.postDataAuth('departmenttask', data)
    .subscribe(
      (res: any) => {
        this.tasks = res.data;
          this.toastr.success( 'Project status updated successfully.', 'Success');
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
            this.departmentid = this.departments[0].id;
            this.departmentTask(this.departmentid);
          }
        },
        error => {
          console.error("error creating");
        }
    );
  }




}
