import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router'
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { LandingPageComponent } from './shared/landing-page/landing-page.component';
import { HomeComponent } from './home/home.component';



import { AlertComponent } from './alert/alert.component';
import { PlaceholderDirective } from './shared/placeholder/placeholder.directive';
import { DropdownDirective } from './shared/dropdown.directive';
import { JwtInterceptor } from './services/jwt.interceptor';
import { HttpErrorInterceptor} from './services/http.error.interceptor';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserLoginComponent } from './login/user-login/user-login.component';
import { authInterceptorProviders } from './services/auth-interceptor.service';
import { SidebarDirective } from './sidebar.directive';
import { AdminLoginComponent } from './login/admin-login/admin-login.component';
import { ProfileComponent } from './profile/profile.component';

import { PersonnelComponent } from './personnel/personnel.component';
import { ChangePasswordComponent } from './manage-account/change-password/change-password.component';
import { AddEmployeeComponent } from './personnel/add-employee/add-employee.component';
import { FooterComponent } from './footer/footer.component';
import { ListEmployeeComponent } from "./personnel/list-employee/list-employee.component"

import { ManageAccountComponent } from './manage-account/manage-account.component';
import { BiodataComponent } from './manage-account/biodata/biodata.component';
import { EditDataComponent } from './manage-account/edit-data/edit-data.component';





@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LandingPageComponent,
    HomeComponent,


    AlertComponent,
    PlaceholderDirective,
    DropdownDirective,
    LoginComponent,
    RegisterComponent,
    AdminLoginComponent,
    ProfileComponent,
    UserLoginComponent,
    PersonnelComponent,
    SidebarDirective,
    ChangePasswordComponent,
    AddEmployeeComponent,
    FooterComponent,
    ListEmployeeComponent,
    ManageAccountComponent,
    BiodataComponent,
    EditDataComponent,


  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    AppRoutingModule

  ],
  providers: [
  {provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true},
  {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi:true},
  // {provide: AuthenticateGuard,useValue: (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
