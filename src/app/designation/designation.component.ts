import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiServiceService } from './../api-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-designation',
  templateUrl: './designation.component.html',
  styleUrls: ['./designation.component.css']
})
export class DesignationComponent implements OnInit {

  designationForm;
  designation;
  designations;
  status;
  formtype = 'add';
  url = 'add-designation';
  designation_id;
  constructor(private formBuilder: FormBuilder,private apiService: ApiServiceService, private toastr: ToastrService) {
    this.designationForm = this.formBuilder.group({
      name: ['', Validators.required]
     
    });

   }

  ngOnInit() {
    this.designationList();
  }

  onSubmit(customerData) {

    if (this.designationForm.invalid) {
      this.status = this.designationForm.status;
      return;
    }
    this.status = '';
    var data = {name: customerData.name , designation_id:''};

    if(this.formtype == 'update'){
      data = {name: customerData.name , designation_id : this.designation.id};
   }

    this.apiService.postDataAuth(this.url, data)
    .subscribe(
      (res: any) => {
          this.designationList();

          this.formtype = 'add';
          this.url = 'add-designation';
          document.getElementById("close").click();
          this.toastr.success( 'Designation created successfully.', 'Success');
         
        },
        error => {
          console.error("error creating");
        }
    );
    console.warn('Designation created', customerData);
    this.designationForm.reset();
  }

  designationList(){
    this.apiService.getDataAuth("designation")
    .subscribe(
      (res: any) => {
          if(res.status == 200){
            this.designations = res.data;
          }
        },
        error => {
          console.error("error creating");
        }
    );
  }

  editDesignation(designationid){
    this.designation =  this.designations.find(o => o.id ==designationid);
    this.designationForm.setValue({
      name: this.designation.name
    })
    document.getElementById("open-designation-model").click();
    this.formtype = 'update';
    this.url = 'edit-designation';
  }

  deleteDesignation(designationid){
    var data = { designation_id:designationid};
   
    this.apiService.postDataAuth('delete-designation', data)
    .subscribe(
      (res: any) => {
          this.designationList();
         
          this.toastr.success( 'designation deleted successfully.', 'Success');
        },
        error => {
          console.error("error creating");
        }
    );
    
  }

}
