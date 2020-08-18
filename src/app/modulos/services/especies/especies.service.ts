import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { environment } from '../../../../environments/environment.prod';
//import {Observable} from 'rxjs/Observable';
//import { Http, Response, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class EspeciesService {

	public url: String;

  	constructor(public _http: Http) {
		this.url = environment.urlModulosEspecies;
  		//this.url = "http://200.49.127.237/DataMobileApp/modulos/especies.php/";
  	}

	public Get(id_empresa){
		let params ="id_empresa="+id_empresa;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded', 'Authorization': 'Bearer ' + localStorage.getItem('access_token')});
		return this._http.post(this.url+'', params, {headers: headers})
	         .map(res => res.json());
	}



}
