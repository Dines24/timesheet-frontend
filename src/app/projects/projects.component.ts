import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ApiServiceService } from './../api-service.service';
import { ToastrService } from 'ngx-toastr';
declare var $: any;


@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  demo;
  projects;
  users;
  userlist;
  user;
  projectusers;
  constructor(private formBuilder: FormBuilder,private apiService: ApiServiceService, private toastr: ToastrService) {
    

   }
blah;
  ngOnInit() {
    this.projectList();
    this.blah = 0;

    }
    toggle(i){
      this.projects[0]
      
      let ddd = this.projects.find(x => x.id == i);
      for(let i=0; i< this.projects.length; i++){
        if(this.projects[i].id != ddd.id){
          this.projects[i].show = 0;
        }
        
      }
      if(ddd.show == 0){
        ddd.show = 1;
      }else{
        ddd.show = 0;
      }
      
    }
  projectList(){
    this.apiService.getDataAuth("projectlist")
    .subscribe(
      (res: any) => {
          if(res.status == 200){
            this.projects = res.data;           
            
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
  assignProject(userid, projectid, status){
    var data = { user_id:userid, project_id:projectid, status:status};
    this.apiService.postDataAuth('addremoveprojectuser', data)
    .subscribe(
      (res: any) => {
        this.projectList();
         
          this.toastr.success( 'Project Assigned to User Successfully.', 'Success');
        },
        error => {
          console.error("error creating");
        }
    );
  }

  deleteProject(projectid){
    var data = { project_id:projectid};
   
    this.apiService.postDataAuth('deleteproject', data)
    .subscribe(
      (res: any) => {
        this.projectList();
         
          this.toastr.success( 'Department created successfully.', 'Success');
        },
        error => {
          console.error("error creating");
        }
    );
    
  }

}
