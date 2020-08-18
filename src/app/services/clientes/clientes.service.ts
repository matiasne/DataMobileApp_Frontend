import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { environment } from '../../../environments/environment';
//import { Observable } from 'rxjs/Observable';
//import { Usuario } from '../../models/usuario';
//import { Http, Response, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class ClientesService {

  public url: String;

  	constructor(public _http: Http) {
		this.url = environment.urlClientes;  
		//this.url = "http://200.49.127.237/DataMobileApp/clientes.php/"
   	}


  	GetAll(){
		let params ="";
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded', 'Authorization': 'Bearer ' + localStorage.getItem('access_token')});
		return this._http.post(this.url+'all', params, {headers: headers})
		         .map(res => res.json());
	}

}
