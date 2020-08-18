import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import {Grano} from '../../models/grano';
import { environment } from '../../../../environments/environment';
//import {Observable} from 'rxjs/Observable';
//import { Http, Response, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class GranosService {

	public url: String;

  	constructor(public _http: Http) { 
		this.url = environment.urlModulosGranos;
  		//this.url = "http://200.49.127.237/DataMobileApp/modulos/granos.php/";
  	}

  	Get(id_empresa){
		let params ="id_empresa="+id_empresa;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded', 'Authorization': 'Bearer ' + localStorage.getItem('access_token')});
		return this._http.post(this.url+'', params, {headers: headers})
	         .map(res => res.json());
		}

	Add(grano: Grano){
		let params ="id_empresa="+grano.id_empresa+"&nombre="+grano.nombre; 
		console.log(params);
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded', 'Authorization': 'Bearer ' + localStorage.getItem('access_token')});
		return this._http.post(this.url+'add', params, {headers: headers})
		         .map(res => res.json());
	}	

	Delete(id: number){		
		let params ="id="+id; 
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded', 'Authorization': 'Bearer ' + localStorage.getItem('access_token')});
		return this._http.post(this.url+'borrar', params, {headers: headers})
		         .map(res => res.json());
	}

}
