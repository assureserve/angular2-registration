import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {User} from "../models/user.model";
import {AuthenticationService} from "../services/authentication.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: any = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    this.authenticationService.logout();
  }

  login() {
    //alert(1);
    this.authenticationService.login(this.model.email, this.model.password)
                              .subscribe((data) => {
                                                    console.log(JSON.stringify(data));
                                                    localStorage.setItem('currentUser', JSON.stringify(data));
                                                    this.router.navigate(['/details']);
                                                  });
    //
  }

  ngAfterViewInit() { // Converts the Google login button stub to an actual button.
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 40,
      'longtitle': true,
      'theme': 'dark',
      'onsuccess': param => this.onSignIn(param)
    });
  }

  public onSignIn(googleUser) {
    var user : User = new User();

    ((u, p) => {
      //u.id            = p.getId();
      //u.firstName          = p.getName();
      u.email         = p.getEmail();
      u.imageUrl      = p.getImageUrl();
      u.firstName     = p.getGivenName();
      u.lastName    = p.getFamilyName();
    })(user, googleUser.getBasicProfile());
    //
    //((u, r) => {
    //  u.token         = r.id_token
    //})(user, googleUser.getAuthResponse());
    //
    ////user.save();
    ////this.goHome();
    this.authenticationService.register(user);
    this.router.navigate(['/details']);

  };

}
