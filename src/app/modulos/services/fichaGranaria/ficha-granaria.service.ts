import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

import { environment } from '../../../../environments/environment.prod';
//import {Observable} from 'rxjs/Observable';
//import { Http, Response, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class FichaGranariaService {

  	public url: String;

  	constructor(public _http: Http) {
		this.url = environment.urlModulosFichaGranaria;
  		//this.url = "http://200.49.127.237/DataMobileApp/modulos/fichaGranaria.php/";
  	}

	Get(id_empresa, id_cliente, id_cereal, str_cosecha, fechaDesde, fechaHasta){
		console.log(id_empresa+" "+id_cliente+" "+id_cereal+" "+str_cosecha+" "+fechaDesde+" "+fechaHasta);
		let params ="id_empresa="+id_empresa+"&id_cliente="+id_cliente+"&id_cereal="+id_cereal+"&str_cosecha="+str_cosecha+"&fechaDesde="+fechaDesde+"&fechaHasta="+fechaHasta;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded', 'Authorization': 'Bearer ' + localStorage.getItem('access_token')});
		return this._http.post(this.url+'', params, {headers: headers})
	         .map(res => res.json());
	}

}
