import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Http,Response,Headers,RequestOptions} from '@angular/http';
import { FormsModule }   from '@angular/forms';

import {UsuarioActivoService} from '../../services/usuarioActivo/usuarioActivo.service';

import {ComprobantesService} from '../services/comprobantes/comprobantes.service';

import {ItemComprobante} from '../models/itemComprobante';

import { trigger, style, transition, animate, group } from '@angular/animations';
import { fadeInOutAnimation } from '../../animations/fadeInOut.animation';

import { LoaderService } from '../../services/loader/loader.service';

@Component({
  selector: 'app-comprobantes',
  templateUrl: './comprobantes.component.html',
  styleUrls: ['./comprobantes.component.css'],
  animations: [fadeInOutAnimation] 
})
export class ComprobantesComponent implements OnInit {

	itemsComprobantes:ItemComprobante[];
	tiposComprobantes:String[];

  constructor(
  	public _route: ActivatedRoute,
		public _http:Http,
		public _usuarioActivoService:UsuarioActivoService,
		public _comprobantesService: ComprobantesService,
		private _loaderService: LoaderService,
		) { 

  }

  ngAfterViewInit(){
	this._loaderService.displayLoader(true);
	}

  private obtenerTiposComprobantes(){
  	
	this.tiposComprobantes = this.itemsComprobantes.map(function(obj) { return obj.COMPROBANTE; });
	this.tiposComprobantes = this.tiposComprobantes.filter((v,i) =>{ return this.tiposComprobantes.indexOf(v) == i; });
	console.log(this.tiposComprobantes);
  }


  ngOnInit() {

  	this._comprobantesService.Get(	this._usuarioActivoService.getEmpresaID(),this._usuarioActivoService.getClienteID()
  			).subscribe(

  			response => {
				if(response.code == 200){
					this.itemsComprobantes = response.data;
					this.obtenerTiposComprobantes();
					console.log(this.itemsComprobantes);
					
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
