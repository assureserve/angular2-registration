import { Component, OnInit } from '@angular/core';
import { ElementRef, NgZone, ViewChild } from '@angular/core';
import { FormControl } from "@angular/forms";
import { MapsAPILoader } from 'angular2-google-maps/core';
import {UtilService} from "../services/util.service";

@Component({
	selector: 'app-google-map',
	template: `
	<div>
	<div class="form-group">
	<input placeholder="search for location" autocorrect="off" autocapitalize="off" spellcheck="off" type="text" #search>
	</div>
	<sebm-google-map [latitude]="latitude" [longitude]="longitude" [scrollwheel]="false" [zoom]="zoom">
	<sebm-google-map-marker [latitude]="latitude" [longitude]="longitude"></sebm-google-map-marker>
	</sebm-google-map>
	</div>
	`,
	styles: [`
	.sebm-google-map-container {
		height:300px
	}
	`]
})
export class GoogleMapComponent implements OnInit {
	public latitude: number;
	public longitude: number;
	public searchControl: FormControl;
	public zoom: number;
	//public addressEmitter: EventEmitter<Map<string, string>> = new EventEmitter();

	@ViewChild("search")
	public searchElementRef: ElementRef;

	constructor(private mapsAPILoader: MapsAPILoader,
		private ngZone: NgZone, private utilService: UtilService) { }

	ngOnInit() {
		//set google maps defaults
		this.zoom = 4;
		this.latitude = 39.8282;
		this.longitude = -98.5795;

		//create search FormControl
		this.searchControl = new FormControl();

		//set current position
		this.setCurrentPosition();

		//load Places Autocomplete
		this.mapsAPILoader.load().then(() => {
			let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
				types: ["address"]
			});
			let address : Map<string, string> = new Map<string, string>();
			let street1: string = "";
			let street2: string = "";
			autocomplete.addListener("place_changed", () => {
				this.ngZone.run(() => {
					//get the place result
					let place: google.maps.places.PlaceResult = autocomplete.getPlace();					

					//verify result
					if (place.geometry === undefined || place.geometry === null) {
						return;
					}

					console.log(place);
					console.log(place.address_components[0].long_name);
					for (var obj of place.address_components) {
						if ("street_number" == obj.types[0]) {
							street1 = obj.long_name;
						} else if ("route" == obj.types[0]) {
							street2 = obj.long_name;
						} else if ("locality" == obj.types[0]) {
							address.set("city", obj.long_name);
						} else if ("administrative_area_level_1" == obj.types[0]) {
							address.set("state", obj.short_name);
						} else if ("country" == obj.types[0]) {
							address.set("country", obj.long_name);
						} else if ("postal_code" == obj.types[0]) {
							address.set("zipCode", obj.long_name);
						}
					}
					//address.set("number", place.address_components[0].long_name);
					address.set("address", street1 + " " + street2);
					//address.set("city", place.address_components[2].long_name);
					//address.set("state", place.address_components[4].short_name);
					//address.set("country", place.address_components[5].long_name);
					//address.set("zipCode", place.address_components[6].long_name);
					this.utilService.addressEmitter.emit(address);

					//set latitude, longitude and zoom
					this.latitude = place.geometry.location.lat();
					this.longitude = place.geometry.location.lng();
					this.zoom = 12;
				});
			});
		});
	}

	private setCurrentPosition() {
		if ("geolocation" in navigator) {
			navigator.geolocation.getCurrentPosition((position) => {
				this.latitude = position.coords.latitude;
				this.longitude = position.coords.longitude;
				this.zoom = 12;
			});
		}
	}

}
