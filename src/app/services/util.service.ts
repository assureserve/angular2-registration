import { Injectable, EventEmitter } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class UtilService {
	public addressEmitter: EventEmitter<Map<string, string>> = new EventEmitter();
  

  constructor() {
    
  }
}