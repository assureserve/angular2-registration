import { Component, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {Registration} from "./registration.model";
import {User} from "../models/user.model";
import {AuthenticationService} from "../services/authentication.service";
import {UserService} from "../services/user.service";
import {AlertService} from "../services/alert.service";

//declare var gapi:any;

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  model: any = {};
  registration:Registration;
  loading: boolean= false;
  userMap: {[key: string]: User} = {};
  //googleLoginButtonId = 'google-login-button';

  constructor(
    //private _zone:NgZone,
    private router: Router,
    private alertService: AlertService,
    private userService: UserService,
    private authenticationService: AuthenticationService) {
  }

  ngOnInit() {
  }



  register() {
    console.log("register");
    this.authenticationService.register(this.model);
    //this.userMap[this.model.email.valueOf()] = new User();
    //return false;
    //Registration registration = new Registration();
    //registration.email = this.mode.email;
    //this.authenticationService.register(this.model);
    this.router.navigate(['/details']);
    //this.authenticationService.login(this.model.firstName, this.model.lastName);
    //this.userService.create(this.model)
    //  .subscribe(
    //    data => {
    //      alert("done");
    //      this.alertService.success('Registration successful', true);
    //      this.router.navigate(['/login']);
    //    },
    //    error => {
    //      this.alertService.error(error);
    //      this.loading = false;
    //    });
  }



  //private onLoginInSuccess = (loggedInUser:any) => {
  //  this._zone.run(() => {
  //    var email = loggedInUser.getBasicProfile().getEmail();
  //    var auth_token = loggedInUser.getAuthResponse().id_token;
  //    // Use a service to store authenticate with backend
  //    // Store token in local storage for authentication
  //  });
  //}
  //private onLoginFailure = (error:any) => {
  //  console.log(error);
  //}


}
