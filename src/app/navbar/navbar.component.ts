import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {AuthenticationService} from "../services/authentication.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
	public navLink: string = "Login";
	//@ViewChild('userLink') userLink: ElementRef;

  constructor(private authenticationService: AuthenticationService) {
  	this.authenticationService.navBarLink.subscribe((link: string) => {
  		this.navLink = link;
  		//this.userLink.nativeElement.innerHTML = link;
  	});
  }

  ngOnInit() {
  }

}
