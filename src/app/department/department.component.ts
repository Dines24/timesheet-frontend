import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { ApiServiceService } from './../api-service.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {
  departmentForm;
  departments;
  department;
  status;
  formtype = 'add';
  url = 'add-department';
  constructor(private formBuilder: FormBuilder,private apiService: ApiServiceService, private toastr: ToastrService) {
    this.departmentForm = this.formBuilder.group({
      name: ['', Validators.required]
     
    });

   }

  ngOnInit() {
  
    this.departmentList();
  }

  get f() { return this.departmentForm.controls; }
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
  onSubmit(customerData) {

  if (this.departmentForm.invalid) {
    this.status = this.departmentForm.status;
    return;
  }
  this.status = '';
    var data = {name: customerData.name , department_id:''};
   
    if(this.formtype == 'update'){
       data = {name: customerData.name , department_id : this.department.id};
    }
    
    this.apiService.postDataAuth(this.url, data)
    .subscribe(
      (res: any) => {
          this.departmentList();
         
          this.formtype = 'add';
          this.url = 'add-department';
          document.getElementById("close").click();
          this.toastr.success( 'Department created successfully.', 'Success');
        },
        error => {
          console.error("error creating");
        }
    );
    console.warn('Department created', customerData);
    this.departmentForm.reset();
  }
  editDepartment(departmentid){
    this.department =  this.departments.find(o => o.id ==departmentid);
    this.departmentForm.setValue({
      name: this.department.name
    })
    document.getElementById("openModel").click();
    this.formtype = 'update';
    this.url = 'edit-department';
  }
  deleteDepartment(departmentid){
    var data = { department_id:departmentid};
   
    this.apiService.postDataAuth('delete-department', data)
    .subscribe(
      (res: any) => {
          this.departmentList();
         
          this.toastr.success( 'Department created successfully.', 'Success');
        },
        error => {
          console.error("error creating");
        }
    );
    
  }
}
