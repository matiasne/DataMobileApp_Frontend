import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Http,Response,Headers,RequestOptions} from '@angular/http';
import { FormsModule }   from '@angular/forms';

import {UsuarioActivoService} from '../../services/usuarioActivo/usuarioActivo.service';
import {ReservasPendientesService} from '../services/reservas-pendientes/reservas-pendientes.service';

import {ItemReservaPendiente} from '../models/itemReservaPendiente';

import { trigger, style, transition, animate, group } from '@angular/animations';
import { fadeInOutAnimation } from '../../animations/fadeInOut.animation';

import { LoaderService } from '../../services/loader/loader.service';

@Component({
  selector: 'app-reservas-pendientes',
  templateUrl: './reservas-pendientes.component.html',
  styleUrls: ['./reservas-pendientes.component.css'],
  animations: [fadeInOutAnimation] 
})
export class ReservasPendientesComponent implements OnInit {

	itemReservaPendiente:ItemReservaPendiente[];
	

  constructor(
  		public _route: ActivatedRoute,
		public _http:Http,
		public _usuarioActivoService:UsuarioActivoService,
		public _reservaPendientesService: ReservasPendientesService,
		private _loaderService: LoaderService,
	) { }

	ngAfterViewInit(){
		this._loaderService.displayLoader(true);
		}

  ngOnInit() {
  	
  	this._reservaPendientesService.Get(	this._usuarioActivoService.getEmpresaID(),this._usuarioActivoService.getClienteID()
			).subscribe(

			response => {
			if(response.code == 200){
				this.itemReservaPendiente = response.data;					
				console.log(this.itemReservaPendiente);
				
			}else{
				
			}
			this._loaderService.displayLoader(false);
		},
		error => {
			this._loaderService.displayLoader(false);
			console.log(<any>error);
		}

	);
  }

}
