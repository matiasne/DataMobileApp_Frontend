import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Http,Response,Headers,RequestOptions} from '@angular/http';
import { FormsModule }   from '@angular/forms';

import {UsuarioActivoService} from '../../services/usuarioActivo/usuarioActivo.service';

import {ListaDePreciosService} from '../services/lista-de-precios/lista-de-precios.service';

import {ItemListaPrecios} from '../models/itemListaPrecios';

import { trigger, style, transition, animate, group } from '@angular/animations';
import { fadeInOutAnimation } from '../../animations/fadeInOut.animation';

import { LoaderService } from '../../services/loader/loader.service';

@Component({
  selector: 'app-lista-de-precios',
  templateUrl: './lista-de-precios.component.html',
  styleUrls: ['./lista-de-precios.component.css'],
  animations: [fadeInOutAnimation] 
})
export class ListaDePreciosComponent implements OnInit {

	itemSecciones:String[];
	itemLineas:String[];
	itemMarcas:String[];

	seccionSeleccionada:String;
	lineaSeleccionada:String;
	marcaSeleccionada:String;

	itemListaPrecios:ItemListaPrecios[];

  constructor(
  	public _route: ActivatedRoute,
		public _http:Http,
		public _usuarioActivoService:UsuarioActivoService,
		public _listaDePreciosService: ListaDePreciosService,
		private _loaderService: LoaderService,
		) { }

		

  public obtenerSecciones(){  	
	this.itemSecciones = this.itemListaPrecios.map(function(obj) { return obj.nombre_sec; });
	this.itemSecciones = this.itemSecciones.filter((v,i) =>{ return this.itemSecciones.indexOf(v) == i; });
	console.log(this.itemSecciones);
  }

  public obtenerLineas(){  	
	this.itemLineas = this.itemListaPrecios.map(function(obj) { return obj.nombre_lin; });
	this.itemLineas = this.itemLineas.filter((v,i) =>{ return this.itemLineas.indexOf(v) == i; });
	console.log(this.itemLineas);
  }

  public obtenerMarcas(){  	
	this.itemMarcas = this.itemListaPrecios.map(function(obj) { return obj.nommar; });
	this.itemMarcas = this.itemMarcas.filter((v,i) =>{ return this.itemMarcas.indexOf(v) == i; });
	console.log(this.itemMarcas);
	}
	
	ngAfterViewInit(){
		this._loaderService.displayLoader(true);
		}

  ngOnInit() {

  	
  	this._listaDePreciosService.Get(	this._usuarioActivoService.getEmpresaID(),this._usuarioActivoService.getClienteID()
			).subscribe(

			response => {
				this._loaderService.displayLoader(false);
			if(response.code == 200){
				this.itemListaPrecios = response.data;					
				console.log(this.itemListaPrecios);
				this.obtenerSecciones();
				this.obtenerMarcas();
				this.obtenerLineas();

			}else{
				
			}
		},
		error => {
			this._loaderService.displayLoader(false);
			console.log(<any>error);
		}

	);
  }

  public obtenerItemsFiltrados(){

  }

}
