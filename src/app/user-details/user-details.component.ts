import { Component, OnInit } from '@angular/core';
import {User} from "./../models/user.model";

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  currentUser: User;
  user: User;

  constructor() {
    console.log(localStorage.getItem('currentUser'));
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    console.log(this.currentUser);
  }

  ngOnInit() {
  }

}
