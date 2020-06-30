import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Http,Response,Headers,RequestOptions} from '@angular/http';
import { FormsModule }   from '@angular/forms';

import { DatePipe } from '@angular/common';

import {UsuarioActivoService} from '../../services/usuarioActivo/usuarioActivo.service';

import {CotizacionesService} from '../services/cotizaciones/cotizaciones.service';
import {GranosService} from '../services/granos/granos.service';


import { trigger, style, transition, animate, group } from '@angular/animations';
import { fadeInOutAnimation } from '../../animations/fadeInOut.animation';

import {Grano} from '../models/grano';
import {Cotizacion} from '../models/cotizacion';

import { LoaderService } from '../../services/loader/loader.service';

@Component({
  selector: 'app-cotizacion',
  templateUrl: './cotizacion.component.html',
  styleUrls: ['./cotizacion.component.css'],
  animations: [fadeInOutAnimation] 
})
export class CotizacionComponent implements OnInit {

	public granos:Grano[];
	public cotizaciones:Cotizacion[];
	public nuevaCotizacion:Cotizacion;
	public tablaCotizaciones:Cotizacion[];
	public ultimaFecha:String;

  constructor(
  	public _route: ActivatedRoute,
		public _http:Http,
		public _usuarioActivoService:UsuarioActivoService,
		public _cotizacionesService: CotizacionesService,
		public _granosService: GranosService,
		private _loaderService: LoaderService,
	) { }

	ngAfterViewInit(){
		this._loaderService.displayLoader(true);
	}

  ngOnInit() {

  	this.nuevaCotizacion = new Cotizacion("",0,this.obtenerFechaFormateada(),"");  	

  	console.log("Empresa ID: "+this._usuarioActivoService.getEmpresaID());
  	
  	this._granosService.Get(this._usuarioActivoService.getEmpresaID()).subscribe(
		response => {
			console.log(response);
			if(response.code == 200){
				this.granos = response.data;					
				console.log(this.granos);
			}				
		},
		error => {
			console.log(<any>error);
		}
	);

	this.obtenerCotizaciones();

 }

	
		private pad2(number) {   
			return (number < 10 ? '0' : '') + number  
		  }
		
		  obtenerFechaFormateada(){ 
			var date = new Date();   
			var dd = this.pad2(date.getDate());
			var mm = this.pad2(date.getMonth()+1); //January is 0!
			var yyyy = date.getFullYear();
			return yyyy+"-"+mm+"-"+dd;
		  }

  public obtenerCotizaciones(){

  	this._cotizacionesService.GetUltimoDia(this._usuarioActivoService.getEmpresaID()).subscribe(
				response => {
				if(response.code == 200){
					this.cotizaciones = response.data;
					this.ultimaFecha = response.data[0].fecha.date;					
					console.log(this.cotizaciones);
					
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

  public cargarCotizacion(){
  	this.nuevaCotizacion.id_empresa = this._usuarioActivoService.getEmpresaID();
  	this._cotizacionesService.Add(this.nuevaCotizacion).subscribe(response => {
				if(response.code == 200){
					alert("Cotizacion cargada");
					this.obtenerCotizaciones();
				}else{
					
				}
			},
			error => {
				console.log(<any>error);
			})
  }

  

}
