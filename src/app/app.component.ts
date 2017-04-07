import { Component, NgZone } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `<app-navbar></app-navbar>
  <br/><br/>
  <router-outlet></router-outlet>`,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
}
