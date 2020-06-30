import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Http,Response,Headers,RequestOptions} from '@angular/http';
import { FormsModule }   from '@angular/forms';

import {UsuarioActivoService} from '../../services/usuarioActivo/usuarioActivo.service';

import {EntregasPendientesService} from '../services/entregas-pendientes/entregas-pendientes.service';

import {ItemEntregaPendiente} from '../models/itemEntregaPendiente';

import { trigger, style, transition, animate, group } from '@angular/animations';
import { fadeInOutAnimation } from '../../animations/fadeInOut.animation';

import { LoaderService } from '../../services/loader/loader.service';

@Component({
  selector: 'app-entregas-pendientes',
  templateUrl: './entregas-pendientes.component.html',
  styleUrls: ['./entregas-pendientes.component.css'],
  animations: [fadeInOutAnimation] 
})
export class EntregasPendientesComponent implements OnInit {

	itemEntregaPendiente:ItemEntregaPendiente[];
	

  constructor(
  		public _route: ActivatedRoute,
		public _http:Http,
		public _usuarioActivoService:UsuarioActivoService,
		public _entregasPendientesService: EntregasPendientesService,
		private _loaderService: LoaderService,
	) { }

	ngAfterViewInit(){
		this._loaderService.displayLoader(true);
		}

  ngOnInit() {

  
  	this._entregasPendientesService.Get(	this._usuarioActivoService.getEmpresaID(),this._usuarioActivoService.getClienteID()
			).subscribe(

			response => {
			if(response.code == 200){
				this.itemEntregaPendiente = response.data;					
				console.log(this.itemEntregaPendiente);
				
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
