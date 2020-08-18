import { Component, OnInit,Pipe, PipeTransform  } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { FormsModule }   from '@angular/forms';
import { DatePipe } from '@angular/common';
import { UsuarioActivoService } from '../../services/usuarioActivo/usuarioActivo.service';
import { FichaFinancieraService } from '../services/fichaFinanciera/ficha-financiera.service';
import { ItemFichaFinanciera } from '../models/itemFichaFinanciera';
import { trigger, style, transition, animate, group } from '@angular/animations';
import { fadeInOutAnimation } from '../../animations/fadeInOut.animation';
import { LoaderService } from '../../services/loader/loader.service';
import { ClientesService } from '../services/clientes/clientes.service';
import { DecimalPipe } from '@angular/common';

import * as jsPDF from 'jspdf';
import { environment } from '../../../environments/environment';
import { PdfsService } from '../services/pdfs.service';

declare var jquery: any;
declare var $: any;

@Pipe({
	name: 'numeroFinanciera'
})
export class NumerosFinanciera implements PipeTransform {
    public transform(val: Number){	
		if(val !== undefined && val !== null){					   
			var stringValor = parseFloat(val.toString()).toFixed(2);		   	
			var valor = new Intl.NumberFormat('de-DE').format(Number(stringValor));			
			if(valor.toString().indexOf(",") != -1){
				var res = valor.split(",");
				var retorno = valor;
				if(res[1].length < 2){ //Si tiene un solo decimal le agrego el relleno
					retorno = valor + "0";
				}
				return retorno ;				
			}else{
				var conDecimal =  valor.toString() + ",00";
				return conDecimal;
			}
		}else{
			return '';
		}
	}	
}


@Component({
  selector: 'app-ficha-financiera',
  templateUrl: './ficha-financiera.component.html',
  styleUrls: ['./ficha-financiera.component.css'],
  animations: [fadeInOutAnimation],
  providers: [PdfsService]
})
export class FichaFinancieraComponent implements OnInit {

	public url: string;
	public desde: string;
	public hasta: string;
	public saldoAnterior: number;
	public saldoVencido: number;
	public saldoAVencer: number; 
	public itemsFichaFinanciera: ItemFichaFinanciera[];

  	constructor(
  		public _route: ActivatedRoute,
		public _http: Http,
		public _usuarioActivoService: UsuarioActivoService,
		public _fichaFinancieraService: FichaFinancieraService,
		private _loaderService: LoaderService,
		private _clienteService: ClientesService,
		private pdfService: PdfsService
		) { 
			this.url = environment.urlComponentesFichaGranaria;
		  //this.url = "http://200.49.127.237/DataMobileApp/componentes/fichaGranaria.php";
	}  
	
	ngOnInit() {
		this.desde = this.obtenerFechaFormateadaDesde();
		this.hasta = this.obtenerFechaFormateadaHasta();
	}

	descargarPDF(){
		this.pdfService.pdfFichaFinanciera(this._usuarioActivoService.clienteActivo, 
			this.saldoAnterior, this.saldoVencido, this.saldoAVencer, this.desde, 
			this.hasta, this.itemsFichaFinanciera);
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

  	public calculoSaldos(){
	  	var primero = true;
		this.saldoVencido = 0;
		this.saldoAVencer = 0;  
	  	this.saldoAnterior = this.itemsFichaFinanciera[0].SALDO2;	  	
	  	this.itemsFichaFinanciera[0].SALDO2 = Number(this.itemsFichaFinanciera[0].SALDO2) + Number(this.itemsFichaFinanciera[0].DEBE) - Number(this.itemsFichaFinanciera[0].HABER);
		//console.log("Primero: "+this.itemsFichaFinanciera[0].SALDO2);
		this.saldoVencido = Number(this.saldoAnterior);
		var hasta = new Date(this.hasta);
		hasta.setDate(hasta.getDate() + 1);	
		if(new Date(this.itemsFichaFinanciera[0].FechaVto['date']) < hasta){
			this.saldoVencido += Number(this.itemsFichaFinanciera[0].DEBE);
			this.saldoVencido -=  Number(this.itemsFichaFinanciera[0].HABER);		
		}else{
			this.saldoAVencer +=  Number(this.itemsFichaFinanciera[0].DEBE) ;
			this.saldoAVencer -=  Number(this.itemsFichaFinanciera[0].HABER);
			console.log("a vencer");	
		}
		//console.log("Saldo Vencido: "+this.saldoVencido);
		//console.log("Saldo A Vencer: "+this.saldoAVencer);
		for(var j = 1;j<this.itemsFichaFinanciera.length;j++) { 
			this.itemsFichaFinanciera[j].SALDO2 = Number(this.itemsFichaFinanciera[j-1].SALDO2) + Number(this.itemsFichaFinanciera[j].DEBE) - Number(this.itemsFichaFinanciera[j].HABER);
			if(new Date(this.itemsFichaFinanciera[j].FechaVto['date']) < hasta){
				this.saldoVencido +=  Number(this.itemsFichaFinanciera[j].DEBE);
				this.saldoVencido -=  Number(this.itemsFichaFinanciera[j].HABER);	
			}else{
				this.saldoAVencer +=  Number(this.itemsFichaFinanciera[j].DEBE);
				this.saldoAVencer -=  Number(this.itemsFichaFinanciera[j].HABER);	
				//console.log(j+" "+this.itemsFichaFinanciera[j].DEBE+" "+this.itemsFichaFinanciera[j].HABER);
				//console.log("Saldo a vencer: "+this.saldoAVencer);
			}
		}
	}

  	public filtradoDatosPorComprobante(){ //Solo para los condores
		for(var i = this.itemsFichaFinanciera.length-1;i>=0;i--) {
			switch(this.itemsFichaFinanciera[i].TipoComprobanteId){
				case "1":
				case "24":
				case "25":
				case "37":
				case "151":
				case "90":
					var fechaVencimiento = new Date(this.itemsFichaFinanciera[i].FechaVto['date']);			
					var fechaHasta = new Date(this.hasta);
					var fechaComparar = new Date();
					fechaComparar.setDate(fechaHasta.getDate()+30);
					if (fechaVencimiento > fechaComparar){
						//console.log("Borrando...........: "+i);
						this.itemsFichaFinanciera.splice(i,1);
					}
				break;
			}
		}
  	}

  	public formateoDatos(){	 
		//formateo de los datos de los items 
		//Además acá tambien el nombre completo de la cosecha viene por separado y para 
		//compararlo lo unimos
		/*for(var i = 0;i<this.itemsFichaFinanciera.length-1;i++) { 
			this.itemsFichaFinanciera[i].DEBE = this.itemsFichaFinanciera[i].DEBE);
			this.itemsFichaFinanciera[i].HABER = Math.floor(this.itemsFichaFinanciera[i].HABER);
		}*/
	}

  	public obtenerDatosFichaFinanciera(){
		$("#collapseOne").collapse("hide");
  		var fechaDesdeFormatear = this.desde.split('-');
  		var fechaHastaFormatear = this.hasta.split('-');
  		var fechaDesde = fechaDesdeFormatear[2]+"/"+fechaDesdeFormatear[1]+"/"+fechaDesdeFormatear[0];
		var fechaHasta = fechaHastaFormatear[2]+"/"+fechaHastaFormatear[1]+"/"+fechaHastaFormatear[0];
		this.itemsFichaFinanciera = [];
		this._loaderService.displayLoader(true);
  		this._fichaFinancieraService.Get(
  			this._usuarioActivoService.getEmpresaID(),
  			this._usuarioActivoService.getCtaCte(),  			
  			fechaDesde,
  			fechaHasta
  			).subscribe(
				response => {
					this._loaderService.displayLoader(false);
					if(response.code == 200){
						this.itemsFichaFinanciera = response.data;	
						//this.filtradoDatosPorComprobante(); Solo los Condores
						this.formateoDatos();
						this.calculoSaldos();
						console.log(this.itemsFichaFinanciera);
					}else{	}
				},
				error => {
					this._loaderService.displayLoader(false);
					//console.log(<any>error);
				});
  	}

}
