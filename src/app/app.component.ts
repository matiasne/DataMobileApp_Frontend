import { Component } from '@angular/core';
import { Router } from '@angular/router';

import {LoaderService} from './services/loader/loader.service';

import { trigger, style, transition, animate, group } from '@angular/animations';
import { LoaderFadeInOutAnimation } from './animations/loaderFadeInOut.animation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [LoaderFadeInOutAnimation] 
})
export class AppComponent {
  title = 'app';
  public objLoaderStatus: boolean;

  constructor(
    public router: Router,
    private loaderService: LoaderService
  ){
  }

  ngOnInit() {
    this.loaderService.loaderStatus.subscribe((val: boolean) => {        
        console.log("Loader mostrando: "+val);
        this.objLoaderStatus = val;
    });
    
	}
}
