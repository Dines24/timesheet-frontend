import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from './../api-service.service';
import { FormBuilder } from '@angular/forms';
declare var $: any;
@Component({
  selector: 'app-permissions',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.css']
})
export class PermissionsComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private apiService: ApiServiceService) { }
  departments;
  selectedDepartment;
  users;
  ngOnInit() {
 this.departmentList();

  }

  departmentList(){
    this.apiService.getDataAuth("departments")
    .subscribe(
      (res: any) => {
          if(res.status == 200){
            this.departments = res.data;
            if(this.selectedDepartment){
              this.selectDepartment(this.selectedDepartment);
            }else{
              this.selectDepartment(this.departments[0].id);
            }
          }
        },
        error => {
          console.error("error creating");
        }
    );
  }
  selectDepartment(selectedDepartment){
    this.selectedDepartment = selectedDepartment;
    this.apiService.getDataAuth("getuserpermission?department_id="+selectedDepartment)
    .subscribe(
      (res: any) => {
          if(res.status == 200){
            this.users = res.data;
          }
        },
        error => {
          console.error("error creating");
        }
    );

  }

  updatePermission(user_id, permission_type, isChecked){

    var data = { user_id:user_id, permissiontype: permission_type, permission:isChecked};
    this.apiService.postDataAuth("updatepermission",data)
    .subscribe(
      (res: any) => {
          if(res.status == 200){
            this.users = res.data;
            this.departmentList();
          }
        },
        error => {
          console.error("error creating");
        }
    );

  }

}
