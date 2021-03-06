import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { environment } from '../../../../environments/environment';
//import { Observable } from 'rxjs/Observable';
//import { Http, Response, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class EntregasPendientesService {

	public url: String;

  	constructor(public _http: Http) { 
		this.url = environment.urlModulosEntregasPendientes;
		//this.url = "http://200.49.127.237/DataMobileApp/modulos/entregasPendientes.php/";
	}

  	Get(id_empresa, id_cliente){
		let params ="id_empresa="+id_empresa+"&id_cliente="+id_cliente;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded', 'Authorization': 'Bearer ' + localStorage.getItem('access_token')});
		return this._http.post(this.url+'', params, {headers: headers})
	         .map(res => res.json());
	}

}
