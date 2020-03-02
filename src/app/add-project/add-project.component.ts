import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiServiceService } from './../api-service.service';
import { ToastrService } from 'ngx-toastr';
import { HttpClient, HttpResponse, HttpHeaders,HttpEventType } from '@angular/common/http';
import { Router,ActivatedRoute } from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {
  formtype = 'add';
  url = 'addproject';
  projectForm: FormGroup;
  submitted = false;
  projects;
  selectedFile;
  string_for_mongo;
  sub;
  id;
  project;
  validate;


  constructor(private _Activatedroute:ActivatedRoute,
    private _router:Router, private http: HttpClient, private formBuilder: FormBuilder,private apiService: ApiServiceService, private toastr: ToastrService) {
    this.projectForm = this.formBuilder.group({
      projectname: ['', Validators.required],
      projectowner: '',
      projectfrom: '',
      projecttype: '',
      projectfor: '',
      deadline: '',
      priority: '',
      page: '',
      description: '',  
      designing_est_time: '',  
      development_est_time: '',  
      android_est_time: '',  
      ios_est_time: '',
      post_image: '',
      next:'',     
    });

   }

  ngOnInit() {
   
    this.sub=this._Activatedroute.paramMap.subscribe(params => { 
      // console.log(params);
        this.id = params.get('id');  
       // console.log(this.id);
       if(this.id){
        this.projectList();
       }
       
              
    });
    
    
    
    var current_fs, next_fs, previous_fs; //fieldsets
    var left, opacity, scale; //fieldset properties which we will animate
    var animating; //flag to prevent quick multi-click glitches
    
    $(".next").click(function(){
      if(animating) return false;
      animating = true;
    
      current_fs = $(this).parent();
      next_fs = $(this).parent().next();
    
    //activate next step on progressbar using the index of next_fs
    $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");
    
    //show the next fieldset
    next_fs.show(); 
    //hide the current fieldset with style
    current_fs.animate({opacity: 0}, {
      step: function(now, mx) {
    //as the opacity of current_fs reduces to 0 - stored in "now"
    //1. scale current_fs down to 80%
    scale = 1 - (1 - now) * 0.2;
    //2. bring next_fs from the right(50%)
    left = (now * 50)+"%";
    //3. increase opacity of next_fs to 1 as it moves in
    opacity = 1 - now;
    current_fs.css({'transform': 'scale('+scale+')'});
    next_fs.css({'left': left, 'opacity': opacity});
    }, 
    duration: 500, 
    complete: function(){
      current_fs.hide();
      animating = false;
    }, 
    //this comes from the custom easing plugin
  
    });
    });
    
    $(".previous").click(function(){
      if(animating) return false;
      animating = true;
    
      current_fs = $(this).parent();
      previous_fs = $(this).parent().prev();
    
    //de-activate current step on progressbar
    $("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");
    
    //show the previous fieldset
    previous_fs.show(); 
    //hide the current fieldset with style
    current_fs.animate({opacity: 0}, {
      step: function(now, mx) {
    //as the opacity of current_fs reduces to 0 - stored in "now"
    //1. scale previous_fs from 80% to 100%
    scale = 0.8 + (1 - now) * 0.2;
    //2. take current_fs to the right(50%) - from 0%
    left = ((1-now) * 50)+"%";
    //3. increase opacity of previous_fs to 1 as it moves in
    opacity = 1 - now;
    current_fs.css({'left': left});
    previous_fs.css({'transform': 'scale('+scale+')', 'opacity': opacity});
    }, 
    duration: 500, 
    complete: function(){
      current_fs.hide();
      animating = false;
    }, 
    //this comes from the custom easing plugin
    });
    });
    
    $(".submit").click(function(){
      return false;
    });
  }


  onImgChange(img) {
    this.selectedFile = <File> img.target.files[0];

  }

    onSubmit(customerData) {

      if (this.projectForm.status == 'INVALID') {
        this.validate = this.projectForm.controls;
        this.submitted = true;
        
        return this.validate;
      }

     const fd = new FormData();
      if(this.selectedFile){
        console.log(this.selectedFile , this.selectedFile.name);
        fd.append('document', this.selectedFile , this.selectedFile.name);
      }
      
    var projectfor = JSON.stringify(customerData.projectfor)
    let page =   JSON.stringify(customerData.page)
    fd.append('project_name', customerData.projectname);
    fd.append('project_owner', customerData.projectowner);
    fd.append('project_from', customerData.projectfrom);
    fd.append('project_type', customerData.projecttype);
    fd.append('project_for', projectfor);
    fd.append('deadline', customerData.deadline);
    fd.append('priority', customerData.priority);
    fd.append('page', page);
    fd.append('project_description', customerData.description);
    fd.append('designing_est_time', customerData.designing_est_time);
    fd.append('development_est_time', customerData.development_est_time);
    fd.append('android_est_time', customerData.android_est_time);
    fd.append('ios_est_time', customerData.ios_est_time);      
   
    console.log(this.formtype);
   
    if(this.formtype == 'update'){
      var projectfor = JSON.stringify(customerData.projectfor)
      let page =   JSON.stringify(customerData.page)

      fd.append('project_id', this.project.id);
      fd.append('project_name', customerData.projectname);
      fd.append('project_owner', customerData.projectowner);
      fd.append('project_from', customerData.projectfrom);
      fd.append('project_type', customerData.projecttype);
      fd.append('project_for', projectfor);
      fd.append('deadline', customerData.deadline);
      fd.append('priority', customerData.priority);
      fd.append('page', page);
      fd.append('project_description', customerData.description);
      fd.append('designing_est_time', customerData.designing_est_time);
      fd.append('development_est_time', customerData.development_est_time);
      fd.append('android_est_time', customerData.android_est_time);
      fd.append('ios_est_time', customerData.ios_est_time);
    }

    
    this.apiService.postDataAuth(this.url, fd)
    .subscribe(
      (res: any) => {
         
          this.formtype = 'add';
          this.url = 'addproject';
          this.projectList();
          this.toastr.success( 'project created successfully.', 'Success');
        },
        error => {
          console.error("error creating");
        }
    );
    
    this.projectForm.reset();
    this._router.navigate(['/projects']);
  }

  projectList(){
    this.apiService.getDataAuth("projectlist")
    .subscribe(
      (res: any) => {
          if(res.status == 200){
            this.projects = res.data;
            this.editProject(this.id);
            
          }
        },
        error => {
          console.error("error creating");
        }
    );
  }

  editProject(projectid){
    this.project =  this.projects.find(o => o.id == projectid);
    this.projectForm.setValue({
     
      projectname: this.project.project_name,
      projectowner: this.project.project_owner,
      projectfrom: this.project.project_from,
      projecttype: this.project.project_type,
      projectfor: JSON.parse(this.project.project_for),
      deadline: this.project.deadline,
      priority: this.project.priority,
      description: this.project.project_description,
      post_image: this.project.document,
      next: 'Next',
      page: JSON.parse(this.project.pages),
      designing_est_time: this.project.designing_est_time,
      development_est_time: this.project.development_est_time,
      android_est_time: this.project.android_est_time,
      ios_est_time: this.project.ios_est_time,


    })
    this.formtype = 'update';
    this.url = 'addproject';
  }


}
