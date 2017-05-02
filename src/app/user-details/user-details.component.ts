import { Component, OnInit } from '@angular/core';
import {User} from "./../models/user.model";
import {UtilService} from "../services/util.service";

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  currentUser: User;
  user: User;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;

  constructor(private utilService: UtilService) {
    console.log(localStorage.getItem('currentUser'));
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    console.log(this.currentUser);
    this.address = this.currentUser.addresses[0].street1 + " " + this.currentUser.addresses[0].street2;
    this.city = this.currentUser.addresses[0].city;
    this.state = this.currentUser.addresses[0].state;
    this.country = this.currentUser.addresses[0].country;
    this.zipCode = this.currentUser.addresses[0].zipCode;

    //this.address = this.currentUser.addresses[0].street1 + " " +
console.log("****");
    this.utilService.addressEmitter.subscribe((addressMap: Map<string, string>) => {
      this.address = addressMap.get("address");
      this.city = addressMap.get("city");
      this.state = addressMap.get("state");
      this.zipCode = addressMap.get("zipCode");
      this.country = addressMap.get("country");
      //this.userLink.nativeElement.innerHTML = link;
    });


  }

  ngOnInit() {
  }

}
