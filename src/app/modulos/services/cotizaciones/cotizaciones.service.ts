import { Injectable } from '@angular/core';
import {Http,Response,Headers,RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';

import {Cotizacion} from '../../models/cotizacion';

@Injectable()
export class CotizacionesService {

	public url:String;

  constructor(
  	public _http:Http,
  	) {
  	this.url = "http://200.49.127.237/DataMobileApp/modulos/cotizaciones.php/";
  	 }

  Get(id_empresa){

		let params ="id_empresa="+id_empresa;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded', 'Authorization': 'Bearer ' + localStorage.getItem('access_token')});
		return this._http.post(this.url+'', params, {headers: headers})
	         .map(res => res.json());
	}


	GetUltimoDia(id_empresa){

		let params ="id_empresa="+id_empresa;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded', 'Authorization': 'Bearer ' + localStorage.getItem('access_token')});
		return this._http.post(this.url+'ultimoDia', params, {headers: headers})
	         .map(res => res.json());
	}

	Add(cotizacion:Cotizacion){

		let params ="id_empresa="+cotizacion.id_empresa+"&id_grano="+cotizacion.id_grano+"&fecha="+cotizacion.fecha+"&valor="+cotizacion.valor; 
		console.log(params);
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded', 'Authorization': 'Bearer ' + localStorage.getItem('access_token')});
		return this._http.post(this.url+'add', params, {headers: headers})
		         .map(res => res.json());
	}	

	Delete(id:number){		
		let params ="id="+id; 
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded', 'Authorization': 'Bearer ' + localStorage.getItem('access_token')});
		return this._http.post(this.url+'borrar', params, {headers: headers})
		         .map(res => res.json());
	}

}
