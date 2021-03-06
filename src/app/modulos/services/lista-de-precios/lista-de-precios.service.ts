import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import { environment } from '../../../../environments/environment';
//import { Http, Response, Headers, RequestOptions } from '@angular/http';
//import {Observable} from 'rxjs/Observable';

@Injectable()
export class ListaDePreciosService {
	public url: String;

	constructor(public _http: Http) { 
		this.url = environment.urlModulosListaPrecios;
		//this.url = "http://200.49.127.237/DataMobileApp/modulos/listaDePrecios.php/";
	}

  	Get(id_empresa, id_cliente){
		let params ="id_empresa="+id_empresa+"&id_cliente="+id_cliente;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded', 'Authorization': 'Bearer ' + localStorage.getItem('access_token')});
		return this._http.post(this.url+'', params, {headers: headers})
	         .map(res => res.json());
	}

}