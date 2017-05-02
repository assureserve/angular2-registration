//import {Address} from "./address.model";
import {Address} from "./address.model";
import {Contact} from "./contact.model";

export class User {
  companyName: string;
  firstName: string;
  lastName: string;
  city: string;
  country: string;
  zipCode: string;
  email: string;
  phone: string;
  imageUrl: string;
  token: string;
  password: string;
  //address: Address;

  addresses: Address[] = [];
  contactList: Contact[] = [];
}
