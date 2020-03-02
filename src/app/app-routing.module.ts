import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginFormComponent } from './login-form/login-form.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { DepartmentComponent } from './department/department.component';
import { DesignationComponent } from './designation/designation.component';
import { EmployeeComponent } from './employee/employee.component';
import { PermissionsComponent } from './permissions/permissions.component';
import { ProjectsComponent } from './projects/projects.component';
import { TasksComponent } from './tasks/tasks.component';
import { AddProjectComponent } from './add-project/add-project.component';
import { SingleProjectComponent } from './single-project/single-project.component';
import { SingleTaskComponent } from './single-task/single-task.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { GuestLayoutComponent } from './guest-layout/guest-layout.component';
import {AuthGuard} from './Guards/auth.guard';
import { GuestGuard  } from './Guards/guest.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
    {path : 'dashboard', component: DashboardComponent},
    {path : 'department', component: DepartmentComponent},
    {path : 'designation', component: DesignationComponent},
    {path : 'employee', component: EmployeeComponent},
    {path : 'permissions', component: PermissionsComponent},
    {path : 'projects', component: ProjectsComponent},
    {path : 'tasks', component: TasksComponent},
    {path : 'add-project/:id', component: AddProjectComponent},
    {path : 'add-project', component: AddProjectComponent},
    {path : 'single-project/:id', component: SingleProjectComponent},
    {path : 'single-task/:id', component: SingleTaskComponent},
    ],
    canActivate: [AuthGuard]
  },
  {
    path: '',
    component: GuestLayoutComponent,
    children: [
      {path : 'login', component: LoginFormComponent},
    ],
    canActivate: [GuestGuard]
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
