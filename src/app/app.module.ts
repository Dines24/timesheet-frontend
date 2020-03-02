import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { FormsModule , ReactiveFormsModule  } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './_layouts/header/header.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { AuthheaderComponent } from './_layouts/authheader/authheader.component';
import { DepartmentComponent } from './department/department.component';
import { SidebarComponent } from './_layouts/sidebar/sidebar.component';
import { DesignationComponent } from './designation/designation.component';
import { EmployeeComponent } from './employee/employee.component';
import { PermissionsComponent } from './permissions/permissions.component';
import { TasksComponent } from './tasks/tasks.component';
import { ProjectsComponent } from './projects/projects.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddProjectComponent } from './add-project/add-project.component';
import { TagInputModule } from 'ngx-chips';
import { SingleProjectComponent } from './single-project/single-project.component';
import { SingleTaskComponent } from './single-task/single-task.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { GuestLayoutComponent } from './guest-layout/guest-layout.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    HeaderComponent,
    DashboardComponent,
    AuthheaderComponent,
    DepartmentComponent,
    SidebarComponent,
    DesignationComponent,
    EmployeeComponent,
    PermissionsComponent,
    TasksComponent,
    ProjectsComponent,
    AddProjectComponent,
    SingleProjectComponent,
    SingleTaskComponent,
    MainLayoutComponent,
    GuestLayoutComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule, 
    ReactiveFormsModule ,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    NgbModule,
    TagInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }


