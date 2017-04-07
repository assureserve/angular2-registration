import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
//import { RouterModule, Routes} from '@angular/router';

import { AppComponent } from './app.component';
import { RegistrationComponent } from './registration/registration.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import {AuthenticationService} from "./services/authentication.service";
import {routing} from "./app.routing";
import {AuthGuard} from "./auth.guard";
import { HomeComponent } from './home/home.component';
import {UserService} from "./services/user.service";
import { LoginComponent } from './login/login.component';
import { fakeBackendProvider } from './fake-backend';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { BaseRequestOptions } from '@angular/http';
import {AlertService} from "./services/alert.service";
import { AlertComponent } from './alert/alert.component';
import { NavbarComponent } from './navbar/navbar.component';


@NgModule({
  declarations: [
    AppComponent,
    AlertComponent,
    RegistrationComponent,
    UserDetailsComponent,
    HomeComponent,
    LoginComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [AuthGuard, AuthenticationService, UserService, AlertService],
    //fakeBackendProvider, MockBackend, BaseRequestOptions],
  bootstrap: [AppComponent]
})
export class AppModule { }
