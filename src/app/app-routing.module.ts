import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {HomeComponent} from './home/home.component'

import { AuthGuard } from './services/auth.guard';
import { AuthenticateGuard } from './services/admin.guard';
import { LoginComponent } from './login/login.component';

import { AdminLoginComponent } from './login/admin-login/admin-login.component';

import { ChangePasswordComponent } from './manage-account/change-password/change-password.component';

import { UserLoginComponent } from './login/user-login/user-login.component';

import { BiodataComponent } from './manage-account/biodata/biodata.component';
import { ListEmployeeComponent } from './personnel/list-employee/list-employee.component';
import { AddEmployeeComponent } from './personnel/add-employee/add-employee.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { Role } from './services/role';
import { EditDataComponent } from './manage-account/edit-data/edit-data.component';


// import { AuthData } from './services/auth.model'

const appRoutes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },



  // { path: 'login', component: LoginComponent,children:[
    
  //   { path: 'userLogin',component: UserLoginComponent,outlet:'user'},

  //   { path: 'adminLogin', component: AdminLoginComponent,outlet:'admin'},

  // ]},
  { path: 'login', component:LoginComponent},

  { path: 'adminLogin', component: AdminLoginComponent},

  { path: 'userLogin',component: UserLoginComponent},
  
  { path: 'home', component: HomeComponent,data:{membership_type:[Role.admin]},canActivate:[AuthenticateGuard]},

  { path: 'edit', component: EditDataComponent},

  { path: 'adminRegister', component: RegisterComponent},

  { path: 'profile', component: ProfileComponent,canActivate:[AuthGuard],canActivateChild:[AuthGuard]},

  { path: "addEmployee", component: AddEmployeeComponent,data:{membership_type:[Role.admin]},canActivate:[AuthenticateGuard]},
  
  { path : 'listEmployee', component: ListEmployeeComponent,data:{membership_type:[Role.admin]}, canActivate:[AuthenticateGuard]},

  { path: 'changePassword', component:ChangePasswordComponent, canActivate:[AuthGuard]},

  { path: 'biodata', component:BiodataComponent, canActivate:[AuthGuard]}

];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
