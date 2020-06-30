import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Empresa} from '../models/empresa';
import {EmpresaService} from '../services/empresa/empresa.service';
import { trigger, style, transition, animate, group } from '@angular/animations';
import { fadeInOutAnimation } from '../animations/fadeInOut.animation';
import { LoaderService } from '../services/loader/loader.service';

@Component({
  selector: 'app-empresa-list',
  templateUrl: './empresa-list.component.html',
  styleUrls: ['./empresa-list.component.css'],
  animations: [fadeInOutAnimation] 
})
export class EmpresaListComponent implements OnInit {

  	public empresas:Empresa[];


  	constructor(
  		public _empresaService:EmpresaService,
		  public _router: Router,
		  public _loaderService:LoaderService
	) { }	
	
	ngAfterViewInit(){
		this._loaderService.displayLoader(true);
	}

  	ngOnInit() {
  		this.empresas = [];      
  		this._empresaService.GetAll().subscribe(
	       
	        response => {
				if(response.code == 200){
					this.empresas = response.data
				}else{
					this._router.navigate(['/']);
				}
            	this._loaderService.displayLoader(false);
    			},
    			error => {
					console.log(<any>error);
					this._loaderService.displayLoader(false);
    			}
      	);
  	
  	}

}
