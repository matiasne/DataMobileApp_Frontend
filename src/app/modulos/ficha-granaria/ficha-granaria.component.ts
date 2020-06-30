import { Component, OnInit, PipeTransform, Pipe } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Http,Response,Headers,RequestOptions} from '@angular/http';
import { FormsModule }   from '@angular/forms';

import { DatePipe } from '@angular/common';


import {UsuarioActivoService} from '../../services/usuarioActivo/usuarioActivo.service';
import {EspeciesService} from '../services/especies/especies.service';

import {FichaGranariaService} from '../services/fichaGranaria/ficha-granaria.service';

import {Especie} from '../models/especie';
import {ItemFichaGranaria} from '../models/itemFichaGranaria';

import { trigger, style, transition, animate, group } from '@angular/animations';
import { fadeInOutAnimation } from '../../animations/fadeInOut.animation';

import { LoaderService } from '../../services/loader/loader.service';
import { DecimalPipe } from '@angular/common';

declare var jquery:any;
declare var $ :any;


@Pipe({
	name: 'numeroGranaria'
})
export class NumerosGranaria implements PipeTransform {

    public transform(val:number) {	

		if (val !== undefined && val !== null) {		   
			var stringValor = parseFloat(val.toString()).toFixed(0);		   	
			var valor = new Intl.NumberFormat('de-DE').format(Number(stringValor));			
			return valor ;
		  } else {
			return '';
		  }
    }
}


@Component({
  selector: 'app-ficha-granaria',
  templateUrl: './ficha-granaria.component.html',
  styleUrls: ['./ficha-granaria.component.css'],
  animations: [fadeInOutAnimation] 
})
export class FichaGranariaComponent implements OnInit {

	public id_empresa;	
	public url:String;
	public especies:Especie[];

	public especieId = "0";
	public cosecha="";
	public desde:String;
	public hasta:String;

	public itemsFichaGranaria:ItemFichaGranaria[];
	public cosecha_tipo;

	public cerealElegido:String = "";

	public itemsPorCosecha;


	constructor(
		public _route: ActivatedRoute,
		public _http:Http,
		public _usuarioActivoService:UsuarioActivoService,
		public _especiesService:EspeciesService,
		public _fichaGranariaService: FichaGranariaService,
		private _loaderService: LoaderService,
		) { 
		this.url = "http://200.49.127.237/DataMobileApp/componentes/fichaGranaria.php";
	}

	ngAfterViewInit(){
		this._loaderService.displayLoader(true);
		}

  	ngOnInit() { 	
		this.id_empresa = this._usuarioActivoService.getEmpresaID(); //Solo a modo recordatorio	

		console.log(this.id_empresa);
			
		this._especiesService.Get(this.id_empresa).subscribe(
	       
	        response => {
				if(response.code == 200){
					this.especies = response.data;
					console.log(response.data);
				}else{
					
				}
				this._loaderService.displayLoader(false);
			},
			error => {
				console.log(<any>error);
				this._loaderService.displayLoader(false);
			}
		  );
		  
		  this.desde = this.obtenerFechaFormateadaDesde();
		this.hasta = this.obtenerFechaFormateadaHasta();

	  }

	  private pad2(number) {   
		return (number < 10 ? '0' : '') + number  
	  }
	  obtenerFechaFormateadaDesde(){ 
		var date = new Date();   
		var dd = "01";
		var mm = this.pad2(date.getMonth()+1); //January is 0!
		var yyyy = date.getFullYear();
		return yyyy+"-"+mm+"-"+dd;
	  }
	  obtenerFechaFormateadaHasta(){ 
		var date = new Date();   
		var dd = this.pad2(date.getDate());
		var mm = this.pad2(date.getMonth()+1); //January is 0!
		var yyyy = date.getFullYear();
		return yyyy+"-"+mm+"-"+dd;
	  }
	

  	public obtenerNombreCerealElegido(){
  		for(var i = 0;i<this.especies.length;i++) { 
		   if(this.especies[i].ONCCAEspecieid == this.especieId){
		   		this.cerealElegido = this.especies[i].nombre;
		   } 
		} 
  	}

  	public formateoDatos(){

		//EN las cosechas solicitadas el nombre completo viene separado y hay que unirlo 
		//Para compararlo después con la cosecha de los items
		for(var i = 0;i<this.cosecha_tipo.length;i++) {
			this.cosecha_tipo[i].cosecha = this.cosecha_tipo[i]['Nombre']+" "+this.cosecha_tipo[i]['cosecha'];
			console.log(this.cosecha_tipo[i].cosecha);
		}

		//formateo de los datos de los items 
		//Además acá tambien el nombre completo de la cosecha viene por separado y para compararlo lo unimos
  		for(var i = 0;i<this.itemsFichaGranaria.length;i++) { 
		   	//this.itemsFichaGranaria[i].Saldo = this.itemsFichaGranaria[i].SaldoAnt + this.itemsFichaGranaria[i].Debe - this.itemsFichaGranaria[i].Haber;
			this.itemsFichaGranaria[i].Debe = Math.floor(this.itemsFichaGranaria[i].Debe);
			this.itemsFichaGranaria[i].Haber = Math.floor(this.itemsFichaGranaria[i].Haber);
			this.itemsFichaGranaria[i].SaldoAnt = Math.floor(this.itemsFichaGranaria[i].SaldoAnt);
			this.itemsFichaGranaria[i].Cosecha = this.itemsFichaGranaria[i].Cereal+" "+this.itemsFichaGranaria[i].Cosecha;
			console.log(this.itemsFichaGranaria[i].Cosecha);
		}
	}

	public obtenerTiposCosechasDevueltos(){

		var flags = [], output = [], l = this.itemsFichaGranaria.length, i;
		for( i=0; i<l; i++) {
			if( flags[""+this.itemsFichaGranaria[i].Cosecha]) continue;
			flags[""+this.itemsFichaGranaria[i].Cosecha] = true;
			var objeto = {"cosecha":this.itemsFichaGranaria[i].Cosecha, "SaldoAnterior":0};
			output.push(objeto);
		}

		return output;

		//const unique = new Set(this.itemsFichaGranaria.map(item => item.Cosecha));
		
	}

	public calculoDeSaldos(){

		for(var i = 0;i<this.cosecha_tipo.length;i++) {

			var primero = true;
			var valorAnteriorIndice = 0; //Por ahí puede llegar mezclado las cosechas
			var ultimoValorDelAnalizado = 0;
			console.log("calculando para: "+this.cosecha_tipo);

				

			for(var j = 0;j<this.itemsFichaGranaria.length;j++) {

				if(this.itemsFichaGranaria[j].Cosecha == this.cosecha_tipo[i].cosecha){

					if(primero){
						this.cosecha_tipo[i]['SaldoAnterior'] = this.itemsFichaGranaria[j].SaldoAnt; //Esto lo creo para poder mostrarlo en el html
						this.itemsFichaGranaria[j].Saldo = this.itemsFichaGranaria[j].SaldoAnt + this.itemsFichaGranaria[j].Debe - this.itemsFichaGranaria[j].Haber;
						primero= false;
						console.log("Primero: "+this.itemsFichaGranaria[j].Saldo);
						valorAnteriorIndice = j;
					}
					else{
						
						this.itemsFichaGranaria[j].Saldo = this.itemsFichaGranaria[valorAnteriorIndice].Saldo + this.itemsFichaGranaria[j].Debe - this.itemsFichaGranaria[j].Haber;
						console.log(j+": "+this.itemsFichaGranaria[j].Saldo);
						valorAnteriorIndice = j;	
					}
					ultimoValorDelAnalizado = j;
				}				
			}
			this.cosecha_tipo[i]['SaldoFinal'] = this.itemsFichaGranaria[ultimoValorDelAnalizado].Saldo;
			
			


			
		}
	}
	  
	 

  	public obtenerDatosFichaGranaria(){

		$("#collapseOne").collapse("hide");
		
  		var fechaDesdeFormatear = this.desde.split('-');
  		var fechaHastaFormatear = this.hasta.split('-');

  		var fechaDesde = fechaDesdeFormatear[2]+"/"+fechaDesdeFormatear[1]+"/"+fechaDesdeFormatear[0];
		  var fechaHasta = fechaHastaFormatear[2]+"/"+fechaHastaFormatear[1]+"/"+fechaHastaFormatear[0];
		  
		  this.itemsFichaGranaria = [];

  		console.log(this.especieId+" "+this.cosecha+" "+fechaDesde+" "+fechaHasta);
		  	this._loaderService.displayLoader(true);
  			this._fichaGranariaService.Get(
  			this.id_empresa,
  			this._usuarioActivoService.getClienteID(),
  			this.especieId,
  			this.cosecha,
  			fechaDesde,
  			fechaHasta
  			).subscribe(

  			response => {
				this._loaderService.displayLoader(false);
				if(response.code == 200){
					
					this.itemsFichaGranaria = [];
					this.cosecha_tipo =[];
					this.itemsFichaGranaria = response.detalle;
					var cosechas = response.cosechas;

					console.log(this.itemsFichaGranaria);
					console.log(cosechas);

					this.formateoDatos();
					this.cosecha_tipo = this.obtenerTiposCosechasDevueltos();
					this.calculoDeSaldos();

				}else{
					
				}
			},
			error => {
				this._loaderService.displayLoader(false);
				console.log(<any>error);
			}

  		);
  	}

 

}
