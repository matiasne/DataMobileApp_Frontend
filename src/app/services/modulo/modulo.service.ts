import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Modulo } from '../../models/modulo';
import { environment } from '../../../environments/environment';
//import { Observable } from 'rxjs/Observable';
//import { Http, Response, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class ModuloService {

	public url: String;

	constructor(public _http: Http) { 
		this.url = environment.urlModulo;  
		//this.url = "http://200.49.127.237/DataMobileApp/modulo.php/"
	}

 	GetByEmpresa(){
		let params ="id_empresa="+localStorage.getItem('id_empresa');
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded', 'Authorization': 'Bearer ' + localStorage.getItem('access_token')});
		return this._http.post(this.url+'byempresa', params, {headers: headers})
		         .map(res => res.json());
	}

	GetByUser(id_user: number){ 
		let params ="id_user="+id_user; 
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded', 'Authorization': 'Bearer ' + localStorage.getItem('access_token')});
		return this._http.post(this.url+'byusuario', params, {headers: headers})
		         .map(res => res.json());
	}

	Delete(id_modulo: number){
		let params ="id_modulo="+id_modulo; 
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded', 'Authorization': 'Bearer ' + localStorage.getItem('access_token')});
		return this._http.post(this.url+'borrar', params, {headers: headers})
		         .map(res => res.json());
	}

	Add(modulo: Modulo){
		let params ="nombre="+modulo.nombre+"&id_empresa="+modulo.id_empresa+"&url="+modulo.url+"&vistaAdmin="+modulo.vistaAdmin+"&vistaCliente="+modulo.vistaCliente; 
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded', 'Authorization': 'Bearer ' + localStorage.getItem('access_token')});
		return this._http.post(this.url+'add', params, {headers: headers})
		         .map(res => res.json());
	}

}
