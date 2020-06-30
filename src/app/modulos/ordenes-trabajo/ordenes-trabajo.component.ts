import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Http,Response,Headers,RequestOptions} from '@angular/http';
import { FormsModule }   from '@angular/forms';

import {UsuarioActivoService} from '../../services/usuarioActivo/usuarioActivo.service';

import {OrdenesTrabajoService} from '../services/ordenesTrabajo/ordenes-trabajo.service';

import {ItemOrdenTrabajo} from '../models/itemOrdenTrabajo';

import { trigger, style, transition, animate, group } from '@angular/animations';
import { fadeInOutAnimation } from '../../animations/fadeInOut.animation';

import { LoaderService } from '../../services/loader/loader.service';

@Component({
  selector: 'app-ordenes-trabajo',
  templateUrl: './ordenes-trabajo.component.html',
  styleUrls: ['./ordenes-trabajo.component.css'],
  animations: [fadeInOutAnimation] 
})
export class OrdenesTrabajoComponent implements OnInit {

	itemsOrdenTrabajo:ItemOrdenTrabajo[];
	

  constructor(
  		public _route: ActivatedRoute,
		public _http:Http,
		public _usuarioActivoService:UsuarioActivoService,
		public _ordenesTrabajoService: OrdenesTrabajoService,
		private _loaderService: LoaderService,
	) { }

	ngAfterViewInit(){
		this._loaderService.displayLoader(true);
		}

  ngOnInit() {

  	
  	this._ordenesTrabajoService.Get(	this._usuarioActivoService.getEmpresaID(),this._usuarioActivoService.getClienteID()
			).subscribe(

			response => {
			if(response.code == 200){
				this.itemsOrdenTrabajo = response.data;					
				console.log(this.itemsOrdenTrabajo);
				
			}else{
				
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
