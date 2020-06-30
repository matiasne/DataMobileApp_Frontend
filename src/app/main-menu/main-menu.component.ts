import { Component, OnInit } from '@angular/core';

import {UsuarioActivoService} from '../services/usuarioActivo/usuarioActivo.service';
import {ModuloService} from '../services/modulo/modulo.service';

import { Router } from '@angular/router';
import {Modulo} from '../models/modulo';

import { trigger, style, transition, animate, group } from '@angular/animations';
import { fadeInOutAnimation } from '../animations/fadeInOut.animation';
import { LoaderService } from '../services/loader/loader.service';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css'],
  animations: [fadeInOutAnimation] 
})
export class MainMenuComponent implements OnInit {

	public modulos:Modulo[];

	constructor(
		 public _usuarioActivoService:UsuarioActivoService,
		 public _moduloService:ModuloService,
		 public _router:Router,
		 private _loaderService: LoaderService, 
	) { 	       	
       	this.modulos = this._usuarioActivoService.modulosActivos; //Esto lo hago para disparar y que se envien los datos al refrescar este componente (ver porque lo estoy haciendo mal seguro)
  }

	ngAfterViewInit(){
		this._loaderService.displayLoader(true);
	}

	ngOnInit() {
		
		this._moduloService.GetByEmpresa().subscribe(      
			response => {
			  if(response.code == 200){
				this.modulos = response.data;  
				console.log(this.modulos);   
					  
			  }else if(response.code == 204){
				console.log(response.data);  
			  }
			  this._loaderService.displayLoader(false);
			},
			error => {
			  
			  console.log(<any>error);
			  this._loaderService.displayLoader(false);
			}
		);
		
		
    }  	


	public irAlModulo(i){
		 this._router.navigate([this.modulos[i].url.trim()]);
	}

}
